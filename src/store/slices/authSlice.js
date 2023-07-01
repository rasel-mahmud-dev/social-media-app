import {createSlice} from '@reduxjs/toolkit';
import {fetchCurrentAuthAction, fetchProfileAction, loginOrRegistrationAction} from "../actions/authAction";
import {
    addFriendAction,
    confirmFriendRequestAction,
    fetchAuthFriendsAction, fetchProfileMediaAction,
    removeFriendAction, updateProfileAction
} from "src/store/actions/userAction.js";
import {getStoriesAction} from "src/store/actions/storyAction.js";
import {fetchMyGroupsAction} from "src/store/actions/groupAction.js";


const initialState = {
    auth: null,
    authLoaded: false,
    profile: null,
    friends: [],
    pendingFriends: [],
    stories: [],
    media: {},
    groups: []
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        // logout user action
        logoutAction(state) {
            state.auth = null
            state.authLoaded = true
            state.profile = null
            state.pendingFriends = []
            state.friends = []
            localStorage.removeItem("token")
        },

        removeFromPendingFriends(state, action) {
            state.pendingFriends = state.pendingFriends.filter(p => p._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginOrRegistrationAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.auth = action.payload
            }
            state.authLoaded = true
        })

        // handle rejection error
        builder.addCase(loginOrRegistrationAction.rejected, (state) => {
            state.auth = null
            state.authLoaded = true
        })


        // handle fetch current auth user
        builder.addCase(fetchCurrentAuthAction.fulfilled, (state, action) => {

            if (action.payload) {
                state.auth = action.payload
                state.authLoaded = true
            }
        })

        // handle rejection
        builder.addCase(fetchCurrentAuthAction.rejected, (state, action) => {
            state.auth = null
            state.authLoaded = true
        })


        // handle fetch current user bio data
        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.profile = action.payload
            }
        })

        // handle fetch current user friends
        builder.addCase(fetchAuthFriendsAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.friends = action.payload.friends
                state.pendingFriends = action.payload.pendingFriends
            }
        })

        // handle store all media user
        builder.addCase(fetchProfileMediaAction.fulfilled, (state, action) => {
            if (action.payload && action.payload.userId) {
                state.media[action.payload.userId] = action.payload.media
            }
        })

        // handle add friend request
        builder.addCase(addFriendAction.fulfilled, (state, action) => {
            if (action.payload) {
                // state.pendingFriends = [...state.pendingFriends, action.payload.friend]
            }
        })
        // handle accept friend request
        builder.addCase(confirmFriendRequestAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.friends = [...state.friends, action.payload.friend]
                state.pendingFriends = state.pendingFriends.filter(f => f._id !== action.payload.friendId)
            }
        })

        // // handle remove friend
        // builder.addCase(removeFriendAction.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.friends = state.friends.filter(f => f._id !== action.payload.friendId)
        //         state.pendingFriends = state.pendingFriends.filter(f => f._id !== action.payload.friendId)
        //     }
        // })

        // fetch all stories
        builder.addCase(getStoriesAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.stories = action.payload.stories
            }
        })

        // update profile
        builder.addCase(updateProfileAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.auth = {
                    ...state.auth,
                    ...action.payload
                }
            }
        })

        // fetch my groups
        builder.addCase(fetchMyGroupsAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.groups = action.payload
            }
        })
    }
});

// Action creators are generated for each case reducer function
export const {logoutAction} = authSlice.actions

export default authSlice.reducer