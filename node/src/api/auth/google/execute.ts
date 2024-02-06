import axios, { AxiosError } from 'axios';
import jwt from 'jsonwebtoken';

import User from '../../../db/user';
import CONFIG from '../../../common/config';
import { T_InData, T_OutData } from './validate';
import getNewRefreshToken from '../../../lib/user';
import { ResponseError, resErr } from '../../../common/error';

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
  try {
    const res = await axios.post('https://accounts.google.com/o/oauth2/token', {
      code: data.code,
      client_id: CONFIG.IDP.GOOGLE.CLIENT_ID,
      client_secret: CONFIG.IDP.GOOGLE.CLIENT_SECRET,
      redirect_uri: CONFIG.IDP.GOOGLE.REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const oauthData = res.data as T_oauthData;
    const IdTokenData = jwt.decode(oauthData.id_token) as T_IdTokenData;
    if (IdTokenData.email_verified === false) {
      throw resErr.auth.googleAuthError('Google Email not verified');
    }
    const resData = {
      userId: 0,
      refreshToken: '',
    };
    try {
      const userToken = await getNewRefreshToken('google', IdTokenData.email);
      resData.userId = userToken.userId;
      resData.refreshToken = userToken.refreshToken;
    } catch (e) {
      if (e instanceof ResponseError && e.code === 'USER_NOT_FOUND') {
        await User.create({
          email: IdTokenData.email,
          name: IdTokenData.email,
          googleVerified: true,
          refTok: [],
        });
        const userToken = await getNewRefreshToken('google', IdTokenData.email);
        resData.userId = userToken.userId;
        resData.refreshToken = userToken.refreshToken;
      }
    }
    if (resData.refreshToken === '' || resData.userId === 0) throw resErr.gen.unknown();

    return resData;
  } catch (e) {
    if (e instanceof AxiosError && e?.response?.data?.error === 'invalid_grant') throw resErr.auth.googleAuthError('Google auth code is invalid');

    throw resErr.gen.unknown();
  }
}
