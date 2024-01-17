import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize('mysql://root:pass123@localhost:3306/homewatch');
const sequelize = new Sequelize({
  host: "localhost",
  username: "root",
  password: "pass123",
  database: "homewatch",
  dialect: "mysql"
});

export default sequelize
