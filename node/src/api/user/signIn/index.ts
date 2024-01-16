import Ajv from 'ajv';

import { T_Request } from '../../../types';
import execute from './execute';
import { UserSchema } from '../../../db/user/types';

const ajv = new Ajv({ allErrors: true });

export type T_InData = {
  email: string,
  pass: string
};

export type T_OutData = {
  userId: number,
  accessToken: string,
  refreshToken: string,
};

const ajvValidator = ajv.compile({
  type: 'object',
  properties: {
    email: UserSchema.email,
    pass: UserSchema.pass,
  },
  required: ['email', 'pass'],
  additionalProperties: false,
});

async function validate(req: T_Request): Promise<T_InData> {
  const dataValidated = ajvValidator(req.body);
  if (!dataValidated) {
    console.log(ajvValidator.errors);
    throw ajvValidator.errors;
  }
  return req.body as T_InData;
}

async function authorize(data: T_InData): Promise<T_InData> {
  return data;
}

export default async function (req: T_Request): Promise<T_OutData> {
  return validate(req).then(authorize).then(execute);
}
