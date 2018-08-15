# node-ws-seed

## Stack
* Express
* MongoDB
* Passport
* ESLint
* ES6/7

## Features
* ODM mongoose
* Environment variables for configuration
* CORS support
* Authentication using email/password and JWT tokens
* Simple authorization middlewares

## Setup

### Database

You have to install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/). Before running de server make sure that MongoDB is properly running.

### Add dependencies

```bash
$ yarn add <package>
```

### Install dependencies

```bash
$ yarn  # yarn install
```

### Start the app

```bash
$ yarn start
```

Open browser on [localhost:3000](http://localhost:3000/)

### NPM Scripts

```bash
$ yarn start # execute server

$ yarn lint # execute linting
```

## API

This is a basic API designed with RESTFul principles and best practices in mind.

The different available endpoints are documented [here](https://documenter.getpostman.com/view/2111440/RWTmuyJV) and all private endpoints must have an authorization header with a Bearer token.

The token is issued when an user is registered and when an existing user logs in. The API accepts and always responds with a json body.

## TODO
* Add missing authentication features (activate users, reset password)
* Add logger to use instead of `console.log`
* Add automated tests

## License

Licensed under the MIT License, Copyright © 2018 [Johan Quiroga](http://johanquiroga.me).

See [LICENSE](./LICENSE) for more information.
