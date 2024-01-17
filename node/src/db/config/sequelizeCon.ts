import { Sequelize } from 'sequelize';
import config from '../../config';

const sequelize = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  dialect: 'mysql',
});

export default sequelize;
