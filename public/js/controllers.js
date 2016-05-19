'use strict';

var app = angular.module('todoApp');

// controllers.js
// all controllers

app.controller('mainCtrl', function($scope, Todo) {
  console.log('mainCtrl!');


  Todo.getAll()
  .then(res => {
    $scope.todos = res.data;
    console.log($scope.todos)
  })
  .catch(err => {
    console.log('err:', err);
  });

  $scope.createTodo = () => {
    Todo.create($scope.newTodo)
    .then(res => {
      var todo = res.data;
      $scope.todos.push(todo);
      $scope.newTodo = null;
    })
    .catch(err => {
      console.error(err);
    });
  };

  $scope.removeTodo = todo => {
    Todo.remove(todo)
    .then(() => {
      var index = $scope.todos.indexOf(todo);
      $scope.todos.splice(index, 1);
    })
    .catch(err => {
      console.error(err);
    });
  };

  $scope.toggleComplete = todo => {
    console.log('toggleComplete todo:', todo);
    Todo.toggle(todo)
    .then(() => {

    })
    .catch(err => {
      console.error(err);
    });
  };


});
