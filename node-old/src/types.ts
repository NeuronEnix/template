/* eslint-disable no-unused-vars */

export type T_Request = {
  path: string,
  method: 'GET' | 'POST',
  source: {
    ip: string,
    port?: number,
    agent?: string
  },
  headers: { auth?: string },
  query: { [key: string]: number | string | boolean },
  body: { [key: string]: number | string | object | boolean | null }
};

export type T_Response = {
  httpCode: 200 | 400 | 500,
  body: {
    code: string,
    msg: string,
    data: { [key: string]: number | string | object | boolean | null }
  }
  cookie?: { [key: string]: string }
};

export type T_Module = {
  validate(req: T_Request): Promise<T_Request> | T_Request;
  authorize(req: T_Request): Promise<T_Request> | T_Request;
  logic(req: T_Request): Promise<T_Response>;
};
