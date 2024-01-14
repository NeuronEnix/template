import { T_InData, T_OutData } from './index';
import userDao from '../../../db/user/dao';

export default async function execute(data: T_InData): Promise<T_OutData> {
  const user = await userDao.findOne({
    select: ['id', 'name'],
    where: { id: data.userId },
  });
  return { userId: user?.id ?? 0, name: user?.name ?? '' };
}
