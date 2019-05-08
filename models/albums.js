const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
	name: { type: String },
	year: { type: String },
	description: { type: String },
	artwork: { type: String },
	spotify_link: { type: String },
	songs: { type: Array },
});

module.exports = mongoose.model('albums', AlbumSchema);;