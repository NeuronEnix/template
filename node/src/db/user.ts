import {
  Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes,
} from 'sequelize';

import { CommonSchema } from './config/types';
import sequelize from './config/sequelizeCon';
import { STATUS, IDP_TYPE } from '../common/const';

export const UserSchema = {
  ...CommonSchema,
  pass: { type: 'string', minLength: 8, maxLength: 20 },
  email: { type: 'string', minLength: 5, maxLength: 50 },
  name: { type: 'string', minLength: 5, maxLength: 50 },
};

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;

  declare email: string;

  declare name: string;

  declare pass: CreationOptional<string>;

  declare googleVerified: CreationOptional<boolean>;

  declare accTokJti: CreationOptional<{ jti: string, refJti: string, iat: Date }[]>;

  declare refTokJti: { jti: string, idp: IDP_TYPE, iat: Date }[];

  declare status: CreationOptional<number>;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    pass: { type: DataTypes.STRING, allowNull: true },

    googleVerified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    accTokJti: { type: DataTypes.JSON, allowNull: true },
    refTokJti: { type: DataTypes.JSON, allowNull: true },
    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: STATUS.ACTIVE },
  },
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ['email'] },
    ],
  },
);

User.sync({ alter: true });
