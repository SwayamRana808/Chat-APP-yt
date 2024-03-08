import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"] //when using certain values
    },
    profilePic:{
        type:String,
        default:""
    }
})
const User=mongoose.model("User",userSchema) //"User" ->U capatalise and mongoose will change it to "users" 
export default User;