exports.isAuthenticated = (req, res, next) => {
	if (req.session && req.session.loggedin && req.session.user) {
		return next();
	} else {
		// req.session.redirectTo = req.originalUrl;
		res.redirect('/admin/login');
	}
}