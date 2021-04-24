import routes from './routes';
import choo from 'choo';

(async function start() {
  const app = routes(choo({ hash: true }));
  window.app = app;
  app.mount('body');
})();