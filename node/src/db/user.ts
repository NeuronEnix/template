import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';

import { T_ModelCommonField, CommonSchema } from './types';
import sequelize from './sequelizeCon';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare name: string;
  declare pass: string;

}
User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, },
    email: { type: DataTypes.STRING, allowNull: false, },
    name: { type: DataTypes.STRING, allowNull: false, },
    pass: { type: DataTypes.STRING, allowNull: false, },
  },
  { sequelize, modelName: 'user', freezeTableName: true, paranoid: true, timestamps: true }
);
export const UserSchema = {
  ...CommonSchema,
  pass: { type: 'string', minLength: 8, maxLength: 20 },
  email: { type: 'string', minLength: 5, maxLength: 50 },
  name: { type: 'string', minLength: 5, maxLength: 50 },
};
