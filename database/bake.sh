#!/usr/bin/env bash
# ==================================
# VARIABLES
# ==================================
SCRIPT_NAME=$(basename "${0}")
SOURCE=$(dirname $0)
PROJECT_DIR=$(dirname "${SOURCE}")
SCHEMA_DIR="home/pi/parlworks/"
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'
PSQL='which psql'
INITIAL_SCHEMA='0_initial-schema'

echo "${PROFILES[@]}"

# ==================================
# FUNCTIONS
# ==================================
usage() {
    if [ -n "${2}" ]; then
        printf "${RED}> %s${NC}\n" "${2}"
    fi

    cat <<EOF
Usage: ${SCRIPT_NAME} -cdDefmp [-yh]

Runs SQL migrations against a PostgreSQL database

Options:
   -c,--config <path>              Profile file that contains configuration information that persists outside of the process
   -d,--database <string>          The database to run the migration on
   -D,--driver <string>            The database driver to use (postgres)
   -e,--environment <string>       Deployment environment: either development, staging or production
   -f,--migration-file <path>      Migration file identifier such as "2_JJSVCS-110"
   -m,--mode <"up" | "down">       The mode of the migration (up = commit; down = rollback)
   -p,--path <path>                An optional path to where the SQL scripts can be found
   -h,--help                       Shows this usage message
 [ -y,--auto-yes ]                 Accepts the plan without prompt
EOF

    exit "${1:-0}"
}

real_path() {
    [[ $1 == /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

get_val() {
    array=(${1})
    for index in "${array[@]}"; do
        KEY="${index%%::*}"
        VALUE="${index##*::}"
        if [ "$KEY" == "${2}" ]; then
            echo "$VALUE"
            break
        fi
    done
}

psql_connection() {
    export PGPASSWORD=$(get_val "${PROFILES[*]}" "password")
    psql -h "$(get_val "${PROFILES[*]}" "hostname")" -d "${database}" -U "$(get_val "${PROFILES[*]}" "username")" -p "$(get_val "${PROFILES[*]}" "port")" --set="sslmode=require" ${*}
}

is_schema_initialized() {
    export PGPASSWORD=$(get_val "${PROFILES[*]}" "password")
    output=$(psql -h "$(get_val "${PROFILES[*]}" "hostname")" -d "${database}" -U "$(get_val "${PROFILES[*]}" "username")" -p "$(get_val "${PROFILES[*]}" "port")" --set="sslmode=require" -tAc $"SELECT 1 FROM information_schema.tables WHERE table_schema = '${database}' AND table_name = 'version';")

    if [ "$output" = 1 ]; then
        true
    else
        false
    fi
}

get_last_version() {
    if ! is_schema_initialized; then
        echo 'uninitialized'
        return
    fi

    export PGPASSWORD=$(get_val "${PROFILES[*]}" "password")
    output=$(psql -h "$(get_val "${PROFILES[*]}" "hostname")" -d "${database}" -U "$(get_val "${PROFILES[*]}" "username")" -p "$(get_val "${PROFILES[*]}" "port")" --set="sslmode=require" -t -c $"SELECT release_id FROM \"${database}\".\"version\" ORDER BY release_id DESC LIMIT 1;")

    echo $output
}

get_release_id_from_migration_file() {
    release_id="$(cut -d '_' -f 1 <<<"${1}")"

    echo "${release_id}"
}

get_release_files() {
    migration_list=()
    last_version=$(is_schema_initialized && get_last_version || echo -1)
    migration_file_version=$(get_release_id_from_migration_file "${migration_file}")

    for release_file in *; do
        filename=${release_file%.*}

        if [[ ! "${filename}" =~ "${mode}"$ ]]; then
            continue
        fi

        if [[ "${mode}" == "up" ]]; then
            if [ "${last_version}" -ge "$(get_release_id_from_migration_file "${filename}")" ] || [ "${migration_file_version}" -lt "$(get_release_id_from_migration_file "${filename}")" ]; then
                continue
            fi
        else
            if [ "${last_version}" -lt "$(get_release_id_from_migration_file "${filename}")" ] || [ "${migration_file_version}" -gt "$(get_release_id_from_migration_file "${filename}")" ]; then
                continue
            fi
        fi

        migration_list+=("${filename%_${mode}}")
    done

    if [[ "${mode}" == "up" ]]; then
        migration_list=($(printf '%s\n' "${migration_list[@]}" | sort -V))
    else
        migration_list=($(printf '%s\n' "${migration_list[@]}" | sort -r -V))
    fi

    echo ${migration_list[*]}
}

######
# Sets the options for version and tag. If not passed as an argument,
# will prompt the user
######
set_opts() {
    # Set the arguments passed as a single option and split into an array
    read -r -a options <<<"$1"
    set -- "${options[@]}"

    auto_yes=0

    # Iterate through each element
    while [ ${#} -gt 0 ]; do
        case ${1} in
        -e | --environment)
            shift
            environment=${1}
            ;;
        -c | --config)
            shift
            config=${1}
            ;;
        -f | --migration-file)
            shift
            migration_file=${1}
            ;;
        -m | --mode)
            shift
            mode=${1}
            ;;
        -D | --driver)
            shift
            driver=${1}
            ;;
        -d | --database)
            shift
            database=${1}
            ;;
        -p | --path)
            shift
            root_path=${1}
            ;;
        -y | --auto-yes)
            auto_yes=1
            ;;
        -h | --help)
            usage
            ;;
        esac
        shift
    done

    # Check if environment is set, if not, then ask for it (interactive mode)
    if [ -z "${environment}" ]; then
        echo -n "Enter environment: "
        read -r environment
    fi

    # Check if driver is set, if not, then ask for it (interactive mode)
    if [ -z "${driver}" ]; then
        echo -n "Enter driver: "
        read -r driver
    fi

    # Check if database is set, if not, then ask for it (interactive mode)
    if [ -z "${database}" ]; then
        echo -n "Enter database: "
        read -r database
    fi

    # Check if config is set, if not, then ask for it (interactive mode)
    if [ -z "${config}" ]; then
        while true; do
            echo -n "Enter config: "
            read -r config

            if [[ -f "${config}" ]]; then
                break
            fi

            printf "${RED}> %s${NC}\n" "Could not find .bakerc file in location \"${config}\""
        done
    fi

    # Check if migration_file is set, if not, then ask for it (interactive mode)
    if [ -z "${migration_file}" ]; then
        echo -n "Enter migration file: "
        read -r migration_file
    fi

    # Check if mode is set, if not, then ask for it (interactive mode)
    if [ -z "${mode}" ]; then
        while true; do
            echo -n "Enter mode [ up | down ]: "
            read -r mode

            if [[ "${mode}" =~ ^(up|down) ]]; then
                break
            fi

            printf "${RED}> %s${NC}\n" "Mode must be either \"up\" or \"down\""
        done
    fi
}

