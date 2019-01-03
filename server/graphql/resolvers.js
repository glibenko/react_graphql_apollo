const User = require('../mongoose/user');

const resolvers = {
  hello: (arg, context) => {
    return arg + context.greeting;
  },
  // books: async (args, context) => {
  //   // See "greeting: 'Hello world!'" in Terminal
  //   console.log(context)

  //   return (await Book.find())
  // },
  login: async (args, context) => {
    // console.log('args, context', id, context);
    // return {id: args.id, l: 'lala'};
  //     if (!req.body.name && !req.body.password) {
  //   return res.send({ error: 1000, message: 'bad data' });
  // }

    try {
      const user = await User.findOne({ name: args.name });
      // const checkPassword = await bcrypt.compare(req.body.password, user.hash);
      // const token = await jwt.sign({ foo: 'bar' }, 'jwt_secret');
      // if (checkPassword && token) {
      //   req.session.userId = user._id;
      //   return res.send({ error: 0, token });
      // }
      console.log('user', user);
      return { error: 1000, message: 'password or login is wrong' };
    } catch (err) {
      console.log('login-err', err);
      return { error: 1000, message: 'password or login is wrong' };
    }
    // var newBook = new Book({
    //   title: args.title,
    //   author: args.author
    // })

    // var err = await newBook.save()

    // if (err) return err
    // return newBook
  },
  // removeBook: async (args, context) => {
  //   var doc = await Book.findOneAndRemove({
  //     title: args.title
  //   })

  //   return doc
  // }
}

module.exports = resolvers;
