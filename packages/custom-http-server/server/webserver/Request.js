class Request {
  constructor(queryData, request, response) {
    this._queryData = queryData;
    this._request = request;
    this._response = response;
  }

  error(error) {
    const data = JSON.stringify({
      error: 'server error',
    })
    this.respond(data, 500);
  }

  fail(message) {
    const data = JSON.stringify({
      error: message
    })
    this.respond(data, 400);
  }

  respond(text, status) {
    status = status || 200;
    this._respond(text, status, {'Content-Type': 'text/plain'})
  }

  _respond(data, status, additionalHeaders) {
    var headers = Object.assign({
      'Access-Control-Allow-Origin': '*',
      'Content-Length': Buffer.byteLength(data, 'utf-8'),
      'Content-Type':'text/plain',
    }, additionalHeaders)

    this._response.writeHead(status, headers);
    this._response.end(data, 'utf-8');
  }
}

module.exports = Request;