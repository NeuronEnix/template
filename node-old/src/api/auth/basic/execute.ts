import { hash as hashPass } from 'bcrypt';

import userDao from '../../../db/user';
import { AUTH } from '../../../common/const';
import { resErr, ResponseError } from '../../../common/error';
import { T_InData, T_OutData } from './validate';
import getNewRefreshToken from '../../../lib/user';

export default async function execute(data: T_InData): Promise<T_OutData> {
  if (data.isNewUser) {
    const hashedPass = await hashPass(data.pass, AUTH.BCRYPT_SALT_ROUNDS);
    try {
      await userDao.create({
        email: data.email,
        pass: hashedPass,
        name: 'name',
        refTok: [],
      });
    } catch (e) {
      if (e instanceof Error) {
        if (e.name === 'SequelizeUniqueConstraintError') throw resErr.auth.userAlreadyExist();
      }
      throw resErr.gen.unknown();
    }
  }
  try {
    const userToken = await getNewRefreshToken('basic', data.email, data.pass);
    return {
      userId: userToken.userId,
      refreshToken: userToken.refreshToken,
    };
  } catch (e) {
    if (e instanceof ResponseError) {
      e.code = 'USER_NOT_FOUND';
      throw resErr.auth.invalidCredential();
    }
    throw resErr.gen.unknown();
  }
}
