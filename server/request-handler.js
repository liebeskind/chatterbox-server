var url = require('url');
var messages = [];
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;
headers['Content-Type'] = "text/plain";


var handleRequest = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var postData = '';

  if(request.method === 'OPTIONS'){
    response.writeHead(200,headers);
    response.end();
  }

  if(request.method === 'GET' && pathname === '/1/classes/chatterbox'){
    response.writeHead(200,headers);
    response.end(JSON.stringify({results:messages}));
  } else if(request.method === 'GET'){
    response.writeHead(404,headers);
    response.end();
  }

  if(request.method === 'POST'){
    request.addListener('data',function(postDataChunk){
      postData +=postDataChunk;
      console.log('******Recieved POST data chunk "'+postDataChunk+ '".');
    });
    request.addListener('end',function(){
      addMessage(postData);
    });
  }

  var addMessage = function(request){
    // console.log(request);
    data = JSON.parse(request);
    messages.push({
      createdAt: new Date(),
      roomname: data.roomname,
      username: data.username,
      text: data.text
    });
    response.writeHead(201,headers);
    response.end();
  };


};



module.exports.handleRequest = handleRequest;
