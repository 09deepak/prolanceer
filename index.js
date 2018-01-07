var app = angular.module('app',['chart.js']);


app.factory('cryptoFactory',['$http','$interval',function($http,$interval){
    var factory = {};
    var urlBase = 'https://api.coinmarketcap.com/v1/ticker/?limit=10';
        
        factory.getCryptoData = function() {
            return $http.get(urlBase);
        }
        return factory;
}]);

app.controller("cryptocurrencyCtrl", ['$scope','$http','$interval','cryptoFactory',function($scope,$http,$interval,cryptoFactory){
    init();
    $interval(init,500000);
    function init(){
        $scope.labels = [];
        $scope.exchangeRate = [];
        $scope.data = [];
        cryptoFactory.getCryptoData().then(function(response){
              var data =   response.data;
              console.log("this is firrst")
              for(var i=0; i<data.length; i++){
                $scope.labels.push(data[i].name);
                $scope.exchangeRate.push(data[i].price_usd);
                $scope.series = ['Percent'];
                
                $scope.data.push(data[i].percent_change_24h);

              }
            },function(error){
                console.log("error",error.statusText)
            });
    };
    
  }]);