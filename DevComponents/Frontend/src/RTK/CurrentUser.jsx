import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    fullName: '',
    collegeName: '',
    password: '',
    email: '',
    selfDescription: '',
    likes: [],
    disLikes: [],
    saved: [],
}

const currentUser = createSlice({
    name:"currentUser",
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
})

export const {
    addField,
    deleteProfile,
    addLike,
    removeLike,
    addDisLike,
    removeDisLike,
    addSaved,
    removeSaved,
} = currentUser.actions;

export default currentUser.reducer;

const deletedReducers = {
    createProfile: (state, action) => {
        state.fullName = action.payload.fullName;
        state.userName = action.payload.userName;
        state.collegeName = action.payload.collegeName || '';
        state.password = action.payload.password;
        state.email = action.payload.email;
        state.selfDescription = action.payload.selfDescription || '';
        state.likes = [];
        state.disLikes = [];
        state.saved = [];
    },
}