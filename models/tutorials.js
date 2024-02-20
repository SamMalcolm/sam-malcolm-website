const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
	channel: { type: Object },
	items: { type: Object },
	title: { type: String },
	author: { type: String },
	feature_image: { type: String },
	social_description: { type: String },
	ytid: { type: String },
	active: { type: Boolean },
	date: { type: Date, default: new Date() }
});

module.exports = mongoose.model('tutorials', TutorialSchema, 'tutorials');;