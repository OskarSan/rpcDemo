"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const Topic_1 = require("../models/Topic");
const Post_1 = require("../models/Post");
const router = (0, express_1.Router)();
const fetchWikipediaArticle = async (keyword) => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`;
    try {
        const res = await axios_1.default.get(url);
        console.log(res.data.extract);
        return res.data.extract;
    }
    catch (error) {
        return 'Wikipedia article not found';
    }
};
router.post('/save', async (req, res) => {
    const { topicName, postName, text, wikipediaArticle, timestamp } = req.body;
    try {
        let topic = await Topic_1.Topic.findOne({ name: topicName });
        if (!topic) {
            topic = new Topic_1.Topic({ name: topicName, posts: [] });
        }
        const articleSum = await fetchWikipediaArticle(wikipediaArticle);
        const post = new Post_1.Post({ name: postName, text, timestamp, wikipediaArticle: articleSum });
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
