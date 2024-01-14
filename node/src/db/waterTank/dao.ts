import Dao from '../dao';
import { T_WaterTankModel } from './types';

const tableName = 'waterTank';

class WaterTankDao extends Dao<T_WaterTankModel> {
  constructor(tableName: string) {
    super(tableName);
  }
}

export default new WaterTankDao(tableName);
