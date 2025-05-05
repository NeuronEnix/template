import Ajv from 'ajv';
import { T_Request } from '../../../types';
import { UserSchema } from '../../../db/user';
import { resErr } from '../../../common/error';

const ajv = new Ajv({ allErrors: true });

export type T_InData = {
  email: string,
  pass: string,
  name: string,
  isNewUser: boolean
};
export type T_OutData = {
  userId: number,
  refreshToken: string
};

const ajvValidator = ajv.compile({
  type: 'object',
  properties: {
    email: UserSchema.email,
    pass: UserSchema.pass,
    name: UserSchema.name,
    isNewUser: { enum: [true, false] },
  },
  required: ['email', 'pass', 'name', 'isNewUser'],
  additionalProperties: false,
});

export async function validate(req: T_Request): Promise<T_InData> {
  const dataValidated = ajvValidator(req.body);
  if (!dataValidated) {
    throw resErr.gen.invalidParam('', ajvValidator.errors);
  }
  return req.body as T_InData;
}
