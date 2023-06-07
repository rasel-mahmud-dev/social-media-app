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
    openChatUser: null,
    messages: [],
};

export const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        openChatUserAction(state, action){
            state.openChatUser = action.payload
        }
    },

    extraReducers: (builder) => {

    }
});

// Action creators are generated for each case reducer function
export const {openChatUserAction} = chatSlice.actions

export default chatSlice.reducer