import mongoose from "mongoose";
import Joi from 'joi'

const Article=mongoose.model('article',new mongoose.Schema({
    Heading:{
        type: String,
        required: true
    },
    read_time:{
      type:String,
      required:true
    },
    categories:{
        type:String,
        required:true
    },
    description:{
        default:"ok",
        type:String,
        required:true
    },
    thumbnail_image:{
        type:String,
        required:true
    },
    featured_image:{
        type: String,
        required:true
    },
}));


export default Article;

