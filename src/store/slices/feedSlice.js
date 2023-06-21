import {createSlice} from '@reduxjs/toolkit';
import {
    createFeedAction,
    deleteFeedAction,
    fetchFeedsAction,
    getAllCommentsAction
} from "src/store/actions/feedAction.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";


const initialState = {
    feeds: [],
    feedPageNumber: 1,
    peoples: [],
    userFeeds: {}
};

export const feedSlice = createSlice({
    name: 'feedSlice',
    initialState,
    reducers: {
        updateLocalFeedAction(state, action) {
            const {feedId, updated} = action.payload
            let updatedFeeds = [...state.feeds]
            let index = updatedFeeds.findIndex(f => f._id === feedId)
            if (index !== -1) {
                updatedFeeds[index] = {
                    ...updatedFeeds[index],
                    ...updated
                }
            }
            state.feeds = updatedFeeds
        },


        // dispatch this when send friend request
        removePeople(state, action) {
            state.peoples = state.peoples.filter(p => p._id !== action.payload)
        },

        // dispatch this when make unfriend
        addPeople(state, action) {
            let updatePeoples = [...state.peoples]
            let index = updatePeoples.findIndex(p => p._id === action.payload._id)
            if (index !== -1) {
                updatePeoples[index] = {
                    ...updatePeoples[index],
                    ...action.payload
                }
            }
        },

        // dispatch this when make unfriend
        localToggleFeedReactionAction(state, action) {
            const {feedId, _id} = action.payload
            let updateFeeds = [...state.feeds]
            let index = updateFeeds.findIndex(p => p._id === feedId)
            if (index !== -1) {
                let updateLikes = updateFeeds[index]?.likes || []
                let isExistLike = updateLikes.findIndex(like => like._id === _id)
                if (isExistLike !== -1) {
                    updateLikes.splice(isExistLike, 1)
                } else {
                    updateLikes.push(action.payload)
                }
            }
            state.feeds = updateFeeds
            return state
        },

        // dispatch this when add new post
        addLocalFeedAction(state, action) {
            state.feeds = [action.payload, ...state.feeds]
        },


        // dispatch this when delete feed
        removeLocalFeedAction(state, action) {
            console.log(action.payload)
            state.feeds = state.feeds.filter(f => f._id !== action.payload._id)
        }
    },

    extraReducers: (builder) => {

        // fetch all feeds
        builder.addCase(fetchFeedsAction.fulfilled, (state, action) => {
            const {isTimeline, feeds, userId, pageNumber} = action.payload

            // if no feed return
            if(feeds.length === 0) return;

            if (isTimeline) {
                if(pageNumber > 1){
                    state.feeds = [...state.feeds, ...feeds]
                } else {
                    state.feeds = feeds
                }
                state.feedPageNumber = pageNumber
            } else {
                state.userFeeds[userId] = feeds
            }
        })

        // fetch all feeds
        builder.addCase(fetchPeoplesAction.fulfilled, (state, action) => {
            state.peoples = action.payload
        })

        // create feed
        builder.addCase(createFeedAction.fulfilled, (state, action) => {
            state.feeds = [action.payload.feed, ...state.feeds]
        })

        // delete feed
        builder.addCase(deleteFeedAction.fulfilled, (state, action) => {
            state.feeds = state.feeds.filter(f => f._id !== action.payload)
        })

        //toggle like
        // builder.addCase(toggleLikeAction.fulfilled, (state, action) => {
        //     // state.peoples = action.payload
        //     console.log(action.payload)
        // })

        //add comment
        // builder.addCase(addCommentAction.fulfilled, (state, action) => {
        //     // state.peoples = action.payload
        //     console.log(action.payload)
        // })

        //get all comments
        builder.addCase(getAllCommentsAction.fulfilled, (state, action) => {
            // state.peoples = action.payload
            console.log(action.payload)
        })
    }
});

// Action creators are generated for each case reducer function
export const {
    addLocalFeedAction,
    localToggleFeedReactionAction,
    removeLocalFeedAction,
    removePeople,
    addPeople,
    updateLocalFeedAction
} = feedSlice.actions

export default feedSlice.reducer