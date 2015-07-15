/**
 * Created by seal on 7/15/15.
 */

global.MONGO_URL = 'mongodb://127.0.0.1/online_test';
var request = require('supertest');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = MONGO_URL;
var app;

describe('POST /api/register', function() {

  before(function(done) {
    // 删除原来的数据库
    MongoClient.connect(url, function(err, db) {
      db.dropDatabase(function(err) {
        if (err) throw err;
        app = require('../app');
        done();
      });
    });
  });


  it('can register?', function(done) {
    request(app)
      .post('/api/register')
      .send({username: 'seal', password: '..xiao'})
      .expect({
        message: 'register success'
      })
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });

  it('can register repeat?', function(done) {
    request(app)
      .post('/api/register')
      .send({username: 'sealday', password: '..xiao'})
      .expect({
        message: 'register success'
      })
      .end(function(err, res) {
        if (err) return done(err);
        request(app)
          .post('/api/register')
          .send({username: 'sealday', password: '..xiao'})
          .expect(409)
          .expect({
            message: 'username has been taken'
          })
          .end(done);
      });
  });
});

