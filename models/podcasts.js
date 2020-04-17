const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PodcastsSchema = new Schema({
	show: { type: String },
	title: { type: String },
	social_description: { type: String },
	author: { type: String },
	feature_image: { type: String },
	feature_image_alt: { type: String },
	feature_image_title: { type: String },
	pub_date: { type: String },
	episodes: { type: Array },
	itunes_keywords: { type: String },
	category: { type: String },
	subtitle: { type: String },
	copyright: { type: String },

});

const PodcastsModel = mongoose.model('podcasts', PodcastsSchema);
module.exports = PodcastsModel;




