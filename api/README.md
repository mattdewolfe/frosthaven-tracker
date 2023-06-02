# puff-api

Express JS REST API server for communication between Parlworks Database and Frontend

## Requirements

NodeJS 14
AWS CLI
Terraform
SAM CLI version 1.20.0+

## Dependencies

PostgreSQL Database (RDS)

## Environment Variables

DB_HOST=<DATABASE_HOSTNAME>  
DB_PORT=5432  
DB_NAME=puff  
DB_USER=<DATABASE_USERNAME>  
DB_PASSWORD=<DATABASE_PASSWORD>  
These environment variables should be set by Terraform when deployed to AWS Lambda, they will need to be set manually when developing locally.

## Local Usage

The rnd-puff project supports running the API locally within a Docker container. In order to do that, however, it is necessary to set up the environment variables to tell the API that it should connect to the local database that will run alongside a local version of the API.

Create a `.env.local` file in `api` folder:
```bash
DB_HOST=host.docker.internal
DB_PORT=5432
DB_NAME=<SAME AS POSTGRES_DB>
DB_USER=<SAME AS POSTGRES_USER>
DB_PASSWORD=<SAME AS POSTGRES_PASSWORD>
PORT=8080
```

> **WARNING**: If you change the `PORT` in this file, then the `__API_ENDPOINT` value within the `frontend/webpack.config.<environment>.js` `local` Plugin needs
> to be updated to match the new port.

## Troubleshooting

### Failed to retrieve Province Families

> 500, false, connect ECONNREFUSED 127.0.0.1:5432

Double-check the `DB_HOST` environment variable within the `.env.local` file. It should be `host.docker.internal`. This makes the connection between the api and database Docker container instances possible.

## Contacts

For contact and support reach out:
Developer: Matt De Wolfe <matthewdewolfe@gmail.com>  
