import mongoose from "mongoose";

// here we created user schema to store user crendital and also provide its type and required
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    },
})

const User=mongoose.model("User",userSchema);
export default User;