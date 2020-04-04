exports.nodemailer_transport = {
	"host": "smtp.gmail.com",
	"secure": false,
	"port": 587,
	"auth": {
		"user": "sam.malcolm.media@gmail.com",
		"pass": process.env.SMTP_PASS
	}
}