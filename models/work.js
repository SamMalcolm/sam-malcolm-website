const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Work = new Schema({
    title: { type: String },
    description: { type: String },
    date: { type: Date, default: Date.now },
    feature_image: { type: String },
    social_description: { type: String },
    social_title: { type: String }
});

module.exports = Work;