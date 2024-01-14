import { createPool } from 'mysql2/promise';

export const dbCon = createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'db',
  password: 'password',
  database: 'homewatch',
});
