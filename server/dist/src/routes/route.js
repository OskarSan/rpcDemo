"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Topic_1 = require("../models/Topic");
const Post_1 = require("../models/Post");
const router = (0, express_1.Router)();
router.post('/save', async (req, res) => {
    const { topicName, postName, text, wikipediaArticle, timestamp } = req.body;
    try {
        let topic = await Topic_1.Topic.findOne({ name: topicName });
        if (!topic) {
            topic = new Topic_1.Topic({ name: topicName, posts: [] });
        }
        const post = new Post_1.Post({ name: postName, text, timestamp, wikipediaArticle });
        const savedPost = await post.save();
        topic.posts.push(savedPost._id);
        await topic.save();
        res.status(201).json({ message: 'Post saved successfully' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/get', async (req, res) => {
    try {
        const topics = await Topic_1.Topic.find().populate('posts');
        res.status(200).json({ topics });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.default = router;
