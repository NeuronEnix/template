const config = {
  server: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },
  db: {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    user: process.env.DB_USER ?? 'root',
    pass: process.env.DB_PASS ?? 'pass123',
    name: process.env.DB_NAME ?? 'template',
  },
};

export default config;
