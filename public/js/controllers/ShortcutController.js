angular.module('sj').controller('shortcutController', ['$scope', '$http', '$timeout',
    function ShortcutController($scope, $http, $timeout) {

        $http.get('/api/shortcuts').success(function(data, status, headers, config) {
            $scope.foundShortcuts = data.shortcuts;
        })

        $scope.newShortcut = {
            application: '',
            operatingSystem: '',
            keyset: '',
            description: ''
        };

        $scope.delete = function(shortcut) {
            $http({
                method: 'DELETE',
                url: '/api/shortcuts',
                params: {
                    'id': shortcut._id
                }
            }).success(function(data) {
                var index = $scope.foundShortcuts.indexOf(shortcut);
                if (index > -1) {
                    $scope.foundShortcuts.splice(index, 1);
                }
            })
        }

        $scope.setShortcuts = function(shortcuts) {
            $scope.foundShortcuts = shortcuts;
        };

        $scope.addNewShortcut = function() {
            $http.post('/api/shortcuts', $scope.newShortcut).success(function(data) {
                if (data) {
                    $scope.foundShortcuts.push(data);
                } else {
                    alert(JSON.stringify(data));
                }
            });
        };
    }
]);

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