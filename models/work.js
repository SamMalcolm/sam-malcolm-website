const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const WorkSchema = new Schema({
    title: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    feature_image: { type: String },
    social_description: { type: String },
    social_title: { type: String }
});
const WorkModel = mongoose.model('works', WorkSchema);
module.exports = WorkModel;
