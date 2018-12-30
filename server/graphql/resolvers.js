const User = require('../mongoose/user');

const resolvers = {
  hello: (args, context) => {
    return context.greeting;
  },
  // books: async (args, context) => {
  //   // See "greeting: 'Hello world!'" in Terminal
  //   console.log(context)

  //   return (await Book.find())
  // },
  login: async (args, context) => {
    console.log('args, context', args, context);
    return args;
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
