const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const SnookerSchema = new Schema({
	year: { type: String },
	compname: { type: String },
	handicap: { type: Object },
	ladder: { type: Object },
	winLoss: { type: Object }
});

const snookerModel = mongoose.model('snooker', SnookerSchema, 'snooker');
module.exports = snookerModel;