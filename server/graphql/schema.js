// import {
//   GraphQLObjectType,
//   GraphQLNonNull,
//   GraphQLSchema,
//   GraphQLString,
//   GraphQLList,
//   GraphQLInt,
//   GraphQLBoolean,
// } from 'graphql/type';


const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Login {
    Error: Int,
    message: String,
  }

  type Query {
    login(name: String, password: String): Login,
    hello: String
  }
`);

// type Query = buildSchema(`
//   type Login {
//     hello: String
//   }
// `);

//   type Hello = {
//     login: Query
//   }

// module.exports = {
//   query: Query,
//   Login: Query
// }

// import ToDoMongo from '../mongoose/user';

// export function getProjection(fieldASTs) {
//   return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
//     projections[selection.name.value] = true;
//     return projections;
//   }, {});
// }



// var todoType = new GraphQLObjectType({
//   name: 'todo',
//   description: 'todo item',
//   fields: () => ({
//     itemId: {
//       type: (GraphQLInt),
//       description: 'The id of the todo.',
//     },
//     item: {
//       type: GraphQLString,
//       description: 'The name of the todo.',
//     },
//     completed: {
//       type: GraphQLBoolean,
//       description: 'Completed todo? '
//     }
//   })
// });

// var schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//       todo: {
//         type: new GraphQLList(todoType),
//         args: {
//           itemId: {
//             name: 'itemId',
//             type: new GraphQLNonNull(GraphQLInt)
//           }
//         },
//         resolve: (root, {itemId}, source, fieldASTs) => {
//           var projections = getProjection(fieldASTs);
//           var foundItems = new Promise((resolve, reject) => {
//               ToDoMongo.find({itemId}, projections,(err, todos) => {
//                   err ? reject(err) : resolve(todos)
//               })
//           })

//           return foundItems
//         }
//       }
//     }
//   })
  
// });

// export default schema;
