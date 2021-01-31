# free-real-estate

## Environment Setup
```bash
# Install Node.js Current https://nodejs.org/en/
npm install --global yarn

# Install PostgreSQL https://www.postgresql.org/download/windows/
# Create a new user and database for that user
psql
> CREATE ROLE freerealestate PASSWORD 'its_free_real_estate' CREATEDB;
> CREATE DATABASE freerealestate WITH OWNER freerealestate;
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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
