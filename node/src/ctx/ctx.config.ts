import crypto from 'crypto';
import { config } from 'dotenv';
config();

const INSTANCE = {
  ID: crypto.randomBytes(5).toString('hex'),
  CREATED_AT: new Date(),
  SERVICE_NAME: "service-name",
  SEQ: 0,
  INFLIGHT: 0,
  LAST_HEARTBEAT: new Date(),
  PORT: parseInt(process.env.SERVER_PORT || '3000', 10)
}

const SECRET = {
  JWT: {
    ACCESS_TOKEN: 'access-token-secret',
    REFRESH_TOKEN: 'refresh-token-secret'
  }
}

const DB = {
  MONGO: {
    HOST: process.env.DB_MONGO_HOST ?? 'localhost',
    PORT: parseInt(process.env.DB_MONGO_PORT ?? '27017', 10),
    USER: process.env.DB_MONGO_USER ?? 'root',
    PASS: process.env.DB_MONGO_PASS ?? 'pass123',
    DATABASE: process.env.DB_MONGO_DATABASE ?? 'db_name',
  },
  POSTGRES: {
    HOST: process.env.DB_POSTGRES_HOST ?? '127.0.0.1',
    PORT: parseInt(process.env.DB_POSTGRES_PORT ?? '5432', 10),
    USER: process.env.DB_POSTGRES_USER ?? 'root',
    PASS: process.env.DB_POSTGRES_PASS ?? 'pass123',
    DATABASE: process.env.DB_POSTGRES_DATABASE ?? 'db_name',
  },
}

const AWS = {
  REGION: process.env.AWS_REGION ?? 'ap-south-1',
}

const SERVICE = {
  GOOGLE: {
    URL: ""
  }
}

export const CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'local',
  INSTANCE,
  SECRET,
  DB,
  AWS,
  SERVICE,
};
