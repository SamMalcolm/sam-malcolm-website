var express = require('express');
var router = express.Router();
const blogModel = require('../models/blog');
const appearanceModel = require('../models/appearances');
const workModel = require('../models/work');
const snookerModel = require('../models/snooker');
const albumModel = require('../models/albums');
const backgroundsModel = require('../models/backgrounds');
const socialsModel = require('../models/socials');
const axios = require('axios');
const { googleApiKey } = require('../keys/google_api.js');
const parseString = require('xml2js').parseString;
const moment = require('moment');
const nodemailer = require('nodemailer');
const nodemailer_transport = require("../keys/nodemailer_transport");
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const bucket = (typeof process.env.S3_BUCKET != "undefined") ? process.env.S3_BUCKET : false;
/* GET home page. */

// Get blog posts
router.get('/blog', (req, res) => {
	blogModel.find({}).where({ active: true }).sort({ 'date': -1 }).exec((err, docs) => {
		if (bucket) {
			for (let i = 0; i < docs.length; i++) {
				docs[i].feature_image = bucket + docs[i].feature_image;
			}
		}
		res.send(docs);
	})
});

router.get('/blog/:id', (req, res) => {
	blogModel.findById(req.params.id, (err, docs) => {
		if (docs.active) {
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
			res.send(docs);
		} else {
			res.sendStatus(403);
		}
	})
});

// Post new blog post
// router.post('/blog', (req, res) => {
//     console.log(req.body);
//     let blog = new blogModel({
//         title: req.body.title,
//         content: req.body.content,
//         date: new Date(),
//         author: req.body.author,
//         social_description: req.body.social_description,
//         feature_image: req.body.feature_image,
//         social_title: req.body.title,
//     });
//     blog.save();
//     res.json(blog);
// });

// Delete record by ID
// router.delete('/blog', (req, res) => {
//     blogModel.deleteOne({ _id: req.body.id }, (err, resp) => {
//         res.send(resp);
//     })
// })

// Get blog posts
router.get('/appearances', (req, res) => {
	appearanceModel.find({}, (err, docs) => {
		res.send(docs);
	})
});

// Post new blog post
// router.post('/appearances', (req, res) => {
//     console.log(req.body);
//     let appearance = new appearanceModel({
//         date: req.body.date,
//         event: req.body.event,
//         name: req.body.name,
//         location: req.body.location,
//         tickets: req.body.tickets,
//         info: req.body.info,
//         photos: req.body.photo
//     });
//     appearance.save();
//     res.json(appearance);
// });

// Delete record by ID
// router.delete('/appearances', (req, res) => {
//     appearanceModel.deleteOne({ _id: req.body.id }, (err, resp) => {
//         res.send(resp);
//     })
// })

router.get('/albums', (req, res) => {
	albumModel.find({ 'active': true }).sort({ 'year': -1 }).exec((err, docs) => {
		if (bucket) {
			for (let i = 0; i < docs.length; i++) {
				docs[i].artwork = bucket + docs[i].artwork;
			}
		}
		res.send(docs);
	})
});
// WORKS

// Get blog posts
router.get('/works', (req, res) => {
	workModel.find({}).where({ active: true }).sort({ 'date': -1 }).exec((err, docs) => {
		if (bucket) {
			for (let i = 0; i < docs.length; i++) {
				docs[i].thumb_src = bucket + docs[i].thumb_src;
				docs[i].feature_image = bucket + docs[i].feature_image;
			}
		}
		res.send(docs);
	})
});

