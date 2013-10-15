
var render = function(request, response, messages){

  var body = '<html ng-app>'+
            '<head>'+
              '<title>Your Shopping Cart</title>'+
            '</head>'+
            '<body >'+
              '<h1>Chatterbox</h1>'+
              '<form ng-controller="ChatFormController">'+
                'Message: <input ng-model="msg">'+
                '<button ng-click="POSTmessage()">Submit Message</button>'+

              '</form>'+
              '<div ng-controller="CartController">'+
                '<div ng-repeat="item in items">'+
                  '<span>{{item.username + ": "}}</span>'+
                  '<span>{{item.message}} </span>'+
                  //'<button ng-click="remove($index)">Remove message</button>'+
                '</div>'+
              '</div>'+
              '<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.0.8/angular.min.js"></script>'+
              '<script>'+
              'function ChatFormController($scope,$http){'+
                '$scope.POSTmessage = function(){'+
                  'var msg = {text: $scope.msg};'+
                  'msg = JSON.stringify(msg);'+
                  '$http.post("http://localhost:8080",msg);'+
                '}'+
              '}'+
              'function CartController($scope, $http) {'+
                'console.log($http.get("http://localhost:8080/"));'+
                '$scope.items = JSON.stringify($http.get("http://localhost:8080/"));'+ //JSON.stringify(messages)
                '$scope.remove = function(index) {'+
                  '$scope.items.splice(index, 1);'+
                '}'+
              '}'+
              '</script>'+
            '</body>'+
            '</html>'+

  response.writeHead(200,  {"Content-Type": "text/html"});
  response.write(body);
  response.end();
};

module.exports.render = render;