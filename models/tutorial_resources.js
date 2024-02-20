const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const VideoResourcesSchema = new Schema({
	video_id: { type: String },
	resources: { type: Object }
});

const VideoResourcesModel = mongoose.model('tutorial_resources', VideoResourcesSchema);
module.exports = VideoResourcesModel;
