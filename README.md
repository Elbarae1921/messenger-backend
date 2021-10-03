# Backend services for Messenger app

## Setup

Create a `.env` (for running the app outside of docker- development) and `.env.prod` (for running the app inside docker- production) file from the `.env.example` and `.env.prod.example` respectively, and assign the variables their corresponding values.

### Development

```bash
$ # start up the db
$ yarn docker:db
$ # install dependencies
$ yarn
$ # run the migrations
$ yarn migration:up
$ # start the app in watch mode
$ yarn start:dev
```

### Production

```bash
$ # start up the containers
$ yarn docker:compose
$ # run the migrations
$ yarn docker:migration:up
```
