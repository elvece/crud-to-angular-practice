app.controller('beerController', function($scope, httpFactory, $timeout){

  $scope.success = false;
  $scope.message = "";
  $scope.edit = false;
  $scope.findBeer = "";

  //sometimes need to clear form?
  // $scope.beer = {};

  //original http get before adding factory
  // $http.get('/api/v1/beers')
  // .then(function(response){
  //   $scope.beers = response.data;
  // });

  getBeers = function(url){
    httpFactory.get(url)
    .then(function(response){
      $scope.beers = response.data;
    });
  };

  getBeers('/api/v1/beers');

  function messageTimeout(){
    $scope.success = false;
  }

  $scope.postBeer = function(){

    var payload = $scope.beer;

    httpFactory.post('/api/v1/beers', payload)
    .then(function(response){
      $scope.beers.push(response.data);
      $scope.beer = {};
      $scope.success = true;
      $scope.message = "Added a new beer. Thanks!";
      $timeout(messageTimeout, 5000);
    });
  };

  $scope.editBeer = function(id){
    $scope.findBeer = "/api/v1/beer/" + id;
    httpFactory.get($scope.findBeer)
    .then(function(response){
      $scope.beer = response.data;
    });
    $scope.edit = true;
  };

  $scope.updateBeer = function(){
    var update = $scope.beer;
    httpFactory.put($scope.findBeer, update);
    getBeers('/api/v1/beers');
    $scope.beer = {};
    $scope.success = true;
    $scope.message = "Updated beer!";
    $timeout(messageTimeout, 5000);
    $scope.edit = false;
  };

  $scope.deleteBeer = function(id){
    $scope.findBeer = "/api/v1/beer/" + id;
    httpFactory.delete($scope.findBeer)
    .then(function(response){
      getBeers('/api/v1/beers');
    });
    $scope.success = true;
    $scope.message = "Deleted that beer!";
    $timeout(messageTimeout, 5000);
  };

});
