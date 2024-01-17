import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';

import { CommonSchema } from './types';
import sequelize from './config/sequelizeCon';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare name: string;
  declare pass: string;
  declare status: CreationOptional<number>;
}
User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataTypes.STRING, allowNull: false, },
    name: { type: DataTypes.STRING, allowNull: false, },
    pass: { type: DataTypes.STRING, allowNull: false, },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1}
  },
  { sequelize, modelName: 'user', freezeTableName: true, paranoid: true, timestamps: true }
);
User.sync({alter:true})
export const UserSchema = {
  ...CommonSchema,
  pass: { type: 'string', minLength: 8, maxLength: 20 },
  email: { type: 'string', minLength: 5, maxLength: 50 },
  name: { type: 'string', minLength: 5, maxLength: 50 },
};
