var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var workModel = require('../models/work');
const blogModel = require('../models/blog');
const config = require('config');
const tutorialModel = require('../models/tutorials');
const podcastsModel = require('../models/podcasts');
const bucket = (typeof process.env.S3_BUCKET != "undefined") ? process.env.S3_BUCKET : false;
const jsdom = require('jsdom');
const { JSDOM } = jsdom
/* GET home page. */
router.get('/', function (req, res, next) {
	let path = "Sam Malcolm Media";
	let meta = {};
	meta.social_title = "Sam Malcolm Media"
	meta.feature_image = "assets/ui_images/social_share.png"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "The official website for Sam Malcolm, the Melbourne based Digital Media Designer"
	meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/snooker', function (req, res, next) {
	let path = "Sam Malcolm Media | Snooker";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Snooker"
	meta.feature_image = "assets/ui_images/snooker2.jpg"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "Summary page of Sam Malcolms Snooker & Billiards results"
	meta.feature_image_alt = "An image of Sam Malcolm playing snooker, with the rest"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/blog', function (req, res, next) {
	let path = "Sam Malcolm Media | Blog";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Blog"
	meta.feature_image = "assets/ui_images/social_share.png"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "Blog page of Sam Malcolm's official website"
	meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/film', function (req, res, next) {
	let path = "Sam Malcolm Media | Film Criticism";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Film Criticism"
	meta.feature_image = "assets/ui_images/film.jpg"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "A curated resource of Sam Malcolm's film criticism across various platforms"
	meta.feature_image_alt = "An image a film clapperboard"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});


router.get('/film', function (req, res, next) {
	let path = "Sam Malcolm Media | Film Criticism";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Film Criticism"
	meta.feature_image = "assets/ui_images/film.jpg"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "A curated resource of Sam Malcolm's film criticism across various platforms"
	meta.feature_image_alt = "An image of a film clapperboard"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/about', function (req, res, next) {
	let success_message = false;
	let error_message = false;
	if (req.session.success_message) {
		success_message = req.session.success_message;
		req.session.success_message = "";
	}
	if (req.session.error_message) {
		error_message = req.session.error_message;
		req.session.error_message = "";
	}

	let path = "Sam Malcolm Media | About";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | About"
	meta.feature_image = "assets/profile/me.jpg"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "The about me page of Sam Malcolm's official website"
	meta.feature_image_alt = "An image of Sam Malcolm"
	res.render('index', {
		title: path, bucket: bucket, meta: meta, url: config.get("siteAddress"),
		success_message: success_message,
		error_message: error_message
	});
});
router.get('/contact', function (req, res, next) {
	let success_message = false;
	let error_message = false;
	if (req.session.success_message) {
		success_message = req.session.success_message;
		req.session.success_message = "";
	}
	if (req.session.error_message) {
		error_message = req.session.error_message;
		req.session.error_message = "";
	}
	let path = "Sam Malcolm Media | Contact";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Contact"
	meta.feature_image = "assets/ui_images/social_share.png"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "The contact page of Sam Malcolm's official website"
	meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
	res.render('index', {
		title: path,
		bucket: bucket,
		meta: meta,
		url: config.get("siteAddress"),
		success_message: success_message,
		error_message: error_message
	});
});

router.get('/work', function (req, res, next) {
	let path = "Sam Malcolm Media | Work";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Work"
	meta.feature_image = "assets/ui_images/social_share.png"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "A curated list of folio works by Sam Malcolm"
	meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});
