/* Import node's http module: */
var http = require("http");
var HandleRequest = require('./request-handler')


var requestListener = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  HandleRequest.handleRequest(request,response);
};

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(requestListener);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);