const choo = require('choo');
const html = require('choo/html');

function mainView () {
  return html`
    <body>
      Hello World from choo
    </body>
  `
}
module.exports = function() {
  const app = choo();
  app.route('/', mainView);
  return app;
}