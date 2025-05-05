import { compare as comparePass } from 'bcrypt';

import { randomUUID } from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../db/user';
import { resErr } from '../common/error';
import { IDP_TYPE, STATUS, AUTH } from '../common/const';

export default async function getNewRefreshToken(
  idp: IDP_TYPE,
  email: string,
  pass?: string,
): Promise<{ userId: number, refreshToken: string }> {
  const user = await User.findOne({
    where: { email },
    attributes: ['id', 'pass', 'googleVerified', 'status', 'refTok'],
  });

  if (!user) {
    throw resErr.auth.userNotFound();
  }
  if (user.status !== STATUS.ACTIVE) {
    throw resErr.auth.userInactive();
  }

  switch (idp) {
    case 'basic': {
      if (!pass || !user.pass) throw resErr.auth.invalidCredential();
      const isPassOk = await comparePass(pass, user.pass);
      if (!isPassOk) throw resErr.auth.invalidCredential();
    } break;

    case 'google':
      if (!user.googleVerified) throw resErr.auth.userNotFound();
      break;

    default:
      throw resErr.gen.unknown();
  }

  const refreshTokenPayload = {
    id: user.id,
    idp,
    jti: randomUUID(),
    iat: parseInt((Date.now() / 1000).toString(), 10),
  };

  const refreshToken = jwt.sign(
    refreshTokenPayload,
    AUTH.REFRESH_TOKEN_SECRET,
    { expiresIn: AUTH.REFRESH_TOKEN_EXPIRE },
  );

  return {
    userId: user.id,
    refreshToken,
  };
}
