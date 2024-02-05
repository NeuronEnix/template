export class ResponseError extends Error {
  code: string;

  msg: string;

  data: { [key: string]: number | string | object | boolean | null };

  info: object;

  constructor({
    code = 'UnknownError', msg = 'Something went wrong', data = {}, info = {},
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
    googleAuthError: (msg?: string, info?: object | null) => new ResponseError({
      code: 'GOOGLE_AUTH_ERROR',
      msg: msg || 'Google Auth Error',
      info: info || {},
    }),
  },

};
