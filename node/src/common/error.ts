type T_Code =
// General
'UNKNOWN_ERROR' | 'INVALID_PARAM'
// Auth
| 'USER_NOT_FOUND' | 'USER_INACTIVE' | 'INVALID_CREDENTIAL' | 'GOOGLE_AUTH_ERROR';

export class ResponseError extends Error {
  code: T_Code;

  msg: string;

  data: { [key: string]: number | string | object | boolean | null };

  info: object;

  constructor({
    code = 'UNKNOWN_ERROR', msg = 'Something went wrong', data = {}, info = {},
  }: {
    code?: T_Code,
    msg?: string,
    data?: { [key: string]: number | string | object | boolean | null },
    info?: object,
  }) {
    super(code);
    this.name = code;
    this.code = code;
    this.msg = msg;
    this.data = data;
    this.info = info;
  }
}

export const resErr = {
  gen: {
    unknown: () => new ResponseError({ msg: 'Something went wrong' }),

    invalidParam: (msg?: string, info?: object | null) => new ResponseError({
      code: 'INVALID_PARAM',
      msg: msg || 'Invalid request param',
      info: info || {},
    }),
  },

  auth: {
    userNotFound: () => new ResponseError({
      code: 'USER_NOT_FOUND',
      msg: 'User not found',
    }),
    userInactive: () => new ResponseError({
      code: 'USER_INACTIVE',
      msg: 'User is not active',
    }),
    invalidCredential: () => new ResponseError({
      code: 'INVALID_CREDENTIAL',
      msg: 'Invalid credential',
    }),
    googleAuthError: (msg?: string, info?: object | null) => new ResponseError({
      code: 'GOOGLE_AUTH_ERROR',
      msg: msg || 'Google Auth Error',
      info: info || {},
    }),
  },

};
