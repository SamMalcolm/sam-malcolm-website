var express = require('express');
var router = express.Router();
const blogModel = require('../models/blog');
const appearanceModel = require('../models/appearances');
/* GET home page. */
router.get('/work', function (req, res, next) {
    // responsd with works object
});

// Get blog posts
router.get('/blog', (req, res) => {
    blogModel.find({}, (err, docs) => {
        res.send(docs);
    })
});

// Post new blog post
router.post('/blog', (req, res) => {
    console.log(req.body);
    let blog = new blogModel({
        title: req.body.title,
        content: req.body.content,
        date: new Date(),
        author: req.body.author,
        social_description: req.body.social_description,
        feature_image: req.body.feature_image,
        social_title: req.body.title,
    });
    blog.save();
    res.json(blog);
});

// Delete record by ID
router.delete('/blog', (req, res) => {
    let blog = blogModel.deleteOne({ _id: req.body.id }, (err, resp) => {
        res.send(resp);
    })
})

// Get blog posts
router.get('/appearances', (req, res) => {
    appearanceModel.find({}, (err, docs) => {
        res.send(docs);
    })
});

// Post new blog post
router.post('/appearances', (req, res) => {
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
router.delete('/appearances', (req, res) => {
    let appearance = appearanceModel.deleteOne({ _id: req.body.id }, (err, resp) => {
        res.send(resp);
    })
})

module.exports = router;
