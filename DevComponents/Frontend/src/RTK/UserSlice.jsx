import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allUsers: [],  // only fullName , collageName ,selfDescription , "userName" , profileImg 
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addField: (state, action) => {
            Object.keys(action.payload).forEach((key) => {
                state[key] = action.payload[key];
            });
        },
        deleteProfile: (state) => {
            state = null;
        },
        addLike: (state, action) => {
            const postId = action.payload.postId;
            if (state && !state.likes.includes(postId)) {
                state.likes.push(postId);
            }
        },
        removeLike: (state, action) => {
            if (state) {
                state.likes = state.likes.filter(postId => postId !== action.payload.postId);
            }
        },
        addDisLike: (state, action) => {
            const postId = action.payload.postId;
            if (state && !state.disLikes.includes(postId)) {
                state.disLikes.push(postId);
            }
        },
        removeDisLike: (state, action) => {
            if (state) {
                state.disLikes = state.disLikes.filter(postId => postId !== action.payload.postId);
            }
        },
        addSaved: (state, action) => {
            const postId = action.payload.postId;
            if (state && !state.saved.includes(postId)) {
                state.saved.push(postId);
            }
        },
        removeSaved: (state, action) => {
            if (state) {
                state.saved = state.saved.filter(postId => postId !== action.payload.postId);
            }
        },
    }
});



export default userSlice.reducer;

// const hi = {fullName: '',
//     userName: '',
//     collageName: '',
//     password: '',
//     email: '',
//     selfDescription: '',
//     likes: [],
//     disLikes: [],
//     saved: [],
// }