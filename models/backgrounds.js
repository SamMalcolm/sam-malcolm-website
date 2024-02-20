const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BackgroundsSchema = new Schema({
	src: { type: String },
	highlight: { type: String },
	active: { type: Number },
	position: { type: String },
});

const BackgroundsModel = mongoose.model('backgrounds', BackgroundsSchema);
module.exports = BackgroundsModel;
