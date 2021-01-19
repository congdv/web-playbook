const http = require('http');
const url = require('url');
const Request = require('./Request');

class HTTPServer {
  constructor(config){
    this._config = config;
    this._server = null;
  }

  start() {
    const requestHandler = this.requestHandler.bind(this);
    this._server = http.createServer(requestHandler).listen(3001);
  }

  requestHandler(httpRequest, response){
    const queryData = url.parse(httpRequest.url, true).query;
    console.log(queryData);
    const request = new Request(queryData, httpRequest, response);
    request.respond('Hello world',200);
  }

  async stop() {
    await this._server.close();
  }
}

module.exports = HTTPServer;