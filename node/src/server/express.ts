import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { CONFIG } from '../ctx/ctx.config';
import { ctxRouter } from '../ctx/ctx.router';
import { ctxErr } from "../ctx/ctx.error";
import { TCtx } from '../ctx/ctx.types';

const INSTANCE = CONFIG.INSTANCE;

const app = express();

function getPath(url: string): string {
  const queryParamPos = url.indexOf('?');
  if (queryParamPos === -1) return url;
  return url.substring(0, queryParamPos);
}

function getHttpCode( ctx: TCtx ) {
  if (typeof ctx.res?.code !== 'string') return 500;
  switch (ctx.res.code) {
    case 'OK': return 200;
    case 'UNKNOWN_ERROR': return 500;
    default: return 400;
  }
}

// app.use('/public', express.static(path.join(__dirname, '..', '/ui')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.all('/{*any}', async (req: Request, res: Response, _next: NextFunction) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.sendStatus(404);
    return;
  }
  
  const ctxMeta: TCtx['meta'] = getCtxMeta();
  const ctxReq: TCtx['req'] = getCtxRequest(req);
  const ctxUser: TCtx['user'] = getCtxUser(ctxReq);
  const ctx: TCtx = {
    id: ctxMeta.monitor.traceId,
    meta: ctxMeta,
    req: ctxReq,
    user: ctxUser,
  };

  await ctxRouter(ctx);
  res.type('application/json').status(getHttpCode(ctx)).send(ctx.res);
  
  // decrease the number of request inflight when response of this request goes out
  INSTANCE.INFLIGHT--;
  
  return;
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof SyntaxError) {
    const e = ctxErr.general.malformedRequestData()
    res.status(400).json({
      name: e.name,
      msg: e.message,
      data: e.data
    })
  }
});

app.listen(CONFIG.INSTANCE.PORT, () => {
  console.log(`Express server listening on port ${CONFIG.INSTANCE.PORT}`);
});

function getCtxHeader(req: Request): TCtx['req']['header'] {
  return {
    auth: String(req.headers['x-company-auth']) || 'none',
    clientInfo: {
      seq: isNaN(Number(req.headers['x-company-seq'])) ? 0 : Number(req.headers['x-company-seq']),
      sessionId: String(req.headers['x-company-session-id']) || 'none',
      deviceId: String(req.headers['x-company-device-id']) || 'none',
      deviceName: String(req.headers['x-company-device-name']) || 'none',
      appVersion: String(req.headers['x-company-app-version']) || 'none',
      userAgent: String(req.headers['user-agent']) || 'none',
    },
  };
}

function getCtxRequest(req: Request): TCtx['req'] {
  return {
    method: req.method,
    path: getPath(req.url),
    header: getCtxHeader(req),
    headerRaw: req.rawHeaders,
    data: req.method === 'POST' ? req.body : req.query,
    ip: req.ip || '',
    ips: req.ips || [],
  };
}

function getCtxUser(ctxReq: TCtx['req']): TCtx['user'] {
  return {
    id: 'none',
    seq: ctxReq.header.clientInfo.seq,
    sessionId: ctxReq.header.clientInfo.sessionId,
    deviceId: ctxReq.header.clientInfo.deviceId,
    deviceName: ctxReq.header.clientInfo.deviceName,
    appVersion: ctxReq.header.clientInfo.appVersion,
    role: 'none',
    token: {
      access: 'none',
      refresh: "none",
    },
  };
}

function getCtxMeta(): TCtx['meta'] {
  const curTime = new Date();
  const curSeq = ++INSTANCE.SEQ; // lifetime request sequence number
  const curInflight = ++INSTANCE.INFLIGHT; // number of request inflight when this request came in
  const curTraceId = `${INSTANCE.ID}-${curSeq}`; // trace id
  const curSpanId = `${INSTANCE.ID}-${curSeq}`; // span id

  return {
    serviceName: INSTANCE.SERVICE_NAME,
    instance: {
      id: INSTANCE.ID,
      createdAt: INSTANCE.CREATED_AT,
      seq: curSeq,
      inflight: curInflight,
    },
    monitor: {
      traceId: curTraceId,
      spanId: curSpanId,
      stdout: [],
      dbLog: [],
      ts: {
        in: curTime,
      },
    },
  };
}