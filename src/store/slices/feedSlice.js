import { createSlice } from '@reduxjs/toolkit';
import {fetchFeedsAction, toggleLikeAction} from "src/store/actions/feedAction.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";


const initialState = {
    feeds: [],
    peoples: []
};

export const feedSlice = createSlice({
    name: 'feedSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder)=>{

        // fetch all feeds
        builder.addCase(fetchFeedsAction.fulfilled, (state, action) => {
            state.feeds = action.payload
        })

        // fetch all feeds
        builder.addCase(fetchPeoplesAction.fulfilled, (state, action) => {
            state.peoples = action.payload
        })

        //toggle like
        builder.addCase(toggleLikeAction.fulfilled, (state, action) => {
            // state.peoples = action.payload
            console.log(action.payload)
        })

    }
});

// Action creators are generated for each case reducer function
// export const {  } = feedSlice.actions

export default feedSlice.reducer