const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../mongoose/user');

const resolvers = {
  hello: () => 'hello',

  reg: async (args, context) => {
    if (!args.name && !args.password && !args.passwordConf) {
      return { error: 1000, message: 'bad data' };
    }

    if (args.password !== args.passwordConf) {
      return { error: 1000, message: 'passwords are not same' };
    }

    try {
      const hash = await bcrypt.hash(args.password, 10);
      const token = await jwt.sign({ foo: 'bar' }, 'jwt_secret');

      if (hash && token) {
        const data = {
          name: args.name,
          hash,
        };

        const newUser = new User(data);

        const save = await newUser.save();
        console.log('save', save);
        if (save) {
          context.session.userId = save._id;
          return { error: 0, token };
        }
      }
      return { error: 1000 };
    } catch (err) {
      console.log('save err', err);
      return { error: 1000 };
    }
  },

  login: async (args, context) => {
    if (!args.name && !args.password) {
      return { error: 1000, message: 'bad data' };
    }

    try {
      const user = await User.findOne({ name: args.name });
      const checkPassword = await bcrypt.compare(args.password, user.hash);
      const token = await jwt.sign({ foo: 'bar' }, 'jwt_secret');
      if (checkPassword && token) {
        context.session.userId = user._id;
        console.log('context', context.session);
        return { error: 0, message: 'success', token };
      }
      console.log('user', user);
      return { error: 1000, message: 'password or login is wrong' };
    } catch (err) {
      console.log('login-err', err);
      return { error: 1000, message: 'password or login is wrong' };
    }
  },

  check: async (args, context) => {
    console.log('args', args);
    if (!context.session.userId) {
      return { error: 1000, message: 'session is wrong' };
    }
    if (!args.token) {
      return { error: 1000, message: 'token is wrong' };
    }

    try {
      const checkToken = await jwt.verify(args.token, 'jwt_secret');
      const findUser = await User.findById(context.session.userId);
      if (checkToken && findUser) {
        return { error: 0, message: 'success' };
      }
      return { error: 1000, message: 'check error' };
    } catch (err) {
      console.log('check-err', err);
      return { error: 1000, message: 'catch check error' };
    }
  },

  logout: async (args, context) => {
    if (!args.token && !context.session.userId) {
      return { error: 1000, message: 'unauthorization' };
    }
    context.session.destroy();
    return { error: 0, message: 'success' };
  },

};

module.exports = resolvers;
