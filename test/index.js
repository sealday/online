/**
 * Created by seal on 7/15/15.
 */

global.MONGO_URL = 'mongodb://127.0.0.1/online_test';
var request = require('supertest');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = MONGO_URL;
var app;

describe('user api test', function() {

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


  describe('POST /api/register', function() {

    it('can register?', function(done) {
      request(app)
        .post('/api/register')
        .send({username: 'seal', password: '..xiao'})
        .expect(201)
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


  describe('POSt /api/login', function() {

    before(function(done) {
      request(app)
        .post('/api/register')
        .send({username: 'linda', password: '..xiao'})
        .expect(201)
        .end(done);
    });

    it('login with wrong password', function(done) {
      request(app)
        .post('/api/login')
        .send({username: 'linda', password: '..xiao1'})
        .expect(401)
        .end(done);
    });

    it('login with right password', function(done) {
      request(app)
        .post('/api/login')
        .send({username: 'linda', password: '..xiao'})
        .expect(200)
        .end(function(err, res) {
          if (err) done(err);
          if (res.body.access_token !== undefined) {
            done();
          } else {
            done('access_token undefined');
          }
        });
    });
  });

  describe('test auth', function() {

    var accessToken = '';

    before(function(done) {
      request(app)
        .post('/api/register')
        .send({username: 'lin', password: '..xiao'})
        .expect(201)
        .end(function() {
          request(app)
            .post('/api/login')
            .send({username: 'lin', password: '..xiao'})
            .expect(200)
            .end(function(err, res) {
              accessToken = res.body.access_token;
              done();
            });
        });
    });

    it('get items with right token', function(done) {
      request(app)
        .get('/api/items')
        .set('access-token', accessToken)
        .expect(200)
        .end(done);
    });

    it('get items with wrong token', function(done) {
      request(app)
        .get('/api/items')
        .set('access-token', 'wrong token')
        .expect(403)
        .end(done);
    });

    it('get items without token', function(done) {
      request(app)
        .get('/api/items')
        .expect(403)
        .end(done);
    });

  });

});
