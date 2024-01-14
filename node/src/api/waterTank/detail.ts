import { T_Request } from '../../types.js';

type T_InData = {
  waterTankId: number
};

type T_OutData = {
  waterTankId: number
};

async function validate(req: T_Request): Promise<T_InData> {
  return req.query as T_InData;
}

async function authorize(data: T_InData): Promise<T_InData> {
  return data;
}

async function logic(data: T_InData): Promise<T_OutData> {
  return { waterTankId: data.waterTankId };
}

export default async function getWaterTankList(req: T_Request): Promise<T_OutData> {
  return validate(req)
    .then(authorize)
    .then(logic);
}
