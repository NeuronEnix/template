import Ajv from 'ajv';

import { T_Request } from '../../../types';
import execute from './execute';

const ajv = new Ajv({ allErrors: true });

export type T_InData = {
  userId: number
};

export type T_OutData = {
  userId: number,
  name: string
};

const ajvValidator = ajv.compile({
  type: 'object',
  properties: {
    userId: { type: 'integer', minimum: 1, maximum: 2 },
  },
  required: ['userId'],
  additionalProperties: false,
});

export async function validate(req: T_Request): Promise<T_InData> {
  req.query.userId = parseInt((req.query.userId ?? '-1') as string);
  const isValid = ajvValidator(req.query);
  if (!isValid) {
    console.log(ajvValidator.errors);
    throw ajvValidator.errors;
  }
  return req.query as T_InData;
}

export async function authorize(data: T_InData): Promise<T_InData> {
  return data;
}

export default async function (req: T_Request): Promise<T_OutData> {
  return validate(req).then(authorize).then(execute);
}
