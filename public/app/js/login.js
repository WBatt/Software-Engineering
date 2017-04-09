var app1 = angular.module('loginApp', []);
        app1.controller('loginController', ['$scope','$http', function($scope, $http) {
          $scope.data ={username:'', password:''};
          $scope.submit = function() {

              var config = {
             body : {
                 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
             }
         }
                $scope.data.username = $scope.loginCtrl.data.username;
                $scope.data.password = $scope.loginCtrl.data.pwd;
              
              $http.post('http://localhost:8080/api/login',$scope.data, config)
              .success(function(data, status, headers, config) {
                  console.log(data);
              })
              .error(function(data, status, headers, config) {
                  console.log(data);
              });
          };
}]);
