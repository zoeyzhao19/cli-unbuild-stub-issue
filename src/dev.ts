// import { createRequire } from 'node:module';
import fs from 'fs';
import path from 'path';
import { createServer } from 'vite';
import type { Plugin } from 'vite';

const htmlPath = path.resolve(process.cwd(), './index.html');

function pluginIndexHtml(): Plugin {
  return {
    name: 'index-html',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // custom handle request...
          let html = await fs.readFileSync(htmlPath, 'utf-8');
          html = await server.transformIndexHtml(
            req.url!,
            html,
            req.originalUrl
          );
          res.setHeader('Content-Type', 'text/html');
          res.end(html);
        });
      };
    },
  };
}

export async function createDevServer() {
  const serevr = await createServer({
    plugins: [pluginIndexHtml()],
  });
  await serevr.listen();
  serevr.printUrls();
}
