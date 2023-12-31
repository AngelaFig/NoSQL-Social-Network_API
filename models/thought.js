const mongoose = require('mongoose');
const reactionSchema= require('./reaction') 
const format = require('../utils/helpers')

const thoughtSchema = new mongoose.Schema({
    thoughtText:{
        type:String,
        required:true,
        minlength: 1,
        maxlength:280

    },
    createdAt:{
        type:Date,
        default:Date.now,
        get:timeStamp =>format(timeStamp)
     
    },
    username:{
        type:String,
        required:true,
    },
    reactions:[
       reactionSchema,
    ]
},{
    toJSON:{
        getters:true,
        virtuals:true,
    }
});

thoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
});

const Thought = mongoose.model('thought',thoughtSchema);

module.exports = Thought;