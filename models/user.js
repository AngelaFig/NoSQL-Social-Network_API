const mongoose = require('mongoose');
//const {Schema, model, Types} 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        trimmed: true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,'Must use a vaild email address'],
    },
    thoughts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'thought',
        }
    ],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        }
    ]
},{
    toJSON:{
        getters:true,
        virtuals:true,
    }
});

userSchema.virtual('friendCount').get(function (){
    return this.friends.length
});

const User = mongoose.model('user',userSchema);

module.exports = User;