// Get blog posts
router.get('/works/:id', (req, res) => {
	workModel.findById(req.params.id, (err, docs) => {
		if (docs.active) {
			console.log("IN API ROUTE");
			if (bucket) {
				console.log("IN BUCKET");
				if (docs.type == 2) {
					console.log("UPDATING IMAGE OBJECT");
					docs.data = docs.data.map((item) => {
						console.log("MAPPING");
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
			res.send(docs);
		} else {
			res.sendStatus(403);
		}
	})
});

// Post new blog post
// router.post('/works', (req, res) => {
//     console.log(req.body);
//     let work = new workModel({
//         date: req.body.date,
//         description: req.body.description,
//         name: req.body.name
//     });
//     work.save();
//     res.json(work);
// });

// Delete record by ID
// router.delete('/works', (req, res) => {
//     workModel.deleteOne({ _id: req.body.id }, (err, resp) => {
//         res.send(resp);
//     })
// });

router.get('/film_data', async (req, res) => {

	let googleData = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=PLYj0yV-4c3WdYKOrfdraM9-2aVzopk4KK&key=' + googleApiKey);
	let letterboxdData = await axios.get('https://letterboxd.com/samwise_7107/rss/');
	let finalResult = [];

	parseString(letterboxdData.data, function (err, result) {
		if (err) { console.log(err) }

		for (let i = 0; i < googleData.data.items.length; i++) {
			finalResult.push(googleData.data.items[i]);
		}

		for (let i = 0; i < result.rss.channel[0].item.length; i++) {
			finalResult.push(result.rss.channel[0].item[i]);
		}

		finalResult.sort((a, b) => {
			let dateA, dateB;
			if (typeof a.pubDate != 'undefined') {
				dateA = moment(a.pubDate[0]);
			} else {
				dateA = moment(a.contentDetails.videoPublishedAt);
			}

			if (typeof b.pubDate != 'undefined') {
				dateB = moment(b.pubDate[0]);
			} else {
				dateB = moment(b.contentDetails.videoPublishedAt);
			}

			return dateB - dateA;

		})

		res.send(finalResult);

	});

});

router.get('/snooker/all', (req, res) => {
	snookerModel.find({}).sort({ 'year': -1 }).exec((err, docs) => {
		if (err) { console.log(err) }
		res.send(docs);
	})
})

router.get('/snooker/:id', (req, res) => {
	snookerModel.findById(req.params.id, (err, docs) => {
		if (err) { console.log(err) }
		res.send(docs);
	})
})

router.post('/contact', (req, res) => {
	console.log(req);
	console.log(req.body);
	let transport = nodemailer.createTransport(nodemailer_transport);
	var message = {
		from: 'Sam Malcolm Media <sam.malcolm.media@gmail.com>',
		to: req.body.email,
		cc: 'sam_malcolm@live.com.au',
		subject: 'Sam Malcolm Media | Message',
		replyTo: req.body.email,
		text: 'Thank you for contact Sam Malcolm Media. I will try and get back to you as soon as i can',
		html: `<p>Thank you for contact Sam Malcolm Media. I will try and get back to you as soon as i can</p>
        <b>Name: </b>${req.body.name}
        <b>Email: </b>${req.body.email}
        <b>Message: </b>${req.body.message}
        `
	};
	transport.sendMail(message, (err, info) => {
		if (err) {
			console.log(err);
			req.session.error_message = "There was an error :( Alternatively you can email me using sam.malcolm.media@gmail.com";
			res.redirect('/contact');
		} else {
			console.log(info);
			req.session.success_message = "The email was sent successfully";
			res.redirect('/contact');
		}
	})

})

router.get('/backgrounds', (req, res) => {
	backgroundsModel.find({}).exec((err, docs) => {
		if (bucket) {
			for (let i = 0; i < docs.length; i++) {
				docs[i].src = bucket + docs[i].src;
			}
		}
		console.log(docs);
		res.send(docs);
	})
});

router.get('/socials', (req, res) => {
	socialsModel.find({}).exec((err, docs) => {
		// if (bucket) {
		// 	for (let i = 0; i < docs.length; i++) {
		// 		docs[i].icon = bucket + docs[i].icon;
		// 	}
		// }
		res.send(docs);
	})
});

module.exports = router;
