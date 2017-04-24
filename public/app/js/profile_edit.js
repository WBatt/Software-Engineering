var app2 = angular.module('editAccountApp', [])



		app2.controller('editAccountController', ['$scope','$http', function($scope, $http) {
			$scope.submit = function() {
				dataObj = {
						name : "pizzaaaa"

				};
				var config = {
      		body : {
        		'Content-Type': 'application/x-www-form-urlencoded;'
        	}
      	}

        console.log("123");
				$http.put('http://localhost:8080/api/users?username=mike', dataObj, config)
				.success(function(data, status, headers, config) {
          console.log("HELLOOOOOOOOO");
          console.log(data);
				})
				.error(function(data, status, headers, config) {
          console.log("failed");
					console.log(data);
				});
			};
		}]);
