const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'zeppelin1414';

bcrypt.genSalt(saltRounds, function (err, salt) {
	bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
		console.log(myPlaintextPassword);
		console.log(hash);

		bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
			console.log(res);
		});

	});
});

