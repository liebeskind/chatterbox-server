/* Import node's http module: */
var http = require("http");
var HandleRequest = require('./request-handler');



var requestListener = function (request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  HandleRequest.handleRequest(request,response);
};

var port = process.env.PORT || 5000;
var server = http.createServer(requestListener);
console.log("Listening on port " + port);
server.listen(port);