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
        updateLocalFeedAction(state, action){
            const {feedId, updated} = action.payload
            let updatedFeeds = [...state.feeds]
            let index = updatedFeeds.findIndex(f=>f._id === feedId)
            if(index !== -1){
                updatedFeeds[index] = {
                    ...updatedFeeds[index],
                    ...updated
                }
            }
            state.feeds = updatedFeeds
        },


        // dispatch this when send friend request
        removePeople(state, action){
            state.peoples = state.peoples.filter(p=>p._id !== action.payload)
        },

        // dispatch this when make unfriend
        addPeople(state, action){
            let updatePeoples = [...state.peoples]
            let index = updatePeoples.findIndex(p=>p._id === action.payload._id)
            if(index !== -1){
                updatePeoples[index] = {
                    ...updatePeoples[index],
                    ...action.payload
                }
            }
        }
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
export const {  removePeople, addPeople, updateLocalFeedAction } = feedSlice.actions

export default feedSlice.reducer