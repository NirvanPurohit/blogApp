import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        posts:postSlice,
        //TODO: add more slices here for posts
    }
});


export default store;