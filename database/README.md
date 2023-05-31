# Wolfe Works Frosthaven Tracker DB

## Prerequisites

## Initial Schema

This file is required when a database is freshly created. `bake` will determine if the `version` table exists and ensure
the database is initialized first before running subsequent migrations.

This file requires a minimum of the following schema in order to be compatible with `bake`.

File name: `0_initial-schema_up.sql`

```sql
BEGIN;

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Create the database for <DATABASE>
--

CREATE SCHEMA IF NOT EXISTS <DATABASE>;

-- ANY SCHEMA BEFORE EXECUTION

--
-- Create the table for <DATABASE>.version
--

CREATE TABLE <DATABASE>.version (
	 "release_id" INTEGER PRIMARY KEY NOT NULL,
	 "file_path" TEXT NOT NULL,
	 "date_committed" INTEGER DEFAULT date_part('epoch'::text, now())::integer NOT NULL
);

-- ANY SCHEMA AFTER EXECUTION, where you would be building the rest of your tables

INSERT INTO "reset_pin"."version" ("release_id", "file_path") VALUES (0, '0_initial-schema');

COMMIT;
```

#### up

This part of the migration schema will include the constructive changes to be made to the database. It's required that
the file is wrapped in a transaction and the last action be adding a version entry in the `version` table.

Example: `2_JJSVCS-110_up.sql`

```sql
BEGIN;

ALTER TABLE "vapepi"."device" ADD COLUMN "bluetooth_device_address" CHARACTER VARYING(32);

INSERT INTO "vapepi"."version" ("release_id", "file_path") VALUES (2, '2_JJSVCS-110');

COMMIT;
```

## Usage

### Migrating schemas

#### Configuration Files

Each environment (`local`, `development`, `staging`, `prod`) uses a set of environment variables that are required for the `bake` tool to be able to
connect to in order to be able to apply any schema changes against.

Create a `.env.<environment>` file in this (`database`) folder, where `<environment>` is one of the previously mentioned environments and give it the
following variables and values:

```bash
POSTGRES_USER=master_user
POSTGRES_PASSWORD=<PASSWORD>
POSTGRES_DB=parliament
```

> NOTE: For every environment that you want to apply the schema updates to, it is necessary to create a `.env.<environment>` file containing the correct values.

Create a `.bakerc` file in this (`database`) folder:

```bash
PROFILES_<environment>=(
  'username::<SAME AS POSTGRES_USER>'
  'password::<SAME AS PROSGRES_PASSWORD>'
  'hostname::<HOST FOR ENVIRONMENT>'
  'port::5432'
)
```

> NOTE: When creating a `PROFILES_local` entry, set the `hostname::` value to be `host.docker.internal`. This will allow the Docker service that you will run to locate the `parliament-db` service on the host machine.

> WARNING: For Windows users, make sure the line endings for this file are set to LF and **NOT** CRLF.
> Using CRLF line endings will cause the `bake.sh` script to fail to correctly read the contents of the `PROFILES_` lists.

### Updating the database

The `docker-compose.yml` file in this (`database`) folder makes use of multiple environment variables that should be made available at the time of running. An easy way to set these variables is to create a `.env` file within the folder. It will be automatically picked up and used by Docker Compose.

#### Environment Variables

| Name | Description | Example |
| ---- | ----------- | ------- |
| BAKE_MODE | The direction in which the schema should be applied (can be either `up` or `down`) | BAKE_MODE=up |
| BAKE_ENV | The environment to which the schema changes should be applied (corresponds to the `PROFILES_<environment>` entries within the `.bakerc` file) | BAKE_ENV=local |
| BAKE_MIGRATION | The name of the schema migration file that should be run (do not include the `_<up\|down>.sql` portion of the filename) | BAKE_MIGRATION=0_initial-schema |

#### Applying Schema Update

Running the following command will execute the `bake.sh` script within a Docker container so you don't have to use a specific terminal or dependencies.

```bash
$ docker compose run bake
```

## Contacts

For contact and support reach out:  
Developers: Matt De Wolfe <matthewdewolfe@gmail.com>
