import { compare as comparePass } from 'bcrypt';

import { T_InData, T_OutData } from './index';
import userDao from '../../../db/user/dao';

export default async function execute(data: T_InData): Promise<T_OutData> {
  const user = await userDao.findOne({
    select: ['id', 'password'],
    where: { email: data.email, status: 1 },
  });
  const isPassOk = await comparePass(data.password, user?.password ?? '');
  if (!isPassOk) throw 'not ok';
  return { userId: user?.id ?? 0, accessToken: 'acc', refreshToken: 'ref' };
}
