app.factory('httpFactory', ['$http', function($http){

  var obj = {};

  //get request
  obj.get = function(url){
    return $http.get(url);
  };

  obj.post = function(url, payload){
    return $http.post(url, payload);
  };

  obj.put = function(url, id, payload){
    return $http.put(url, id, payload);
  };

  obj.delete = function(url, id, payload){
    return $http.delete(url, id, payload);
  };

  return obj;

}]);
