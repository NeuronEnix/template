import { T_Request, T_Response } from './types';
import { ResponseError } from './common/error';
import * as api from './api/index';

export default async function router(req: T_Request): Promise<T_Response> {
  try {
    const res: T_Response = {
      httpCode: 200,
      body: {
        code: 'OK',
        msg: 'OK',
        data: {},
      },
    };

    console.log(req);
    const reqPath = `${req.method} ${req.path}`;

    switch (reqPath) {
      case 'POST /user/signUp': res.body.data = await api.userAPI.signUp(req); break;
      case 'POST /auth/google': res.body.data = await api.authAPI.google(req); break;
      case 'GET /auth/google': res.body.data = await api.authAPI.google(req); break;
      // case 'POST /user/signIn': res.body.data = await api.userAPI.signIn(req); break;
      // case 'GET /user/detail': res.body.data = await api.userAPI.detail(req); break;

      default: res.httpCode = 400; res.body.code = 'INVALID_API'; res.body.msg = 'API Not available';
    }
    return res;
  } catch (err) {
    console.log(err);

    const e: T_Response = {
      httpCode: 500,
      body: {
        code: 'UNKNOWN_ERROR',
        msg: 'Something went wrong',
        data: {},
      },
    };

    if (err instanceof ResponseError) {
      if (err.code !== 'UNKNOWN_ERROR') e.httpCode = 400;
      e.body.code = err.code;
      e.body.msg = err.msg;
      e.body.data = err.data;
    }
    return e;
  }
}
