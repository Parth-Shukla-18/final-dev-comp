import { createSlice } from '@reduxjs/toolkit';
// import { posts } from '../../../Backend/models/post';

const initialState = {
    myDisLikes:[],
    myLikes:[],
    myPosts:[],
    mySaved:[],
    otherUserPosts:[],
    posts:[],
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // create post  
        // createPost:(state , action ) =>{
        //     const { userName } = action.payload; 
        //     state.posts.push({
        //         user: userName, 
        //         title:action.payload.title, 
        //         description:action.payload.description || "", 
        //         codeType:action.payload.codeType, 
        //         html: action.payload.html || "",
        //         css: action.payload.css || "",
        //         js: action.payload.js || "",
        //         react: action.payload.react ||"",
        //         likes:0, 
        //         disLikes:0, 
        //     })
        // },
        createPost: (state , action) => {
            state.myPosts.push(action.payload);
        },

        likePost: (state, action) => {
            const { postId , apply } = action.payload;
            const post = state.posts.find(post => post._id === postId);
            if(!post){
                post = state.myPosts.find(post => post._id === postId);
            }
            if( post && apply === true ) {
                post.likes += 1;
            }
            else if( post && apply === false ){
                post.likes -= 1; 
                
            }
            
        },

        dislikePost: (state, action) => {
            const { postId , apply } = action.payload;
            const post = state.posts.find(post => post._id === postId);
            if(!post){
                post = state.myPosts.find(post => post._id === postId);                
            }
            if (apply === true ) {
                post.disLikes += 1;
            }
            else if( post && apply == false ){
                post.disLikes -= 1; 
            }
        },
    }
});

// createPost,
export const {  likePost, dislikePost } = postSlice.actions;
export default postSlice.reducer;