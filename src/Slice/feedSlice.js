import { createSlice } from "@reduxjs/toolkit";




const feedSlice = createSlice({
    name : "feedSlice",
    initialState: [],
    reducers : {
        addFeed: (state, action) =>  {
            return action.payload;
        },
        removeFeed: (state, action) => {
            return null;
        },
        removeUserFromFeed: (state, action) => {
            const userIdToRemove = action.payload;
            return state.filter(user => user._id !== userIdToRemove);
        }
    }
});

export const { addFeed, removeFeed, removeUserFromFeed } = feedSlice.actions

export default feedSlice.reducer;


