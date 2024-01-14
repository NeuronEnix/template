import { I_Dao, T_FindQuery, T_ModelCommonField } from './types';
import { dbCon } from './dbConnection';

function convertToSqlCompatible(data: Array<unknown>): Array<unknown> {
  return data.map((e) => {
    if (e instanceof Date) return e.toISOString().replace('T', ' ').replace('Z', '');
    return e;
  });
}

type T_InsertQuery = { fieldCount: number, affectedRows: number, insertId: number, info: string, serverStatus: number, warningStatus: number };

class Dao<T extends T_ModelCommonField> implements I_Dao<T> {
  protected readonly tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async createOne(data: Partial<T>): Promise<Partial<T>> {
    if (!data.createdAt) data.createdAt = new Date();
    const cols = Object.keys(data);
    const values = Object.values(data);
    const sql = `
    INSERT INTO ${this.tableName}(${cols.join(',')})
    VALUES (${Object.values(data).map(() => '?').join(',')})
    `;
    const createdData = await dbCon.query(sql, convertToSqlCompatible(values));
    const resultSetHeader = { ...createdData[0] } as T_InsertQuery;
    data.id = resultSetHeader.insertId as number;
    return data;
  }

  async createMany(data: Partial<T>[]): Promise<Partial<T>[]> {
    const valuesToBeInserted: Array<unknown> = [];
    data.forEach((e) => {
      if (!e.createdAt) e.createdAt = new Date();
      valuesToBeInserted.push(...Object.values(e));
    });
    const cols = Object.keys(data[0]);
    const sql = `
    INSERT INTO ${this.tableName}(${cols.join(',')})
    VALUES ${data.map(() => `(${cols.map(() => '?').join(',')})`).join(',')}
    `;
    const createdData = await dbCon.query(sql, valuesToBeInserted) as unknown;
    return createdData as Promise<Partial<T>[]>;
  }

  async findOne(query: T_FindQuery<T>): Promise<Partial<T> | undefined> {
    const {
      where, select, limit, skip,
    } = query;
    const cols = select.join(',');
    const whereClause = Object.entries(where).map(([k]) => `${k} = ?`).join(' AND ');
    const sql = `
      SELECT ${cols}
      FROM ${this.tableName}
      WHERE ${whereClause}
      LIMIT ${limit ?? 1}
      OFFSET ${skip ?? 0}
    `;
    const rows = (await dbCon.query(sql, Object.values(where)))[0] as Partial<T>[];
    return rows[0];
  }

  // async findMany (query: T_FindQuery<T>): Promise<Partial<T>[]> {
  //   const sql = `
  //   `;
  //   const rows = await dbCon.query(sql) as unknown;
  //   return rows as Promise<Partial<T>[]>;
  // }
  // async update (query: T_FindQuery<T>, update: Partial<T>): Promise<number> {
  //   // return this.model.update({}, {where: {}})[0] as number;
  //   return 1;
  // }
}

export default Dao;