## Check capabilities
if [[ -x $PSQL ]]; then
    usage 1 "psql could not be found and is required"
fi

auto_yes=0

## Set up bash session
set_opts "${*}"

# Default to using the SCHEMA_DIR variable if the 'path' arg was not set
if [[ -z root_path ]]; then
    root_path="${SCHEMA_DIR}"
elif [[ ! -d "${root_path}" ]]; then
    usage 1 "Could not locate directory for schemas \"${root_path}\""
fi

schema_path="${root_path}/${driver}/${database}"

cd "${schema_path}" || usage $? "Can't cd into folder"

## Check if all the arguments are correct
if [[ ! -f "${config}" ]]; then
    usage 1 "Could not find .bakerc file in location \"${config}\""
fi

if [[ ! "${mode}" =~ ^(up|down) ]]; then
    usage 1 "Mode must be either \"up\" or \"down\""
fi

## Import config variables
source ${config}

MIGRATION_FILE_PATH="${migration_file}_${mode}.sql"

if [[ ! -f "${MIGRATION_FILE_PATH}" ]]; then
    usage 1 "Could not find migration operation ${MIGRATION_FILE_PATH}"
fi

## Inherit profile from environment set out by the config file
_PROFILES="PROFILES_$environment"[@]
PROFILES=("${!_PROFILES}")

echo "+==========================================+"
echo "|               INITIAL STATE              |"
echo "===========================================+"
echo "|       State         |       Version      |"
echo "+------------------------------------------+"
echo " Database             | $(get_last_version)"
echo " Migration File       | $(get_release_id_from_migration_file "${migration_file}")"
echo "--------------------------------------------"

if ! is_schema_initialized && [[ "${migration_file}" != "${INITIAL_SCHEMA}" ]]; then
    printf "${RED}> Database isn't initialized yet. You will need to run ${INITIAL_SCHEMA}_up. ${NC}\n"
fi

if is_schema_initialized; then
    if [[ "${mode}" == "up" ]]; then
        if [ "$(get_last_version)" -ge "$(get_release_id_from_migration_file "${migration_file}")" ]; then
            usage 1 "The database is already ahead of this migration file"
        fi

        echo "> The database is behind of this migration file"
    else
        if [ "$(get_last_version)" -lt "$(get_release_id_from_migration_file "${migration_file}")" ]; then
            usage 1 "The database is already behind this migration file"
        fi

        echo "> The database is ahead of this migration file"
    fi
fi

plan=$(get_release_files)

echo "> Plan is: ${plan[*]}"

if [ "${auto_yes}" -eq 0 ]; then
    while [[ ! $yn =~ (y|Y|n|N) ]]; do
        echo -n "? Should ${SCRIPT_NAME} perform the planned actions? [y/n]: "
        read -r yn
    done

    if [[ $yn =~ (n|N) ]]; then
        exit 1
    fi
fi

## Run PSQL commands to perform migration
for migration_file_part in ${plan}; do
    MIGRATION_FILE_PATH="${migration_file_part}_${mode}.sql"

    echo "> Performing migration to version $(get_release_id_from_migration_file "${migration_file_part}") (${MIGRATION_FILE_PATH})..."

    if [[ ! -f "${MIGRATION_FILE_PATH}" ]]; then
        usage 1 "Could not find migration operation ${MIGRATION_FILE_PATH}"
    fi

    psql_connection -f "${MIGRATION_FILE_PATH}"

    psql_status=$?

    if [[ "${psql_status}" -gt 0 ]]; then
        usage 1 "An error occurred connecting to psql"
    fi
done

sleep 1

echo "+==========================================+"
echo "|                FINAL STATE               |"
echo "===========================================+"
echo "|       State         |       Version      |"
echo "+------------------------------------------+"
echo " Database             | $(get_last_version)"
echo " Migration File       | $(get_release_id_from_migration_file "${migration_file}")"
echo "--------------------------------------------"

printf "${GREEN}> %s${NC}\n" "${SCRIPT_NAME} completed execution"
