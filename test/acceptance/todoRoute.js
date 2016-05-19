'use strict';

const supertest = require('supertest');
const expect = require('chai').expect;

let app = require('../../app');
let db = require('../../config/db');

//  before each test, empty db, and insert test data

beforeEach(function(cb) {
  db.run('DELETE FROM todos', function(err) {
    if(err) return cb(err);
    db.run(`INSERT INTO todos (createdAt, dueDate, desc)
            VALUES (1463607825851, 1463607835851, "Write tests")`, cb);
  });
});

describe('/api/todos', () => {

  describe('GET /', () => {

    it('should respond with the array of todos', cb => {

      supertest(app)
        .get('/api/todos')
        .end((err, res) => {

          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0].desc).to.equal('Write tests');

          cb();
        });

    });
  });

  describe('POST /', () => {
    it('should create a new todo.', cb => {
      supertest(app)
        .post('/api/todos')
        .send({desc: 'Flip pancakes', dueDate: 1463607835000})
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(200);
          cb();
        });
    });

    it('should NOT create a new todo - Missing desc.', cb => {
      supertest(app)
        .post('/api/todos')
        .send({dueDate: 1463607835000})
        .end((err, res) => {
          expect(err).to.not.exist;
          expect(res.statusCode).to.equal(400);
          cb();
        });
    });

  });
});


