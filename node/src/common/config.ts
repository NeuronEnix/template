const CONFIG = {
  SERVER: {
    PORT: parseInt(process.env.PORT ?? '3000', 10),
  },
  DB: {
    HOST: process.env.DB_HOST ?? 'localhost',
    PORT: parseInt(process.env.DB_PORT ?? '3306', 10),
    USER: process.env.DB_USER ?? 'root',
    PASS: process.env.DB_PASS ?? 'pass123',
    NAME: process.env.DB_NAME ?? 'template',
  },
  IDP: {
    GOOGLE: {
      CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID || '',
      CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET || '',
      CALLBACK_URL: process.env.GOOGLE_OAUTH_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    },
  },
};

export default CONFIG;
