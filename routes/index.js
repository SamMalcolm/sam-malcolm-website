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
  '/music',
  '/appearances',
  '/work/:work_id'
], function (req, res, next) {
  let path;
  if (typeof req.originalUrl.length != 'undefined' && req.originalUrl.length > 1) {
    path = req.originalUrl.slice(1, req.originalUrl.length);
    path = path.split("");
    path[0] = path[0].toUpperCase();
    path = path.join("");
    path = "Sam Malcolm Media | " + path;
  } else {
    path = "Sam Malcolm Media";
  }




  res.render('index', { title: path });
});

module.exports = router;
