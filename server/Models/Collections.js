import mongoose from "mongoose";
const Schema = mongoose.Schema;


const collectionsSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    collectionName:{
        type:String,
        required:true
    },
    photoURL:{
        type:String,
        required:true
    },
    links:{
        type:Array,
        required:true
    }
});

export default mongoose.model('Collections', collectionsSchema);