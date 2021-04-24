const routes = require('../app/routes');

module.exports = {
  index: async function(req, res) {
    res.send(routes().toString('/'));
  }
}