import {Router, Request, Response} from 'express';
import axios from 'axios';
import {Topic, ITopic} from '../models/Topic';
import {Post, IPost} from '../models/Post';

const router = Router();

const fetchWikipediaArticle = async (keyword: string): Promise<string> => {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(keyword)}`;
    try {
        const res = await axios.get(url);
        console.log(res.data.extract);
        return res.data.extract;
    }catch(error: any){
        return 'Wikipedia article not found';
    }
}




router.post('/save', async (req: Request, res: Response) => {
    const {topicName, postName, text, wikipediaArticle, timestamp} = req.body;

    try {
        let topic = await Topic.findOne({name: topicName});
        if (!topic) {
            topic = new Topic({name: topicName, posts: []});
        }
        
      
        const articleSum = await fetchWikipediaArticle(wikipediaArticle);
     
        
        const post: IPost = new Post({name: postName, text, timestamp, wikipediaArticle: articleSum});
        const savedPost = await post.save();

        topic.posts.push(savedPost._id as unknown as IPost);
        await topic.save();
        res.status(201).json({message: 'Post saved successfully'});
    }catch(err: any){
        res.status(500).json({message: err.message});
    }
    
});

router.get('/get', async (req: Request, res: Response) => {
    try {
        const topics = await Topic.find().populate('posts');
        res.status(200).json({topics});
    }catch(err: any){
        res.status(500).json({message: err.message});
    }
});



export default router;