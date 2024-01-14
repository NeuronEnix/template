import { hash as hashPass } from 'bcrypt';

import { T_InData, T_OutData } from './index';
import userDao from '../../../db/user/dao';

export default async function execute(data: T_InData): Promise<T_OutData> {
  data.password = await hashPass(data.password, 8);
  const user = await userDao.createOne({
    email: data.email,
    password: data.password,
    name: 'User',
    createdAt: new Date(),
    status: 1,
  });
  console.log(user);

  return { userId: user.id ?? 0 };
}
