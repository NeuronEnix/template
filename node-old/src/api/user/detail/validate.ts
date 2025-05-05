import Ajv from 'ajv';
import { T_Request } from '../../../types';

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
  const dataValidated = ajvValidator(req.body);
  if (!dataValidated) {
    console.log(ajvValidator.errors);
    throw ajvValidator.errors;
  }
  return req.body as T_InData;
}
