import Dao from '../dao';
import { T_UserModel } from './types';

const tableName = 'user';

class UserDao extends Dao<T_UserModel> {
  constructor(tableName: string) {
    super(tableName);
  }
}

export default new UserDao(tableName);
