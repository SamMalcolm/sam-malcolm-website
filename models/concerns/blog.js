const mongoose = require('mongoose');
const blogModel = require('../blog');

exports.fetchAllBlogPosts = () => {
    blogModel.find({}, (res) => {
        return res;
    })
}

exports.fetchBlogPostByID = (id) => {
    blogModel.findById(id, (res) => {
        return res;
    })
}

