import {createSlice} from '@reduxjs/toolkit';
import {fetchCurrentAuthAction, fetchProfileAction, loginOrRegistrationAction} from "../actions/authAction";
import {
    addFriendAction,
    confirmFriendRequestAction,
    fetchAuthFriendsAction,
    removeFriendAction
} from "src/store/actions/userAction.js";


const initialState = {
    auth: null,
    authLoaded: false,
    profile: null,
    friends: [],
    pendingFriends: []
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
                let {fullName, firstName, lastName, email, role, avatar} = action.payload
                state.auth = {
                    fullName, firstName, lastName, email, role, avatar
                }
                state.authLoaded = true
            }
            // state.entities.push(action.payload)
        })

        // handle rejection error
        builder.addCase(loginOrRegistrationAction.rejected, (state, action) => {
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

        // handle add friend request
        builder.addCase(addFriendAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.pendingFriends = [...state.pendingFriends, action.payload.friend]
            }
        })
        // handle accept friend request
        builder.addCase(confirmFriendRequestAction.fulfilled, (state, action) => {
            if (action.payload) {
                console.log(action.payload)
                state.friends = [...state.friends, action.payload.friend]
                state.pendingFriends = state.pendingFriends.filter(f => f._id !== action.payload.friendId)
            }
        })

        // handle remove friend
        builder.addCase(removeFriendAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.friends = state.friends.filter(f => f._id !== action.payload.friendId)
                state.pendingFriends = state.pendingFriends.filter(f => f._id !== action.payload.friendId)
            }
        })
    }
});

// Action creators are generated for each case reducer function
export const {logoutAction} = authSlice.actions

export default authSlice.reducer