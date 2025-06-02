import mongoose from "mongoose";

// const appSchema = new mongoose.Schema({
//     filterArr: {
//         type: [String],
//         default: []
//     },
// });


const userSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        unique:true
    },
    fullName:{
        type:String,
        required:true
    },
    collegeName:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    selfDescription:{
        type:String,
    },
    profileImg: {
        type: String, // Cloudinary image URL
        default: '',  // optional default
      },
      bgImg: {
        type: String, // Background image URL
        default: '',  // optional default
      },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }],
    disLikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }],
    saved:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    }]
})

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    codeType:{
        type:Number,
    },
    html:{  
        type:String,
        default:null,
    },
    css:{
        type:String,
        default:null,
    },
    js:{
        type:String,
        default:null,
    },
    react:{
        type:String,
        default:null,
    },
    likes:{
        type:Number,
        default:0,
    },
    disLikes:{
        type:Number,
        default:0,
    },
    user:{
        type:String,
        // ref:"users"
    }

})

const users = mongoose.model('users' , userSchema);
const posts = mongoose.model('posts' , postSchema);
// const appdata = mongoose.model('appdata' , appSchema)

export{
    users,
    posts,
    // appdata,
}