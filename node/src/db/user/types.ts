import { T_ModelCommonField, CommonSchema } from '../types';

export type T_UserModel = T_ModelCommonField & {
  email: string;
  name: string;
  password: string;
};

export const UserSchema: Record<keyof T_UserModel, object> = {
  ...CommonSchema,
  password: { type: 'string', minLength: 8, maxLength: 20 },
  email: { type: 'string', minLength: 5, maxLength: 50 },
  name: { type: 'string', minLength: 5, maxLength: 50 },
};
