import { AxiosError } from "axios"

import { ctxErr, CtxError } from './ctx.error';
import { TCtx } from './ctx.types'

import * as api from '../api/index';

export async function ctxRouter(ctx: TCtx): Promise<TCtx> {

  try {
    const reqPath = `${ctx.req.method} ${ctx.req.path}`;
    console.log(`[${ctx.meta.monitor.traceId}] | [${ctx.user.id}] | CtxReq: [${reqPath}] | [IP: ${ ctx.req.ips || ctx.req.ip}]`);
    console.log(`[${ctx.meta.monitor.traceId}] | [${ctx.user.id}] | CtxUser: [Session: ${ctx.user.sessionId}] | [Seq: ${ctx.user.seq}]`);
    console.log(`[${ctx.meta.monitor.traceId}] | [${ctx.user.id}] | CtxMeta: [Seq: ${ctx.meta.instance.seq}] | [Inflight: ${ctx.meta.instance.inflight}]`);

    switch (reqPath) {

      case 'GET /hello/world': await api.hello.world(ctx); break;
      case 'GET /hello/kaushik': await api.hello.kaushik(ctx); break;

      case 'GET /ping': await api.ping.ping(ctx); break;

      default: ctxErr.general.invalidApi();
    }
    return ctx;
  } catch (e) {
    if (e instanceof CtxError) {
      if (e.info instanceof AxiosError) {
        console.log('CtxError:info:AxiosError:config', e.info.config?.data ?? e.info.config ?? 'no config data');
        console.log('CtxError:info:AxiosError:response', e.info.response?.data ?? e.info.response ?? 'no response data');
      } else if (typeof e.info === 'object') {
        console.log('CtxError:info:', JSON.stringify(e.info));
      } else {
        console.log('CtxError:info:', e.info);
      }
      ctx.res = { code: e.name, msg: e.message, data: e.data };
      return ctx;
    }

    // ideally should never come here, god forbid it did
    console.log('CtxError:unknown:fatal', e);
    const error = ctxErr.general.unknown();
    ctx.res = {
      code: error.name,
      msg: error.message,
      data: {},
    }
    return ctx;
  }
}
