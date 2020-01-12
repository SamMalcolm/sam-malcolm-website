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

router.get('/pod/rss', (req, res) => {
  let xml_response = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:itunesu="http://www.itunesu.com/feed" version="2.0">
<channel>
<link>https://sammalcolmmedia.com/</link>
<language>en-us</language>
<copyright>&#xA9; Chalking Snooker 2019</copyright>
<webMaster>sam_malcolm@live.com.au (Sam Malcolm)</webMaster>
<managingEditor>sam_malcolm@live.com.au (Sam Malcolm)</managingEditor>
<image>
   <url>https://chalking-snooker.s3-us-west-2.amazonaws.com/chalking-snooker.jpg</url>
   <title>Chalking Snooker Artwork</title>
   <link>https://sammalcolmmedia.com/</link>
</image>
<itunes:owner>
   <itunes:name>Sam Malcolm</itunes:name>
   <itunes:email>sam_malcolm@live.com.au</itunes:email>
</itunes:owner>
<itunes:category text="Sports">
</itunes:category>
<itunes:keywords>sport, snooker, australia, neil, robertson, neilrobertson, snooker, cue, billiards</itunes:keywords>
<itunes:explicit>no</itunes:explicit>
<itunes:image href="https://chalking-snooker.s3-us-west-2.amazonaws.com/chalking-snooker.jpg" />
<atom:link href="https://sammalcolmmedia.com/pod/rss" rel="self" type="application/rss+xml" />
<pubDate>Mon, 07 Oct 2019 09:00:00 GMT</pubDate>
<title>Chalking Snooker</title>
<itunes:author>David Heath, Sam Malcolm, Bill Lindsay</itunes:author>
<description>Chalking Snooker is a Snooker podcast proudly made in Australia by some passionate Snooker fans/players. They are David Heath, Sam Malcolm and Bill Lindsay.</description>
<itunes:summary>Chalking Snooker is a Snooker podcast proudly made in Australia by some passionate Snooker fans/players. They are David Heath, Sam Malcolm and Bill Lindsay.</itunes:summary>
<itunes:subtitle>Made in Australia</itunes:subtitle>
<lastBuildDate>Mon, 07 Oct 2019 09:00:00 GMT</lastBuildDate>

<!--REPEAT THIS BLOCK FOR EACH EPISODE-->
<item>
   <title>Episode 1 Neil Robertson</title>
   <description>Neil Robertson is a legend of the game and considered by many to be one of the greatest players of all time. Neil sits down with David, Sam and Bill to discuss his career and how he got started playing snooker. Neil shares some of his insights and fun stories from his decorated career.</description>
   <itunes:summary>Neil Robertson is a legend of the game and considered by many to be one of the greatest players of all time. Neil sits down with David, Sam and Bill to discuss his career and how he got started playing snooker. Neil shares some of his insights and fun stories from his decorated career.</itunes:summary>
   <itunes:subtitle>Neil Robertson is a legend of the game and considered by many to be one of the greatest players of all time.</itunes:subtitle>
   <enclosure url="https://chalking-snooker.s3-us-west-2.amazonaws.com/episode_1.mp3" type="audio/mp3" length="4278" />
   <guid>https://chalking-snooker.s3-us-west-2.amazonaws.com/episode_1.mp3</guid>
   <itunes:image href="https://chalking-snooker.s3-us-west-2.amazonaws.com/ep-1.jpg" />
   <itunes:duration>1:11:18</itunes:duration>
   <pubDate>Mon, 07 Oct 2019 09:00:00 GMT</pubDate>
</item>
<!--END REPEAT--> 

</channel>
</rss>`
  res.type('application/rss+xml');
  res.send(xml_response);
})

module.exports = router;
