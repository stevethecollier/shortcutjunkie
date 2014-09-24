angular.module('sj').controller('shortcutController', ['$scope', '$http', '$timeout',
	function ShortcutController($scope, $http, $timeout) {
		var shortcuts = [
			{
				application : 'OS X',
				operatingSystem : 'OS X',
				keyset : 'ctrl + c',
				description : 'copy text'
			}];
		$scope.message = 'Hello world! from angular';
		$scope.shortcuts = shortcuts;
		$scope.newShortcut = {
			application : '',
			operatingSystem : '',
			keyset : '',
			description : ''
		}; 

		$scope.setShortcuts = function(shortcuts) {
			$scope.shortcuts = shortcuts;
		};

		$scope.addNewShortcut = function() {
			$http.post('/shortcut.json', $scope.newShortcut).success(function(data) {
				if (data.shortcut) {
					$scope.shortcuts.push(data.shortcut);
					//$scope.newTodo.description = '';
				} else {
					alert(JSON.stringify(data));
				}
			});
		};
}]);

	// $scope.update = function(todo) {
	// 	$http.put('/todo/' + todo._id + '.json', todo).success(function(data) {
	// 		if (!data.todo) {
	// 			alert(JSON.stringify(data));
	// 		}
	// 	});
	// };
	//
	// $scope.updateList = function() {
	// 	$http.get('/todos.json').success(function(data) {
	// 		$scope.todos = data.todos;
	// 	});
	//
	// 	$timeout(function() {
	// 		$scope.updateList();
	// 	}, 30 * 60 * 1000); // update every 30 minutes;
	// };
	//
	// $timeout(function() {
	// 	$scope.updateList();
	// }, 30 * 60 * 1000); // update every 30 minutes;
	//
	// $scope.updateList();
