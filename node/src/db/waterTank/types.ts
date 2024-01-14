import { T_ModelCommonField, CommonSchema } from '../types';

export type T_WaterTankModel = T_ModelCommonField & {
  name: string;
  volumeLtr: string;
};
export const WaterTankSchema: Record<keyof T_WaterTankModel, object> = {
  ...CommonSchema,
  name: { type: 'string', minLength: 5, maxLength: 50 },
  volumeLtr: { type: 'integer', minimum: 1, maximum: 4294967295 },
};
