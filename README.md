<h1 align='center'>Menguer Wallet - API</h1>
<br />
<br />

<p align='center'>
  <img alt='GitHub top language' src='https://img.shields.io/github/languages/top/cristianmenguer/menguer-wallet-api?color=red'>

  <img alt='Repository size' src='https://img.shields.io/github/repo-size/cristianmenguer/menguer-wallet-api?color=blue'>

  <a href='https://github.com/cristianmenguer/menguer-wallet-api/commits/master'>
    <img alt='GitHub last commit' src='https://img.shields.io/github/last-commit/cristianmenguer/menguer-wallet-api?color=orange'>
  </a>

  <a href='https://github.com/cristianmenguer/menguer-wallet-api/issues'>
    <img alt='Repository issues' src='https://img.shields.io/github/issues/cristianmenguer/menguer-wallet-api?color=green'>
  </a>
</p>

<h2 align='center'>A Typescript API developed for study purposes in CCT - Guided Technology Project</h2>

<hr />

## Table of contents
* [General info](#general-info)
* [Requirements](#requirements)
* [Getting started](#getting-started)
* [Routes](#routes)
* [Technologies](#technologies)
* [Author](#author)

## General info

A Nodejs Typescript app built to study API's!

## Requirements

- [Node.js](https://nodejs.org/): Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [Yarn](https://yarnpkg.com/): Yarn is a package manager that doubles down as project manager.
- Local or remote instance of [MongoDB](https://www.mongodb.com/)

## Getting started

1. Clone this repo using `git clone https://github.com/cristianmenguer/menguer-wallet-api.git`.
2. Move to the appropriate directory: `cd menguer-wallet-api`.<br />
3. Run `yarn` to install dependencies.<br />
4. Run `yarn start`, it will start the API using the Atlas cluster.

## Routes

### Session

#### Creating a session (JWT):
```
{POST} /session
```

Body: 
```
{
    'username': 'username',
    'password': 'password'
}
```


### User

#### Getting all users
```
{GET} /users
```
It returns all the users.

#### Getting individual users
```
{GET} /users/{:EMAIL} 
```
or
```
{GET} /users/{:USERNAME} 
```
It is possible to search a user by its email or username.

#### Adding new users individually
```
{POST} /users
```
It adds a new user and returns the object created. The following body is necessary.
```
{
    'name': 'Name',
    'username': 'username',
    'email': 'username@email.com',
    'password': 'password',
    'usertype': 'user'
}
```

The password is not saved, only the hashed password.

There are two options for UserType:
```
UserType {
    ADMIN = 'admin',
    USER = 'user'
}
```

## Technologies

- **Node.js** — Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Typescript** — Typed JavaScript at Any Scale.
- **bcrypt.js** — Optimized bcrypt in plain JavaScript with zero dependencies.
- **express** — Fast, unopinionated, minimalist web framework for node.
- **jsonwebtoken** — JsonWebToken implementation for node.js.
- **uuidv4** — uuidv4 creates v4 UUIDs.
- **mongodb** — The MongoDB Database.


## Author

Created by [@CristianMenguer](https://github.com/CristianMenguer/) - feel free to contact me!