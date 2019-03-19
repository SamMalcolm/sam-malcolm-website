const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const Blog = new Schema({
    title: { type: String },
    content: { type: String },
    date: { type: Date, default: Date.now },
    author: { type: String, default: "Sam Malcolm" },
    feature_image: { type: String },
    social_description: { type: String },
    social_title: { type: String }
});

module.exports = Blog;