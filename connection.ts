import { Sequelize } from "sequelize-typescript";

import { users } from "./models/user";

const connection = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root123",
  database: "my_awesome_db",
  logging: false,
  models: [users],
});

export default connection;