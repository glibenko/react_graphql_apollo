const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoExpress = require('mongo-express/lib/middleware');
const mongoose = require('mongoose');
const passport = require('passport');
const helmet = require('helmet');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const mongoExpressConfig = require('../mongo_express.config');

// const schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

// const root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };


mongoose.connect('mongodb://localhost:27017/db', { useNewUrlParser: true });

const app = express();

app.use(helmet());
app.use('/mongo_express', mongoExpress(mongoExpressConfig));
app.use(session({
  name: 'session_name',
  secret: 'session_secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ url: 'mongodb://localhost:27017/db' }),
  // cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// api
// const api = require('./api');

// app.use('/api', api);

const context = {
  greeting: 'Hello world!',
}

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true,
  context,
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', ((req, res) => {
  res.render('index');
}));

app.listen(3005, () => console.log('Example app listening on port 3005!'));
