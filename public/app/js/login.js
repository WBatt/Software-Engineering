var app1 = angular.module('loginApp', []);
        app1.controller('loginController', ['$scope','$http', function($scope, $http) {
          $scope.submit = function() {

              var config = {
             body : {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
             }
         }
         dataObj = {
                 username : $scope.email,
                 password : $scope.pwd
             };
              $http.post('http://localhost:8080/api/login',dataObj, config)
              .success(function(data, status, headers, config) {
                  console.log(data);
              })
              .error(function(data, status, headers, config) {
                  console.log(data);
              });
          };
}]);
