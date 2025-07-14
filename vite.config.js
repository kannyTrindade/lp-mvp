import { defineConfig, loadEnv } from 'vite';
import path from 'path';
import fs from 'fs';
import handlebars from 'vite-plugin-handlebars';

const partialsDir = path.resolve(__dirname, 'src/partials');

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isGitHubPages =
    mode === 'production' && env.VITE_DEPLOY_TARGET === 'gh-pages';

  return {
    base: isGitHubPages ? '/lp-mvp/' : '/',
    root: 'src',
    publicDir: path.resolve(__dirname, 'public'),
    build: {
      outDir: '../docs',
      emptyOutDir: true,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'src/index.html'),
          thankyou: path.resolve(__dirname, 'src/thankyou.html'),
        },
      },
    },
    css: {
      postcss: './postcss.config.cjs',
      preprocessorOptions: {
        scss: {
          silenceDeprecations: ['import'],
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        styles: path.resolve(__dirname, 'src/styles'),
      },
    },
    server: {
      open: true,
    },
    plugins: [
      handlebars({
        partialDirectory: partialsDir,
        partialExtension: '.html',
        context(pagePath) {
          const file = path.basename(pagePath, '.html');
          const dataPath = path.resolve(__dirname, `src/data/${file}.json`);
          if (fs.existsSync(dataPath)) {
            return JSON.parse(fs.readFileSync(dataPath));
          }
          return {};
        },
      }),
      {
        name: 'reload-on-partial-change',
        configureServer(server) {
          server.watcher.add(partialsDir);
          server.watcher.on('change', file => {
            if (file.startsWith(partialsDir)) {
              server.ws.send({
                type: 'full-reload',
                path: '/index.html',
              });
            }
          });
        },
      },
    ],
  };
});
