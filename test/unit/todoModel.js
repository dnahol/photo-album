'use strict';

var expect = require('chai').expect;

var Todo = require('../../models/todo');
var db = require('../../config/db');

//  before each test, empty db, and insert test data

beforeEach(function(cb) {
  db.run('DELETE FROM todos', function(err) {
    if(err) return cb(err);
    db.run(`INSERT INTO todos (createdAt, dueDate, desc)
            VALUES (1463607825851, 1463607835851, "Write tests")`, cb);
  });
});

describe('Todo', function() {
  describe('.create()', function() {

    it('should create a new todo in the db.', function(cb) {
      var todoObj = {
        desc: 'Make toast',
        dueDate: new Date(2016, 5, 19)
      };

      Todo.create(todoObj, function(err, todo) {
        expect(err).to.not.exist;
        expect(todo).to.exist;
        expect(todo.desc).to.equal(todoObj.desc);
        cb();
      });
    });

    it('should NOT create a new todo - Missing field', function(cb) {
      var todoObj = {
        dueDate: new Date(2016, 5, 19)
      };

      Todo.create(todoObj, function(err, todo) {
        expect(err).to.exist;
        expect(todo).to.not.exist;
        cb();
      });
    });
  });

  describe('.get()', function() {
    it('should retrieve the todo from the db.', function(cb) {
      Todo.get(function(err, todos) {
        expect(err).to.not.exist;
        expect(todos).to.have.length(1);
        expect(todos[0].desc).to.equal('Write tests');
        cb();
      });
    });
  });
  
  // describe('.getOneById()', function() {

  // });

});