router.get('/podcasts', function (req, res, next) {
	let path = "Sam Malcolm Media | Podcasts";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | podcasts"
	meta.feature_image = "assets/ui_images/social_share.png"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "A list of podcasts by Sam Malcolm"
	meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/music', function (req, res, next) {
	let path = "Sam Malcolm Media | Music";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Music"
	meta.feature_image = "assets/ui_images/music.jpg"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "Sam Malcolm's discography and information about upcoming music projects"
	meta.feature_image_alt = "An image of Sam Malcolm playing guitar"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/appearances', function (req, res, next) {
	let path = "Sam Malcolm Media | Live";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Live"
	meta.feature_image = "assets/profile/small_me_for_site.jpg"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "List of events for Sam Malcolm"
	meta.feature_image_alt = "An image of Sam Malcolm"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/tutorials', function (req, res, next) {
	let path = "Sam Malcolm Media | Tutorials";
	let meta = {};
	meta.social_title = "Sam Malcolm Media | Tutorials"
	meta.feature_image = "assets/ui_images/social_share.png"
	if (bucket) {
		meta.feature_image = bucket + '/' + meta.feature_image;
	}
	meta.social_description = "The contact page of Sam Malcolm's official website"
	meta.feature_image_alt = "An image of Sam Malcolms logo, the outline of a cube with a gradient coloured background"
	res.render('index', { title: path, bucket: bucket, meta: meta, url: config.get("siteAddress") });
});

router.get('/tutorials/:id', function (req, res, next) {
	tutorialModel.findById(req.params.id, (err, docs) => {
		let path = "Sam Malcolm Media | " + docs.title;
		let meta = {};
		meta.social_title = path;
		meta.feature_image = docs.feature_image;
		if (bucket) {
			meta.feature_image = bucket + meta.feature_image;
		}
		meta.social_description = docs.social_description;
		meta.feature_image_alt = docs.feature_image_alt;
		res.render('index', { title: path, meta: meta, bucket: bucket, url: config.get("siteAddress") });
	})

});
router.get('/podcast/:id', function (req, res, next) {
	podcastsModel.findById(req.params.id, (err, docs) => {
		let path = "Sam Malcolm Media | " + docs.title;
		let meta = {};
		meta.social_title = path;
		meta.feature_image = docs.feature_image;
		if (bucket) {
			meta.feature_image = bucket + meta.feature_image;
		}
		meta.social_description = docs.social_description;
		meta.feature_image_title = docs.feature_image_title;
		res.render('index', { title: path, meta: meta, bucket: bucket, url: config.get("siteAddress") });
	})

});


router.get('/work/:work_id', (req, res) => {
	workModel.findById(req.params.work_id, (err, docs) => {
		if (docs.active) {
			if (bucket) {
				if (docs.type == 2) {
					docs.data = docs.data.map((item) => {
						item.photo = bucket + item.photo;
						item.thumbnail = bucket + item.thumbnail;
						return item;
					})
				}
				docs.feature_image = (docs.feature_image) ? bucket + docs.feature_image : "";
				docs.thumb_src = (docs.thumb_src) ? bucket + docs.thumb_src : "";
			} else {
				docs.feature_image = (docs.feature_image) ? config.get("siteAddress") + docs.feature_image : "";
				docs.thumb_src = (docs.thumb_src) ? config.get("siteAddress") + docs.thumb_src : "";
			}
			res.render('index', {
				bucket: bucket,
				meta: docs,
				title: docs.name,
				url: config.get("siteAddress")
			})
		} else {
			res.redirect('/');
		}

	})
})

router.get('/blog/:blog_id', (req, res) => {
	blogModel.findById(req.params.blog_id, (err, docs) => {
		docs.feature_image = (bucket) ? bucket + docs.feature_image : config.get("siteAddress") + docs.feature_image;
		if (bucket) {
			let doc = docs.markup;
			doc = new JSDOM(doc).window.document;
			let images = doc.querySelectorAll("img");
			for (let i = 0; i < images.length; i++) {
				images[i].setAttribute("src", bucket + images[i].getAttribute("src"))
			}
			docs.markup = doc.querySelector("body").innerHTML;
		}
		res.render('index', {
			bucket: bucket,
			meta: docs,
			title: docs.name,
			url: config.get("siteAddress")
		})
	})
})

