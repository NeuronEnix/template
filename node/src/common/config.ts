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
};

export default CONFIG;
