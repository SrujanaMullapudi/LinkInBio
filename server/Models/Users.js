import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId:{
        type: String,
        // required: true
    },
    userName:{
        type: String,
    },
    photoURL:{
        type: String,
    },
    links : {
        type : Array,
        // required: true
    },
    socialLinks : {
        type : Object,
    }
});

export default mongoose.model('Users',userSchema);