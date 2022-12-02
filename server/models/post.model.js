const mongoose = require("mongoose");

const EsquemaPost = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [5, "Title must be at least 5 characters"]
    },
    content: {
        type: String, 
        required: [true, "Content is required"],
        minLength: [5, "Content must be at least 5 characters"]
    },
    quotes: {
        type: Boolean,
        default: false
    },
    phrases: {
        type: Boolean,
        default: false
    },
    poems: {
        type: Boolean,
        default: false
    }
}, {timestamps: true, versionKey:false})
//timestamps: true  createdAt  updatedAt
//versionKey: false  _v

const Post = mongoose.model("posts", EsquemaPost);
module.exports = Post;
