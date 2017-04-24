var app = angular.module('mainApp', ['ngRoute']);

  app.config(function($routeProvider) {
  $routeProvider

  .when('/', {
    templateUrl : 'views/main.html',
    controller  : 'mainController'
  })

  .when('/login', {
    templateUrl : 'views/login.html',
    controller  : 'loginController'
  })

  .when('/createAccount', {
    templateUrl : 'views/createAccount.html'
  })

  .otherwise({redirectTo: '/'});
});

app.directive('navigationBar',function(){
        return {
                  restrict: 'E',
                  templateUrl: '/views/navBar.html'
               };
});
        app.controller('loginController', ['$scope','$http', function($scope, $http) {
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

app.controller('searchController', ['$scope','$http', function($scope, $http) {
    $scope.searchresults;
  $scope.search = function() {




      $http.get('http://localhost:8080/api/items')
      .success(function(data, status, headers, config) {
          $scope.searchresults = data;
          console.log(data);
      })
      .error(function(data, status, headers, config) {

      });
  };
}]);


app.controller('cAccountController', ['$scope','$http', function($scope, $http) {
  $scope.submit = function() {
    dataObj = {
        name : "",
        username : $scope.username,
        password : $scope.password
    };
    var config = {
      body : {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
    }
    console.log(dataObj);
    $http.post('http://localhost:8080/api/users', dataObj, config)
    .success(function(data, status, headers, config) {
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });
  };
}]);

app.controller('mainController', ['$scope','$http', function($scope, $http) {

}]);
