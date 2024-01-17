/* eslint-disable no-unused-vars */
export type T_ModelCommonField = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  status: number;
};

export type T_FindQuery<T> = {
  select: Array<keyof T>;
  where: Partial<T>;
  limit?: number;
  skip?: number;
};

export const CommonSchema: Record<keyof T_ModelCommonField, object> = {
  id: { type: 'integer', minimum: 1, maximum: 4294967295 },
  createdAt: { type: 'string' },
  updatedAt: { type: 'string' },
  deletedAt: { type: 'string' },
  status: { type: 'integer', minimum: 1 },
};

export interface I_Dao<T> {
  createOne(data: Partial<T>): Promise<Partial<T>>;
  // createMany (data: Partial<T>[]): Promise<Partial<T>[]>;
  // findOne (query: T_FindQuery<T>): Promise<Partial<T>|undefined>;
  // findMany (query: T_FindQuery<T>): Promise<Partial<T>[]>;
  // /** @returns number of updates */
  // update (query: T_FindQuery<T>, update: Partial<T>): Promise<number>;
}
