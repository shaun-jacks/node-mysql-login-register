const Sequelize = require("sequelize");
const config = require("./config.json")[process.env.NODE_ENV];
module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
