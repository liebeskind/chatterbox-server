
var render = function(request, response, messages,headers){
  response.writeHead(200, headers);
  // response.write(body);
  response.end();
};

module.exports.render = render;