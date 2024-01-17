import execute from './execute';
import { T_Request } from '../../../types';
import { T_OutData, validate } from './validate';

async function authorize(data: T_Request): Promise<T_Request> {
  return data;
}

export default async function main(req: T_Request): Promise<T_OutData> {
  return authorize(req).then(validate).then(execute);
}
