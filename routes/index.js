var express = require('express');
var router = express.Router();

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
  let path = req.originalUrl.slice(1, req.originalUrl.length);
  path = path.split("");
  path[0] = path[0].toUpperCase();
  path = path.join("");
  res.render('index', { title: 'Sam Malcolm Media | ' + path });
});

module.exports = router;
