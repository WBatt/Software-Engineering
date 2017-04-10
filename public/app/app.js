var app = angular.module('submitExample', [])
		app.controller('ExampleController', ['$scope','$http', function($scope, $http) {
			$scope.submit = function() {
				dataObj = {
						name : $scope.name,
						username : $scope.username,
						password : $scope.password1
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


//below is the html example that that references this function

// <form ng-controller="ExampleController" ng-submit="submit()">
// 	<div class="form-group row">
// 		<div class="col-10">
// 			<input type="text" class="form-control" ng-model="name" placeholder="Name">
// 		</div>
// 		<p></p>
// 		<div class="col-10">
// 			<input type="text" class="form-control" ng-model="username" placeholder="User Name">
// 		</div>
// 	</div>
// 	<div class="form-group row">
// 		<div class="col-10">
// 			<input type="password" class="form-control" ng-model="password1"placeholder="Create Password">
// 		</div>
// 	</div>
// 	<div class="form-group">
// 		<div class="col-sm-offset-2 col-sm-10">
// 			<button type="submit" id="submit" class="btn btn-default">Submit</button>
// 		</div>
// 	</div>
// </form>
