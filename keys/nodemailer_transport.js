let transport = {
	host: "smtp.gmail.com",
	secure: true,
	port: 465,
	auth: {
		user: 'sam.malcolm.media@gmail.com',
		pass: process.env.SMTP_PASS
	}
}

module.exports = transport;