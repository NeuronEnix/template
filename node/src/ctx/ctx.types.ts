type CtxReq = {
  header: {
    auth: string;
    clientInfo: {
      seq: number;
      sessionId: string;
      deviceId: string;
      deviceName: string;
      appVersion: string;
      userAgent: string;
    }
  };
  headerRaw: string[];
  method: string;
  path: string;
  data: {
    [key: string]: unknown;
  }
  ip: string;
  ips: string[];
};

type CtxRes = {
  code: string;
  msg: string;
  data: { [key: string]: unknown };
  meta?: {
    ctxId: string;
    traceId: string;
    spanId: string;
    inTime: Date;
    outTime: Date;
    execTime: number;
  }
};

type CtxMeta = {
  serviceName: string;
  instance: {
    id: string;
    createdAt: Date;
    seq: number;
    inflight: number; // number of request inflight when this request came in
  }
  monitor: {
    traceId: string;
    spanId: string;
    stdout: string[];
    dbLog: string[];
    ts: {
      in: Date; // request in time
      out?: Date; // request out time
      execTime?: Date; // total execution time
    }
  }
};

type CtxTrace = {
  traceId: string;
  spanId: string;
  stdout: string[];
  dbLog: string[];
  ts: {
    in: Date; // request in time
    out?: Date; // request out time
    execTime?: Date; // total execution time
  }
}

type CtxUser = {
  id: string;
  role: string;
  seq: number;
  sessionId: string;
  deviceName: string;
  deviceId: string;
  appVersion: string;
  token: {
    access: string,
    refresh: string,
  }
};

export type TCtx = {
  id: string;
  meta: CtxMeta;
  req: CtxReq;
  res?: CtxRes;
  user: CtxUser;
};

export interface IBaseApi {
  auth(ctx: TCtx): Promise<TCtx>;
  validate(ctx: TCtx): Promise<TCtx>;
  handle(ctx: TCtx): Promise<TCtx>;
}


