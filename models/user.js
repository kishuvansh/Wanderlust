const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema =new Schema({
    email:{
        type:String,
        required:true,
       
    }
})
userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);
// userSchema.plugin(passportLocalMongoose);// it adds username and password fields and salts 
module.exports=mongoose.model('User',userSchema);
// this file is defining user schema 