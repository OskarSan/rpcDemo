import mongoose, {Document, Schema} from "mongoose";


interface IPost extends Document {
    name: string;
    text: string;
    timestamp: Date; 
}

const PostSchema: Schema = new Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    wikipediaArticle: {type: String, required: false},
    timestamp: {type: Date, required: true}
})


const Post: mongoose.Model<IPost> = mongoose.model<IPost>('Post', PostSchema);

export {Post, IPost};

