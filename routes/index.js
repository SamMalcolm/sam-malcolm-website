var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/* GET home page. */
router.get([
  '/',
  '/snooker',
  '/tutorials',
  '/blog',
  '/film',
  '/contact',
  '/about',
  '/work',
  '/music'
], function (req, res, next) {
  let path;
  console.log(req);
  console.log(req.originalUrl);
  if (typeof req.originalUrl.length != 'undefined' && req.originalUrl.length > 1) {
    path = req.originalUrl.slice(1, req.originalUrl.length);
    path = path.split("");
    path[0] = path[0].toUpperCase();
    path = path.join("");
    path = "Sam Malcolm Media | " + path;
  } else {
    path = "Sam Malcolm Media";
  }



  console.log("connecting to DB");
  mongoose.connect('mongodb://localhost:27017/smm_db');

  res.render('index', { title: path });
});

module.exports = router;
