import { Sequelize } from 'sequelize';
import CONFIG from '../../config';

const sequelize = new Sequelize({
  host: CONFIG.DB.HOST,
  port: CONFIG.DB.PORT,
  username: CONFIG.DB.USER,
  password: CONFIG.DB.PASS,
  database: CONFIG.DB.NAME,
  dialect: 'mysql',
});

export default sequelize;
