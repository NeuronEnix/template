import { hash as hashPass } from 'bcrypt';

import { T_InData, T_OutData } from './validate';
import userDao from '../../../db/user';

export default async function execute(data: T_InData): Promise<T_OutData> {
  data.pass = await hashPass(data.pass, 8);
  const user = await userDao.create({
    email: data.email,
    pass: data.pass,
    name: "name",
  })
  return { userId: user.id ?? 0 };
}
