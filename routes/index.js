/**
 * Created by seal on 7/14/15.
 */
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = global.MONGO_URL;

// 初始化数据库
MongoClient.connect(url, function(err, db) {
  var users = db.collection('users');
  users.indexExists('username_1_token_1', function(err, result) {
    if (!result) {
      users.createIndex({username: 1, token: 1}, {unique: true}, function(err){
        if (err) throw err;
      });
    }
  });
});


// 登录
router.post('/login', function (req, res){

});

// 注册
router.post('/register', function (req, res, next) {
  MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    users.insertOne({
      username: req.body.username,
      password: req.body.password
    }, function(err) {
      if (err) {
        if (err.code == 11000) {
          res.status(409).json({
            message: 'username has been taken'
          });
        }
      } else {
        res.json({
          message: 'register success'
        });
      }
    });
  });
});

router.use(function(req, res, next) {

});

router.use(function(req, res, next) {
  if (req.headers['access-token']) {

  } else {

  }
  next();
});

router.get('/', function(req, res) {
  res.json(['hello']);
});

module.exports = router;
