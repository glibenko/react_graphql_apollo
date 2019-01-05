### React GraphQL Apollo

This app show us how to use graphQL apollo with react

This App using:

* React
* Express
* GraphQL
* Apollo
* Mongodb
* Webpack
* ESlint
* Babel

### Fast start
```sh
# Clone the repository
$ git clone https://github.com/njiyto/react_graphql_apollo.git

# Install dependencies
$ npm install

# Start mongodb:
$ mongod --dbpath /Users/ser/Desktop/dev/mongodb

# Build app for dev
$ npm start
```

### Description
* [npm start] - concurrently run two commands below
* [npm run build:dev] - webpack --progress
* [npm run start:dev] -  nodemon --watch ./server/server.js --watch ./server/ on 3005 port
* else you can open mongodb admin panel - localhost:3005/mongo_express

### Folder Structure
* [client] - there are all files which relate to front
* [public] - there is a ready app
* [server] - there are all files which relate to server and mongodb
* [root files] - there are all settings files

### Contribution
everytime check:
```
$ git config user.email
$ git config user.email 'example@mail'
$ git remote -v
$ git remote set-url origin
```