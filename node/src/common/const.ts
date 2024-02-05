export const STATUS = {
  ACTIVE: 1,
  DELETED: 2,
};

export const AUTH = {
  MAX_SESSION: 5,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret-1',
  ACCESS_TOKEN_EXPIRE: '1h',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'secret-2',
  REFRESH_TOKEN_EXPIRE: '30d',
};

export type IDP_TYPE = 'basic' | 'google';
