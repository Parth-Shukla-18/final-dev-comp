import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice.jsx';
import filterArrayReducer from './AppDataSlice.jsx';
import postReducer from './PostSlice.jsx'
import currentUser from './CurrentUser.jsx'
import { postApi } from './PostApi.jsx';
// import { userApi } from './UserApi.jsx';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
    reducer: {
        // users: userReducer,
        // appData: filterArrayReducer,
        // posts:postReducer,
        // currentUser:currentUser,
        [postApi.reducerPath]: postApi.reducer,
        // [userApi.reducerPath]: userApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postApi.middleware),  // userApi.middleware
});
setupListeners(store.dispatch)

export default store;