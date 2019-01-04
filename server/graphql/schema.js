const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  type Login {
    error: Int,
    message: String,
    token: String,
  }

  type Check {
    error: Int,
    message: String,
  }

  type Reg {
    error: Int,
    message: String,
    token: String,
  }

  type Logout {
    error: Int,
    message: String,
  }

  type Query {
    login(name: String, password: String): Login,
    reg(name: String, password: String, passwordConf: String): Reg,
    check(token: String): Check,
    logout: Logout,
    hello: String
  }
`);
