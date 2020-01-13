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
