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
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/snooker', function (req, res, next) {
  let path = "Sam Malcolm Media | Snooker";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Snooker"
  meta.feature_image = "assets/ui_images/snooker2.jpg"
  meta.social_description = "Summary page of Sam Malcolms Snooker & Billiards results"
  meta.feature_image_alt = "An image of Sam Malcolm playing snooker, with the rest"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/blog', function (req, res, next) {
  let path = "Sam Malcolm Media | Blog";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Blog"
  meta.feature_image = "assets/ui_images/social_share.png"
  meta.social_description = "Blog page of Sam Malcolm's official website"
  meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/film', function (req, res, next) {
  let path = "Sam Malcolm Media | Film Criticism";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Film Criticism"
  meta.feature_image = "assets/ui_images/film.jpg"
  meta.social_description = "A curated resource of Sam Malcolm's film criticism across various platforms"
  meta.feature_image_alt = "An image a film clapperboard"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/film', function (req, res, next) {
  let path = "Sam Malcolm Media | Film Criticism";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Film Criticism"
  meta.feature_image = "assets/ui_images/film.jpg"
  meta.social_description = "A curated resource of Sam Malcolm's film criticism across various platforms"
  meta.feature_image_alt = "An image of a film clapperboard"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/about', function (req, res, next) {
  let path = "Sam Malcolm Media | About";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | About"
  meta.feature_image = "assets/profile/small_me_for_site.jpg"
  meta.social_description = "The about me page of Sam Malcolm's official website"
  meta.feature_image_alt = "An image of Sam Malcolm"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});
router.get('/contact', function (req, res, next) {
  let path = "Sam Malcolm Media | Contact";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Contact"
  meta.feature_image = "assets/ui_images/social_share.png"
  meta.social_description = "The contact page of Sam Malcolm's official website"
  meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/work', function (req, res, next) {
  let path = "Sam Malcolm Media | Work";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Work"
  meta.feature_image = "assets/ui_images/social_share.png"
  meta.social_description = "A curated list of folio works by Sam Malcolm"
  meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/music', function (req, res, next) {
  let path = "Sam Malcolm Media | Music";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Music"
  meta.feature_image = "assets/ui_images/music.jpg"
  meta.social_description = "Sam Malcolm's discography and information about upcoming music projects"
  meta.feature_image_alt = "An image of Sam Malcolm playing guitar"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});

router.get('/appearances', function (req, res, next) {
  let path = "Sam Malcolm Media | Live";
  let meta = {};
  meta.social_title = "Sam Malcolm Media | Live"
  meta.feature_image = "assets/profile/small_me_for_site.jpg"
  meta.social_description = "List of events for Sam Malcolm"
  meta.feature_image_alt = "An image of Sam Malcolm"
  res.render('index', { title: path, meta: meta, url: config.get("siteAddress") });
});


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
