var express = require('express');
var router = express.Router();
const blogModel = require('../models/blog');
const appearanceModel = require('../models/appearances');
const workModel = require('../models/work');
const snookerModel = require('../models/snooker');
const albumModel = require('../models/albums');
const axios = require('axios');
const { googleApiKey } = require('../keys/google_api.js');
const parseString = require('xml2js').parseString;
const moment = require('moment');
const nodemailer = require('nodemailer');
const nodemailer_transport = require("../keys/nodemailer_transport");

/* GET home page. */

// Get blog posts
router.get('/blog', (req, res) => {
    blogModel.find({}).where({ active: true }).sort({ 'date': -1 }).exec((err, docs) => {
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

router.get('/youtube/:playlist_id', async (req, res) => {
    // let response = {};
    // let googleData = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=50&playlistId=' + req.params.playlist_id + '&key=' + googleApiKey);
    // response.items = googleData.data.items;
    // let channelInfo = await axios.get('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCOSAPdTi4ICVPW8AUzoHUMg&key=' + googleApiKey);
    // response.channel = channelInfo.data;
    // res.send(response);

    res.send({
        "items": [
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/votrOvLoC4ihiAjevo01c36Eo-4\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi4yODlGNEE0NkRGMEEzMEQy",
                "snippet": {
                    "publishedAt": "2019-05-09T04:31:32.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Introduction: 14 Elements Training",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/m_-quuppfSQ/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/m_-quuppfSQ/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/m_-quuppfSQ/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/m_-quuppfSQ/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/m_-quuppfSQ/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 0,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "m_-quuppfSQ"
                    }
                },
                "contentDetails": {
                    "videoId": "m_-quuppfSQ",
                    "videoPublishedAt": "2019-05-09T04:21:57.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/hQAdWNIAXnqDZOcLciit0hAc97M\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi41NkI0NEY2RDEwNTU3Q0M2",
                "snippet": {
                    "publishedAt": "2019-05-09T04:31:31.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Introduction: Accessing Canvas",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/8Dq5z6MUMpw/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/8Dq5z6MUMpw/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/8Dq5z6MUMpw/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/8Dq5z6MUMpw/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/8Dq5z6MUMpw/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 1,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "8Dq5z6MUMpw"
                    }
                },
                "contentDetails": {
                    "videoId": "8Dq5z6MUMpw",
                    "videoPublishedAt": "2019-05-09T04:22:10.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/rDGExYa2mupXiGEfJPaBGXzlQgw\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi4wMTcyMDhGQUE4NTIzM0Y5",
                "snippet": {
                    "publishedAt": "2019-05-09T04:31:44.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 1: Course Home Page and Banner",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/kKPcRiFPt7o/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/kKPcRiFPt7o/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/kKPcRiFPt7o/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/kKPcRiFPt7o/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/kKPcRiFPt7o/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 2,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "kKPcRiFPt7o"
                    }
                },
                "contentDetails": {
                    "videoId": "kKPcRiFPt7o",
                    "videoPublishedAt": "2019-05-09T04:22:19.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/2XBHdLwphiMatbuYUmrecJYxJJk\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi41MjE1MkI0OTQ2QzJGNzNG",
                "snippet": {
                    "publishedAt": "2019-05-09T04:31:50.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 2: Introductory Announcement",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/98wOn7a0Uy4/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/98wOn7a0Uy4/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/98wOn7a0Uy4/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/98wOn7a0Uy4/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/98wOn7a0Uy4/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 3,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "98wOn7a0Uy4"
                    }
                },
                "contentDetails": {
                    "videoId": "98wOn7a0Uy4",
                    "videoPublishedAt": "2019-05-09T04:22:35.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/r4Xe65wu6Qdk8hngAvZFeubbMJM\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi4wOTA3OTZBNzVEMTUzOTMy",
                "snippet": {
                    "publishedAt": "2019-05-09T04:31:59.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 3: Course Welcome and Orientation Module",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/GgSeEjQPyuQ/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/GgSeEjQPyuQ/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/GgSeEjQPyuQ/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/GgSeEjQPyuQ/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/GgSeEjQPyuQ/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 4,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "GgSeEjQPyuQ"
                    }
                },
                "contentDetails": {
                    "videoId": "GgSeEjQPyuQ",
                    "videoPublishedAt": "2019-05-09T04:22:43.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/OHqeiphXNkByWXAzqYgAxkasNdo\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi4xMkVGQjNCMUM1N0RFNEUx",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:08.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 4: Welcome to the Course Page",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/Mcp7LUvhnzU/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/Mcp7LUvhnzU/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/Mcp7LUvhnzU/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/Mcp7LUvhnzU/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/Mcp7LUvhnzU/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 5,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "Mcp7LUvhnzU"
                    }
                },
                "contentDetails": {
                    "videoId": "Mcp7LUvhnzU",
                    "videoPublishedAt": "2019-05-09T04:22:51.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/waHSgMmC-MphX2tBYi1H10I_dOs\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi41MzJCQjBCNDIyRkJDN0VD",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:15.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 5: Teaching Team Page",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/CZYWtfokoJc/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/CZYWtfokoJc/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/CZYWtfokoJc/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/CZYWtfokoJc/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/CZYWtfokoJc/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 6,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "CZYWtfokoJc"
                    }
                },
                "contentDetails": {
                    "videoId": "CZYWtfokoJc",
                    "videoPublishedAt": "2019-05-09T04:23:04.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/gGm6C_UWGRXk5Gu3GYlSkahFv4Y\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi5DQUNERDQ2NkIzRUQxNTY1",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:21.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 6: Canvas in this Course Page",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/1EbyTePns3s/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/1EbyTePns3s/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/1EbyTePns3s/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/1EbyTePns3s/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/1EbyTePns3s/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 7,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "1EbyTePns3s"
                    }
                },
                "contentDetails": {
                    "videoId": "1EbyTePns3s",
                    "videoPublishedAt": "2019-05-09T04:23:13.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/7DLMESXtPP4G0C8ROJMQ6KbsQBU\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi45NDk1REZENzhEMzU5MDQz",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:27.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 7: Course Queries",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/LLDm1v9iV_4/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/LLDm1v9iV_4/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/LLDm1v9iV_4/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/LLDm1v9iV_4/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/LLDm1v9iV_4/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 8,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "LLDm1v9iV_4"
                    }
                },
                "contentDetails": {
                    "videoId": "LLDm1v9iV_4",
                    "videoPublishedAt": "2019-05-09T04:23:23.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/rzDrzcYbnQE3apr5FIa4gHvm1eI\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi5GNjNDRDREMDQxOThCMDQ2",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:33.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 8: Course Schedule",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/sx8Aw9mq5OU/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/sx8Aw9mq5OU/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/sx8Aw9mq5OU/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/sx8Aw9mq5OU/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/sx8Aw9mq5OU/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 9,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "sx8Aw9mq5OU"
                    }
                },
                "contentDetails": {
                    "videoId": "sx8Aw9mq5OU",
                    "videoPublishedAt": "2019-05-09T04:23:31.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/25mg0Gbl3lqDFiKv_rVuWD1uj9Q\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi40NzZCMERDMjVEN0RFRThB",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:39.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Elements 9 & 10: Content Menu Items",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/aXfb6wvTq3E/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/aXfb6wvTq3E/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/aXfb6wvTq3E/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/aXfb6wvTq3E/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/aXfb6wvTq3E/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 10,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "aXfb6wvTq3E"
                    }
                },
                "contentDetails": {
                    "videoId": "aXfb6wvTq3E",
                    "videoPublishedAt": "2019-05-09T04:23:42.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/AmDBaaduQIU8yH3SegOmM-31p3Q\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi5EMEEwRUY5M0RDRTU3NDJC",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:46.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 11: Content Presentation",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/UBogCtn6T3k/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/UBogCtn6T3k/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/UBogCtn6T3k/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 11,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "UBogCtn6T3k"
                    }
                },
                "contentDetails": {
                    "videoId": "UBogCtn6T3k",
                    "videoPublishedAt": "2019-05-09T04:23:49.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/UlHrWndcyLJJpLXYVV1CdY74vUk\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi45ODRDNTg0QjA4NkFBNkQy",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:51.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Elements 12 & 13: Assessment Tasks",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/pFEjSmWXuRw/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/pFEjSmWXuRw/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/pFEjSmWXuRw/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/pFEjSmWXuRw/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/pFEjSmWXuRw/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 12,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "pFEjSmWXuRw"
                    }
                },
                "contentDetails": {
                    "videoId": "pFEjSmWXuRw",
                    "videoPublishedAt": "2019-05-09T04:24:07.000Z"
                }
            },
            {
                "kind": "youtube#playlistItem",
                "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/YSRfdbEo_opwqrV_FBMfv6nNtY8\"",
                "id": "UExUX3hzY1RGbXpnckg0RDRCbklhNmRydV9pTFpSQ1lEUi4zMDg5MkQ5MEVDMEM1NTg2",
                "snippet": {
                    "publishedAt": "2019-05-09T04:32:58.000Z",
                    "channelId": "UCvbnXnENfydomXWyOOrs34Q",
                    "title": "Element 14: Style & Branding",
                    "description": "",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/k_xMR32so7Y/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/k_xMR32so7Y/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/k_xMR32so7Y/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        },
                        "standard": {
                            "url": "https://i.ytimg.com/vi/k_xMR32so7Y/sddefault.jpg",
                            "width": 640,
                            "height": 480
                        },
                        "maxres": {
                            "url": "https://i.ytimg.com/vi/k_xMR32so7Y/maxresdefault.jpg",
                            "width": 1280,
                            "height": 720
                        }
                    },
                    "channelTitle": "RMIT Studios",
                    "playlistId": "PLT_xscTFmzgrH4D4BnIa6dru_iLZRCYDR",
                    "position": 13,
                    "resourceId": {
                        "kind": "youtube#video",
                        "videoId": "k_xMR32so7Y"
                    }
                },
                "contentDetails": {
                    "videoId": "k_xMR32so7Y",
                    "videoPublishedAt": "2019-05-09T04:24:19.000Z"
                }
            }
        ],
        "channel": {
            "kind": "youtube#channelListResponse",
            "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/1gqK8VCdDy93xLWlZyifx-11J6Q\"",
            "pageInfo": {
                "totalResults": 1,
                "resultsPerPage": 1
            },
            "items": [
                {
                    "kind": "youtube#channel",
                    "etag": "\"Bdx4f4ps3xCOOo1WZ91nTLkRZ_c/Ts1jKYaKuYBvPC2bzrK7Lk9ttpg\"",
                    "id": "UCOSAPdTi4ICVPW8AUzoHUMg",
                    "snippet": {
                        "title": "Sam Malcolm",
                        "description": "I live long, I prosper. I dislike being told the odds. I talk about movies. I make stuff. I use very short abrupt sentences.",
                        "customUrl": "sammalcolmmedia",
                        "publishedAt": "2007-12-08T06:56:20.000Z",
                        "thumbnails": {
                            "default": {
                                "url": "https://yt3.ggpht.com/a/AGF-l7_-Ed_VqQxod1rpJfssBsmBw_IF8C_oLU0BkA=s88-mo-c-c0xffffffff-rj-k-no",
                                "width": 88,
                                "height": 88
                            },
                            "medium": {
                                "url": "https://yt3.ggpht.com/a/AGF-l7_-Ed_VqQxod1rpJfssBsmBw_IF8C_oLU0BkA=s240-mo-c-c0xffffffff-rj-k-no",
                                "width": 240,
                                "height": 240
                            },
                            "high": {
                                "url": "https://yt3.ggpht.com/a/AGF-l7_-Ed_VqQxod1rpJfssBsmBw_IF8C_oLU0BkA=s800-mo-c-c0xffffffff-rj-k-no",
                                "width": 800,
                                "height": 800
                            }
                        },
                        "localized": {
                            "title": "Sam Malcolm",
                            "description": "I live long, I prosper. I dislike being told the odds. I talk about movies. I make stuff. I use very short abrupt sentences."
                        },
                        "country": "AU"
                    }
                }
            ]
        }
    })
})

module.exports = router;
