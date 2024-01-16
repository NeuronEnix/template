import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:pass123@localhost:3306/homewatch');

export default sequelize
