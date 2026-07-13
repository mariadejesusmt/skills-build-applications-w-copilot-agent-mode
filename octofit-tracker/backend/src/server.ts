import express from 'express';
import path from 'path';
import { pathToFileURL } from 'url';
import './config/database.js';
import { getApiBaseUrl } from './config/api.js';
import routes from './routes.js';

export const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());
app.use(routes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

export function startServer() {
  return app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
  });
}

const isDirectRun = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
  : false;

if (isDirectRun) {
  startServer();
}
