const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type: String ,
        required:true
    }
}, {timestapms:true});

const User = mongoose.model('user',UserSchema);

module.exports = User