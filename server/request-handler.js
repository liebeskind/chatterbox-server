var url = require('url');
var fs = require('fs');
var messages = [];
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept, X-Requested-With",
  "access-control-max-age": 10 // Seconds.
};
var headers = defaultCorsHeaders;
headers['Content-Type'] = "application/json";


var handleRequest = function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var postData = '';

  if(request.method === 'OPTIONS'){
    response.writeHead(200,headers);
    response.end();
  }

  if(request.method === 'GET' && pathname === '/chat'){
    response.writeHead(200,headers);
    response.end(JSON.stringify(messages));
  } else{
    console.log(__dirname);
    fs.readFile('/app/server/index.html', function(err, data) {
      if (err) throw err;
      headers['Content-Type'] = "html";
      response.writeHead(200,headers);
      response.end(data);
    });
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
    console.log(request);
    data = JSON.parse(request);
    console.log('LOADING MESSAGE   ', data.message);
    messages.push({
      createdAt: new Date(),
      roomname: data.roomname,
      username: data.username,
      message: data.message
    });
    response.writeHead(201,headers);
    response.end();
  };


};

setInterval(function(){
  messages = [];
},500000);


module.exports.handleRequest = handleRequest;
