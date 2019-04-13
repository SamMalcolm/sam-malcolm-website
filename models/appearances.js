const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const AppearanceSchema = new Schema({
	date: { type: Date },
	name: { type: String },
	event: { type: String },
	tickets: { type: String },
	location: { type: String },
	info: { type: String },
	photos: { type: String }
});

const appearanceModel = mongoose.model('appearances', AppearanceSchema);
module.exports = appearanceModel;