const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
	channel: { type: Object },
	item: { type: Object },
	title: { type: String },
	author: { type: String },
	social_description: { type: String },
	ytid: { type: String },
	date: { type: Date, default: new Date() }
});

module.exports = mongoose.model('tutorials', TutorialSchema, 'tutorials');;