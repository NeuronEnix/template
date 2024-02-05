import axios from 'axios';
import jwt from 'jsonwebtoken';

import userDao from '../../../db/user';
import CONFIG from '../../../common/config';
import { STATUS, AUTH, IDP_TYPE } from '../../../common/const';
import { resErr } from '../../../common/error';
import { T_InData, T_OutData } from './validate';

type T_oauthData = {
  access_token: string,
  expires_in: number,
  refresh_token?: string,
  scope: string,
  token_type: string,
  id_token: string
};

type T_IdTokenData = {
  iss: string,
  azp: string,
  aud: string,
  sub: string,
  email: string,
  email_verified: boolean,
  at_hash: string,
  iat: number,
  exp: number
};

export default async function execute(data: T_InData): Promise<T_OutData> {
  const res = await axios.post('https://accounts.google.com/o/oauth2/token', {
    code: data.code,
    client_id: CONFIG.IDP.GOOGLE.CLIENT_ID,
    client_secret: CONFIG.IDP.GOOGLE.CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000/auth/google',
    grant_type: 'authorization_code',
  });

  const oauthData = res.data as T_oauthData;
  const IdTokenData = jwt.decode(oauthData.id_token) as T_IdTokenData;
  if (IdTokenData.email_verified === false) {
    throw resErr.auth.googleAuthError('Google Email not verified');
  }

  const userExist = await userDao.findOne({
    where: { email: IdTokenData.email, googleVerified: true, status: STATUS.ACTIVE },
    attributes: ['id'],
  });
  const refreshTokenPayload: { id?: number, jti: string, iat: Date, idp: IDP_TYPE, } = {
    idp: 'google',
    jti: 'jti',
    iat: new Date(),
  };

  if (userExist) {
    refreshTokenPayload.id = userExist.id;
  } else {
    const user = await userDao.create({
      email: IdTokenData.email,
      name: IdTokenData.email,
      googleVerified: true,
      refTokJti: [refreshTokenPayload],
    });
    refreshTokenPayload.id = user.id;
  }
  console.log(refreshTokenPayload);
  return {
    userId: 1,
    refreshToken: jwt.sign(
      refreshTokenPayload,
      AUTH.REFRESH_TOKEN_SECRET,
      { expiresIn: AUTH.REFRESH_TOKEN_EXPIRE },
    ),
  };
}
