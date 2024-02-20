const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String
	},
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	passwordhash: {
		type: String
	},
	admin: {
		type: Boolean
	}
});

const UserModel = mongoose.model('users', UserSchema, 'users');
module.exports = UserModel;