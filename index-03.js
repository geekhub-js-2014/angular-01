angular.module('todoApp', [])
    .controller('TodoController', function($scope, $http) {
        $scope.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}
        ];

        function myHttpGet(url) {
            return $http.get(url).then(function(result) {
                if (result.data) {
                    return result.data;
                }
                throw 'data missing';
            });
        }

        myHttpGet('http://localhost:1337/todos').then(function(data) {
            $scope.todos = result.data;
        }, function(err) {
            alert('sometihng happend...');
        });

        $scope.addTodo = function() {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
            $http.post('http://localhost:1337/todos', $scope.todos);
        };

        $scope.remaining = function() {
            var count = 0;
            angular.forEach($scope.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        $scope.archive = function() {
            var oldTodos = $scope.todos;
            $scope.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) $scope.todos.push(todo);
            });
        };
    });
