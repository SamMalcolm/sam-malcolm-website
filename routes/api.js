var express = require('express');
var router = express.Router();
const blogModel = require('../models/blog');
const appearanceModel = require('../models/appearances');
const workModel = require('../models/work');
const snookerModel = require('../models/snooker');
const tutorialModel = require('../models/tutorials');
const albumModel = require('../models/albums');
const axios = require('axios');
const { googleApiKey } = require('../keys/google_api.js');
const parseString = require('xml2js').parseString;
const moment = require('moment');
const nodemailer = require('nodemailer');
const nodemailer_transport = require("../keys/nodemailer_transport");
const util = require('../util/util');
const fs = require("fs");
const formidable = require('formidable')


/* GET home page. */

// Get blog posts
router.get('/blog', (req, res) => {
    blogModel.find({}).where({ active: true }).sort({ 'date': -1 }).exec((err, docs) => {
        res.send(docs);
    })
});

router.get('/blog/all', (req, res) => {
    blogModel.find({}).sort({ 'date': -1 }).exec((err, docs) => {
        res.send(docs);
    })
});

router.get('/blog/:id', (req, res) => {
    blogModel.findById(req.params.id, (err, docs) => {
        if (docs.active) {
            res.send(docs);
        } else {
            res.sendStatus(403);
        }
    })
});

// Post new blog post
router.post('/blog', util.isAuthenticated, (req, res) => {
    var form = formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.sendStatus(500);
        } else {
            if (files["feature_image"]) {
                fs.rename(files["feature_image"].path, "public/assets/blog/" + encodeURIComponent(files["feature_image"].name), (err) => {
                    if (err) {
                        console.log(err)
                    } else {
                        let blog = new blogModel({
                            title: fields.title,
                            markup: fields.content,
                            date: (fields.date) ? moment(fields.date) : new Date(),
                            active: (fields.active == "on") ? true : false,
                            author: (fields.author) ? req.body.author : "Sam Malcolm",
                            social_description: fields.social_description,
                            feature_image: "/assets/blog/" + encodeURIComponent(files["feature_image"].name),
                            social_title: fields.title,
                        });
                        blog.save();
                        res.redirect("/admin/manage/blog");
                    }
                });
            } else {
                res.sendStatus(500);

            }
        }
    });
});

// Delete record by ID
router.delete('/blog/:blog_id', util.isAuthenticated, (req, res) => {
    blogModel.deleteOne({ _id: req.params.blog_id }, (err, resp) => {
        res.send(resp);
    })
})

// Get blog posts
router.get('/appearances', (req, res) => {
    appearanceModel.find({}, (err, docs) => {
        res.send(docs);
    })
});

// Post new Appearance post
router.post('/appearances', util.isAuthenticated, (req, res) => {
    console.log(req.body);
    let appearance = new appearanceModel({
        date: req.body.date,
        event: req.body.event,
        name: req.body.name,
        location: req.body.location,
        tickets: req.body.tickets,
        info: req.body.info,
        photos: req.body.photo
    });
    appearance.save();
    res.json(appearance);
});

// Delete record by ID
router.delete('/appearances', util.isAuthenticated, (req, res) => {
    appearanceModel.deleteOne({ _id: req.body.id }, (err, resp) => {
        res.send(resp);
    })
})

router.get('/albums', (req, res) => {
    albumModel.find({ 'active': true }).sort({ 'year': -1 }).exec((err, docs) => {
        res.send(docs);
    })
});
// WORKS

// Get blog posts
router.get('/works', (req, res) => {
    workModel.find({}).where({ active: true }).sort({ 'date': -1 }).exec((err, docs) => {
        res.send(docs);
    })
});

// Get blog posts
router.get('/works/:id', (req, res) => {
    workModel.findById(req.params.id, (err, docs) => {
        if (docs.active) {
            res.send(docs);
        } else {
            res.sendStatus(403);
        }
    })
});

// Post new blog post
router.post('/works', util.isAuthenticated, (req, res) => {
    console.log(req.body);
    let work = new workModel({
        date: req.body.date,
        description: req.body.description,
        name: req.body.name
    });
    work.save();
    res.json(work);
});

// Delete record by ID
router.delete('/works', util.isAuthenticated, (req, res) => {
    workModel.deleteOne({ _id: req.body.id }, (err, resp) => {
        res.send(resp);
    })
});

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
            res.send(err);
        } else {
            console.log(info);
            res.redirect('/contact');
        }
    })

})

router.get('/youtube/transcript/:video_id', async (req, res) => {
    let tscript = await axios.get("http://video.google.com/timedtext?lang=en&v=" + response[i].contentDetails.videoId);
    parseString(tscript, { trim: true }, (err, result) => {
        if (err) {
            console.log(err);
            res.sendStatus(404);
        }
        console.log(result);
        res.send(result);
    });
});

// ADD PLAYLIST TO DB
router.post('/youtube/:playlist_id', async (req, res) => {
    let response = {};
    let googleData = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=' + req.params.playlist_id + '&key=' + googleApiKey);
    response.items = googleData.data.items;
    let channelInfo = await axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCOSAPdTi4ICVPW8AUzoHUMg&key=' + googleApiKey);
    response.channel = channelInfo.data;
    // ADD TO DB
    res.send(response);
})

// ADD PLAYLIST TO DB
router.get('/tutorial/:playlist_id', async (req, res) => {
    tutorialModel.findById(req.params.playlist_id, (err, docs) => {
        res.send(docs);
    });
})

// ADD PLAYLIST TO DB
router.get('/tutorial', async (req, res) => {
    tutorialModel.find({}, (err, docs) => {
        res.send(docs);
    });
})

module.exports = router;
