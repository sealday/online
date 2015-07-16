/**
 * Created by seal on 7/14/15.
 */
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var crypto = require('crypto');
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
  MongoClient.connect(url, function(err, db) {
    var users = db.collection('users');
    var sha1sum = crypto.createHash('sha1');
    sha1sum.update(req.body.username + req.body.password + new Date().getTime());
    var accessToken = sha1sum.digest('hex');
    users.updateOne({
      username: req.body.username,
      password: req.body.password
    }, {
      $set: {
        access_token: accessToken
      }
    }, function (err, result) {
      if (err) {
        next(err);
      } else {
        if (result.result.nModified == 0) {
          res.status(401).json({
            message: "either username or password is wrong"
          });
        } else {
          res.status(200).json({
            message: "login success",
            access_token: accessToken
          });
        }
      }
    });
  });
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
        res.status(201).json({
          message: 'register success'
        });
      }
    });
  });
});

// 认证中间件
router.use(function(req, res, next) {
  var accessToken = '';
  if (accessToken = req.headers['access-token']) {
    MongoClient.connect(url, function(err, db) {
      var users = db.collection('users');
      users.findOne({access_token: accessToken}, function(err, user) {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(403).end();
        }
      });
    });
  } else {
    res.status(403).end();
  }
});

router.get('/items', function(req, res) {
  console.log(req.user);
  res.json(['hello']);
});

module.exports = router;
