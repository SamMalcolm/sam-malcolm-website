var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const UserModel = require('../models/users');
const util = require('../util/util');
const formidable = require('formidable')

/* GET home page. */
router.get('/login', function (req, res, next) {
    console.log("In admin router");
    res.render('adminlogin', { title: 'Express' });
});

router.get(['/', '/manage/blog', '/manage/work', '/manage/playlists'], util.isAuthenticated, function (req, res, next) {
    console.log("In admin router");
    res.render('admin', { title: 'Express' });
});

router.get('/session', function (req, res, next) {
    console.log("In admin router");
    console.log(req.session);
    res.send(200);
});

router.post('/login', function (req, res, next) {
    if (req.body.username) {
        let username = req.body.username;
        let password = req.body.password;
        UserModel.findOne({ "username": username }).then((doc) => {
            bcrypt.compare(password, doc.passwordhash, function (err, response) {
                if (response) {
                    req.session.loggedin = true;
                    req.session.user = doc;
                    res.redirect('/admin');
                }
            });
        })
    }
});

router.get('/work', () => {
    // add work to db form
})

router.post('/work', () => {
    // add work to db
})

router.delete('/work/:work_id', () => {
    // delete blog
})

router.put('/work/:work_id', () => {
    // update blog
})

router.get('/blog', () => {
    // add blog to db form
})

router.post('/blog', () => {
    // add blog to db
})

router.delete('/blog/:blog_id', () => {
    // delete blog
})

router.put('/blog/:blog_id', () => {
    // update blog
})


module.exports = router;
