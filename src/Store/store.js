import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/userSlice';
import feedReducer from '../Slice/feedSlice';
export const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
    },
})
