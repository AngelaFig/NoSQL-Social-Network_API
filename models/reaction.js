const mongoose = require('mongoose');
const format = require('../utils/helpers')

const reactionSchema = new mongoose.Schema({
    reactionId:{
        type:Schema.Types.ObjectId,
        default:()=>new mongoose.Types.ObjectId()
    },
    reactionBody:{
        type:String,
        required:true,
        maxlength:280,
    },
    username:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        get:timeStamp => format(timeStamp),
    }
},{
    toJSON:{
        getters:true,
    }
}
);
module.exports= reactionSchema;