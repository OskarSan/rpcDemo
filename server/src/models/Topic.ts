import mongoose, {Document, Schema} from "mongoose";
import {IPost} from "./Post";

interface ITopic extends Document {
    name: string;
    posts: IPost[];
}

const TopicSchema: Schema = new Schema({
    name: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

const Topic: mongoose.Model<ITopic> = mongoose.model<ITopic>('Topic', TopicSchema);


export {Topic, ITopic};
