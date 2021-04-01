# free-real-estate

## Environment Setup

```bash
# Install Node.js Current https://nodejs.org/en/
$ npm install --global yarn

# Install PostgreSQL https://www.postgresql.org/download/windows/
# Create a new user and database for that user
$ psql
> CREATE ROLE freerealestate PASSWORD 'its_free_real_estate' CREATEDB;
> CREATE DATABASE freerealestate WITH OWNER freerealestate;
```

## PDF Generation Dependencies

```bash
# A couple of required dependencies for PDF generation to work correctly (**NOTE**: PDF generation will not work on Windows)
$ sudo apt install libpoppler-qt5-dev libcairo2-dev
```

## Build Setup

```bash
# install dependencies
$ yarn install

# Generate ORM, push database schema, and generate OpenAPI schema
$ yarn generate

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start
```

## CRON Setup

The requirements specify that we must send out daily emails.
This CRON job will automatically send out these emails and reset daily hit counters in the database.

```bash
crontab -e # Open crontab file for editing and add the following line with variables correctly substituted
0 0 * * * cd ${PATH_TO_PROJECT}; ${YARN_ABSOLUTE_PATH} run-script scripts/sendEmail.ts
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
