import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Plugin para permitir testar a API de correção localmente com "npm run dev"
function apiDevPlugin() {
  return {
    name: 'api-corrigir-dev',
    configureServer(server) {
      server.middlewares.use('/api/corrigir', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Método não permitido' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsedBody = body ? JSON.parse(body) : {};
            req.body = parsedBody;

            const mockedRes = {
              status(code) {
                res.statusCode = code;
                return this;
              },
              json(data) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              }
            };

            const { default: handler } = await import('./api/corrigir.js');
            await handler(req, mockedRes);
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Erro interno no processamento dev' }));
          }
        });
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }

  return {
    plugins: [react(), apiDevPlugin()]
  };
});
