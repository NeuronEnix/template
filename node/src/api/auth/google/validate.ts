import Ajv from 'ajv';
import { T_Request } from '../../../types';
import { resErr } from '../../../common/error';

const ajv = new Ajv({ allErrors: true });

export type T_InData = {
  code: string,
  scope: string,
  authuser: string,
  prompt: string,
};

export type T_OutData = {
  userId: number,
  refreshToken: string
};

const ajvValidator = ajv.compile({
  type: 'object',
  properties: {
    code: { type: 'string', minLength: 1, maxLength: 1000 },
    scope: { type: 'string', minLength: 1, maxLength: 1000 },
    authuser: { type: 'string', minLength: 1, maxLength: 50 },
    prompt: { type: 'string', minLength: 1, maxLength: 50 },
  },
  required: ['code', 'scope', 'authuser', 'prompt'],
  additionalProperties: false,
});

export async function validate(req: T_Request): Promise<T_InData> {
  const dataValidated = ajvValidator(req.query);
  if (!dataValidated) {
    throw resErr.gen.invalidParam('', ajvValidator.errors);
  }
  return req.query as T_InData;
}
