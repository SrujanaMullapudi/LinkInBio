import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId:{
        type: String,
        // required: true
    },
    links : {
        type : Array,
        // required: true
    },

});

export default mongoose.model('Users',userSchema);