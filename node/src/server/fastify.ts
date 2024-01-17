import Fastify from 'fastify';
import { router } from '../router';

function getPath(url: string): string {
  const queryParamPos = url.indexOf('?');
  if (queryParamPos === -1) return url;
  return url.substring(0, queryParamPos);
}

const fastify = Fastify();
const allowedMethod = ['GET', 'POST'];

fastify.all('*', async (req, res) => {
  if (!allowedMethod.includes(req.method)) return res.send(404);
  const data = await router({
    path: getPath(req.url),
    method: req.method as 'GET' | 'POST',
    source: {
      ip: req.ip,
      agent: req.headers['user-agent'],
    },
    headers: { auth: req.headers.authorization },
    body: req.body as { key: '' },
    query: req.query as { key: '' },
  });

  req.headers.cookie;
  res.type('application/json').code(data.httpCode);
  return data.body;
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Fastify server: ${address}`);
});
