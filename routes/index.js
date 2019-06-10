var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var workModel = require('../models/work');
const blogModel = require('../models/blog');
const config = require('config');
/* GET home page. */
router.get('/', function (req, res, next) {
  let path = "Sam Malcolm Media";
  let meta = {};
  meta.social_title = "Sam Malcolm Media"
  meta.feature_image = "assets/ui_images/social_share.png"
  meta.social_description = "The official website for Sam Malcolm, the Melbourne based Digital Media Designer"
  meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
  console.log("\n\nMETA\n\n");
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get([
  '/snooker',
  '/tutorials',
  '/blog',
  '/film',
  '/contact',
  '/about',
  '/work',
  '/music',
  '/appearances'], function (req, res, next) {
    let path = "Sam Malcolm Media";

    let meta = {};



    meta.social_title = "Sam Malcolm Media"
    meta.feature_image = "assets/ui_images/social_share.png"
    meta.social_description = "The official website for Sam Malcolm, the Melbourne based Digital Media Designer"
    meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
    console.log("\n\nOTHER ROUTE\n\n");

    res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
  }
);


router.get('/work/:work_id', (req, res) => {
  workModel.findById(req.params.work_id, (err, docs) => {
    console.log(docs);
    res.render('index', {
      meta: docs,
      title: docs.name,
      url: config.get("siteAddress")
    })
  })
})

router.get('/blog/:blog_id', (req, res) => {
  blogModel.findById(req.params.blog_id, (err, docs) => {
    console.log(docs);
    res.render('index', {
      meta: docs,
      title: docs.name,
      url: config.get("siteAddress")
    })
  })
})

module.exports = router;
