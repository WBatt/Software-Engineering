var app = angular.module('cAccountApp', [])
		app.directive('navigationBar',function(){
					return {
									restrict: 'E',
									templateUrl: '/views/navBar.html'
					 			  };
	 });


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
