import { ValidateFunction } from "ajv";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ctxErr } from "./ctx.error";
import { TCtx } from "./ctx.types";
import { CONFIG } from "./ctx.config";



export function sanitizeData(ctx: TCtx, ajvValidator: ValidateFunction): TCtx {
  const sanitizedData = ajvValidator(ctx.req.data);
  if (!sanitizedData) {
    // typeguard to satisfy typescript, but should never happen
    if (!ajvValidator.errors) throw ctxErr.general.unknown({
      info: ajvValidator,
    });
    throw ctxErr.general.sanityError({
      info: ajvValidator.errors,
    });
  }
  return ctx;
}

type TTokenPayload = {
  userId: string;
  role: string;
}

export async function verifyAccessToken(ctx: TCtx): Promise<TCtx> {

  const bearerToken = ctx.req.header.auth;
  if (typeof bearerToken !== 'string') throw ctxErr.auth.invalidAccessToken();

  const accessToken = bearerToken.replace('Bearer ', '');
  try {
    const tokenPayload = jwt.verify(accessToken, CONFIG.SECRET.JWT.ACCESS_TOKEN, { algorithms: ['HS256'] }) as TTokenPayload;
    ctx.user.id = tokenPayload.userId;
    ctx.user.role = tokenPayload.role;
  } catch (e) {
    if (e instanceof TokenExpiredError) throw ctxErr.auth.expiredAccessToken();
    if (e instanceof JsonWebTokenError) throw ctxErr.auth.invalidAccessToken();
    throw e;
  }
  console.log(`User: ${ctx.user.id} | ${ctx.user.role}`);
  return ctx;
}