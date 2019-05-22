var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var workModel = require('../models/work');
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
  '/blog/:blog_id'
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


router.get('/work/:work_id', (req, res) => {
  workModel.findById(req.params.work_id, (err, docs) => {
    console.log(docs);
    res.render('index', {
      work: docs,
      title: docs.name
    })
  })
})

module.exports = router;
