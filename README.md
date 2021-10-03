# Backend services for Messenger app

## Setup

Create a `.env.local` for local development (outisde docker) from the `.env.local.example` file.

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

Create a `.env` for production from the `.env.example` file.

```bash
$ # start up the containers
$ yarn docker:compose
$ # run the migrations
$ yarn docker:migration:up
```
