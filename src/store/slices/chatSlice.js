import {createSlice} from '@reduxjs/toolkit';
import {fetchPrivateMessageAction, sendPrivateMessageAction} from "src/store/actions/chatAction.js";


const initialState = {
    auth: null,
    openChatUser: null,
    messages: {},  // { 23423432sdfhJKHdsf_sdfhsdkf: [] }
};

function addNewMessage(state, action) {
    const {channelName, message} = action.payload
    state.messages = {
        ...state.messages,
        [channelName]: [
            ...(state.messages[channelName] || []),
            message
        ]
    }
}

export const chatSlice = createSlice({
    name: 'chatSlice',
    initialState,
    reducers: {
        openChatUserAction(state, action) {
            state.openChatUser = action.payload
        },

        getNewMessageAction(state, action) {
            addNewMessage(state, action)
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchPrivateMessageAction.fulfilled, (state, action) => {
            const {messages, channelName} = action.payload
            state.messages = {
                ...state.messages,
                [channelName]: messages || []
            }
        })


        // send private message
        builder.addCase(sendPrivateMessageAction.fulfilled, (state, action) => {
            addNewMessage(state, action)
        })
    }

});

// Action creators are generated for each case reducer function
export const {openChatUserAction, getNewMessageAction} = chatSlice.actions

export default chatSlice.reducer