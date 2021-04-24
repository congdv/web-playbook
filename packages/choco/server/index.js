const express = require('express');
const pages = require('./pages');

module.exports = function(app, server) {
  // const wsapp = express();
  // const port = 3001;
  // wsapp.listen(port, () => {
  //   console.log(`Example app listening at http://localhost:${port}`)
  // }),

  console.log("Start server");
  app.get('/', pages.index);
}