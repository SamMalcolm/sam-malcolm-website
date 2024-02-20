const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SocialsSchema = new Schema({
	service: { type: String },
	icon: { type: String },
	src: { type: String },
	active: { type: Boolean },
	color: { type: String },
	embed: { type: Boolean },
	dark_text: { type: Boolean }
});

const SocialsModel = mongoose.model('socials', SocialsSchema);
module.exports = SocialsModel;
