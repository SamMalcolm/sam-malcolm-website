var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log("In admin router");
    res.render('index', { title: 'Express' });
});

router.get('/work', () => {
    // add work to db form
})

router.post('/work', () => {
    // add work to db
})

router.get('/blog', () => {
    // add work to db form
})

router.post('/blog', () => {
    // add work to db
})


module.exports = router;
