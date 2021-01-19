const HTTPServer = require('./webserver/HTTPServer');

const httpServer = new HTTPServer({});

httpServer.start();
console.log('The server is running');