router.get('/pod/rss/old', (req, res) => {
	let xml_response = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:itunesu="http://www.itunesu.com/feed" version="2.0">
<channel>
<link>https://www.sammalcolmmedia.com/</link>
<language>en-us</language>
<copyright>&#xA9; Chalking Snooker 2019</copyright>
<webMaster>sam_malcolm@live.com.au (Sam Malcolm)</webMaster>
<managingEditor>sam_malcolm@live.com.au (Sam Malcolm)</managingEditor>
<image>
   <url>https://chalking-snooker.s3-us-west-2.amazonaws.com/chalking-snooker.jpg</url>
   <title>Chalking Snooker Artwork</title>
   <link>https://www.sammalcolmmedia.com/</link>
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
<atom:link href="https://www.sammalcolmmedia.com/pod/rss" rel="self" type="application/rss+xml" />
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

router.get('/pod/rss/', (req, res) => {
	podcastsModel.find({}, (err, docs) => {
		console.log(docs);
		let xml_response = `<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:itunesu="http://www.itunesu.com/feed" version="2.0">
<channel>
<link>https://www.sammalcolmmedia.com/</link>
<language>en-us</language>
<copyright>${docs[0].copyright}</copyright>
<webMaster>sam_malcolm@live.com.au (Sam Malcolm)</webMaster>
<managingEditor>sam_malcolm@live.com.au (Sam Malcolm)</managingEditor>
<image>
   <url>${docs[0].feature_image}</url>
   <title>${docs[0].feature_image_title}</title>
   <link>https://www.sammalcolmmedia.com/</link>
</image>
<itunes:owner>
   <itunes:name>Sam Malcolm</itunes:name>
   <itunes:email>sam_malcolm@live.com.au</itunes:email>
</itunes:owner>
<itunes:category text="Sports">
</itunes:category>
<itunes:keywords>${docs[0].itunes_keywords}</itunes:keywords>
<itunes:explicit>no</itunes:explicit>
<itunes:image href="${docs[0].feature_image}" />
<atom:link href="https://www.sammalcolmmedia.com/pod/rss" rel="self" type="application/rss+xml" />
<pubDate>${docs[0].pub_date}</pubDate>
<title>${docs[0].title}</title>
<itunes:author>${docs[0].author}</itunes:author>
<description>${docs[0].social_description}</description>
<itunes:summary>${docs[0].social_description}</itunes:summary>
<itunes:subtitle>${docs[0].subtitle}</itunes:subtitle>
<lastBuildDate>${docs[0].pub_date}</lastBuildDate>`;

		for (let i = 0; i < docs[0].episodes.length; i++) {
			xml_response += `<item>
			<title>${docs[0].episodes[i].title}</title>
			<description>${docs[0].episodes[i].social_description}</description>
			<itunes:summary>${docs[0].episodes[i].social_description}</itunes:summary>
			<itunes:subtitle>${docs[0].episodes[i].subtitle}</itunes:subtitle>
			<enclosure url="${docs[0].episodes[i].mp3_src}" type="audio/mp3" length="${docs[0].episodes[i].mp3_duration}" />
			<guid>${docs[0].episodes[i].mp3_src}</guid>
			<itunes:image href="${docs[0].episodes[i].feature_image}" />
			<itunes:duration>${docs[0].episodes[i].itunes_duration}</itunes:duration>
			<pubDate>${docs[0].episodes[i].pub_date}</pubDate>
		 </item>`
		}


		xml_response += `</channel>
</rss>`;
		res.type('application/rss+xml');
		res.send(xml_response);
	})


})

router.get('/privacy/snooker', (req, res) => {
	res.send(`
	<h1>Smart Snooker Scoreboard Privacy Policy</h1>
	<p>The smart snooker scoreboard app does not collect any data from its users. Any data the app uses is stored within the application memory and is only stored for the duration that it is required when using the app. The data is not accessible by the developer.</p>`)
})

module.exports = router;
