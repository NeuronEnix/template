import path from 'path';
import express, { Request, Response } from 'express';
import CONFIG from '../common/config';
import router from '../router';

const app = express();
const allowedMethods = ['GET', 'POST'];

function getPath(url: string): string {
  const queryParamPos = url.indexOf('?');
  if (queryParamPos === -1) return url;
  return url.substring(0, queryParamPos);
}

app.use('/public', express.static(path.join(__dirname, '..', '/ui')));
app.use(express.json());
app.all('*', async (req: Request, res: Response) => {
  if (!allowedMethods.includes(req.method)) return res.sendStatus(404);

  const data = await router({
    path: getPath(req.url),
    method: req.method as 'GET' | 'POST',
    source: {
      ip: req.ip || '',
      agent: req.headers['user-agent'],
    },
    headers: { auth: req.headers.authorization },
    body: req.body as { key: '' },
    query: req.query as { key: '' },
  });

  return res.type('application/json').status(data.httpCode).send(data.body);
});

app.listen(CONFIG.SERVER.PORT, () => {
  console.log(`Express server listening on port ${CONFIG.SERVER.PORT}`);
});
