import { T_Request, T_Response } from './types';
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

    switch (`${req.method} ${req.path}`) {
      case 'POST /user/signUp': res.body.data = await api.userAPI.signUp(req); break;
      // case 'POST /user/signIn': res.body.data = await api.userAPI.signIn(req); break;
      // case 'GET /user/detail': res.body.data = await api.userAPI.detail(req); break;

      default: res.httpCode = 400; res.body.code = 'INVALID_API'; res.body.msg = 'API Not available';
    }
    return res;
  } catch (err) {
    console.log(err);
    return {
      httpCode: 400,
      body: {
        code: 'ERR',
        msg: 'ERR',
        data: {},
      },
    };
  }
}
