import {createSlice} from '@reduxjs/toolkit';
import {
    createGroupAction,
    fetchGroupsAction,
    fetchPrivateMessageAction,
    sendPrivateMessageAction
} from "src/store/actions/chatAction.js";


const initialState = {
    auth: null,
    openHomeChatsSidebar: false,
    openChatUser: null,  // {...friend: {}, group: {}}
    groups: [],
    messages: {},  // { groupId: [] }
};

function addNewMessage(state, action) {
    const {groupId, message} = action.payload
    state.messages = {
        ...state.messages,
        [groupId]: [
            ...(state.messages[groupId] || []),
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
        closeChatUserAction(state) {
            state.openChatUser = null
        },

        getNewMessageAction(state, action) {
            addNewMessage(state, action)
        },
        toggleOpenHomeChatsSidebar(state) {
            state.openHomeChatsSidebar = !state.openHomeChatsSidebar
        }
    },

    extraReducers: (builder) => {

        builder.addCase(fetchPrivateMessageAction.fulfilled, (state, action) => {
            const {messages, groupId} = action.payload
            state.messages = {
                ...state.messages,
                [groupId]: messages || []
            }
        })

        builder.addCase(fetchGroupsAction.fulfilled, (state, action) => {
            // const {messages, channelName} = action.payload
            // state.messages = {
            //     ...state.messages,
            //     [channelName]: messages || []
            // }
            //
            // const {messages, channelName} = action.payload

            state.groups = action.payload.groups || []
        })

        builder.addCase(createGroupAction.fulfilled, (state, action) => {
            if(action.payload){
                state.groups.push(action.payload)
            }
        })


        // send private message
        builder.addCase(sendPrivateMessageAction.fulfilled, (state, action) => {
            addNewMessage(state, action)
        })
    }

});

// Action creators are generated for each case reducer function
export const {openChatUserAction, toggleOpenHomeChatsSidebar, closeChatUserAction, getNewMessageAction} = chatSlice.actions

export default chatSlice.reducer