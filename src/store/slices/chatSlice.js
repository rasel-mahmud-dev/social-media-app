import {createSlice} from '@reduxjs/toolkit';
import {
    createGroupAction,
    fetchGroupsAction,
    fetchPrivateMessageAction,
    getChatGroupMessagesAction,
    sendPrivateMessageAction
} from "src/store/actions/chatAction.js";


const initialState = {
    auth: null,
    openHomeChatsSidebar: false,
    openChatUser: null,  // {...friend: {}, group: {}}
    groups: [],
    messages: {},           // { [groupId: string]: [] }
    messagePaginate: {}     // { [groupId: string]: { perPage: number, pageNumber: number, totalItem?: number }
};

function addNewMessage(state, action) {
    if (!(action.payload && action.payload.groupId)) return;
    const {groupId} = action.payload

    state.messages = {
        ...state.messages,
        [groupId]: [
            ...(state.messages[groupId] || []),
            action.payload
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
            if (action.payload) {
                state.groups.push(action.payload)
            }
        })


        // send private message
        builder.addCase(sendPrivateMessageAction.fulfilled, (state, action) => {
            addNewMessage(state, action)
        })

        // get group message for detail chat like messenger or quick popup chat.
        builder.addCase(getChatGroupMessagesAction.fulfilled, (state, action) => {
            // addNewMessage(state, action)

            const {groupId, messages, perPage, pageNumber} = action.payload

            if(!groupId) return;

            if (messages && messages.length > 0) {
                let paginateState = state.messagePaginate[groupId]
                if (paginateState) {
                    paginateState.pageNumber = pageNumber ? pageNumber : 1
                    paginateState.perPage = perPage ? perPage : 10
                } else {
                    state.messagePaginate[groupId] = {
                        pageNumber: pageNumber ? pageNumber : 1,
                        perPage: perPage ? perPage : 10
                    }
                }


                state.messages = {
                    [groupId]: [
                        ...messages,
                        ...(state.messages[groupId] || []),
                    ]
                }
            }

        })
    }

});

// Action creators are generated for each case reducer function
export const {
    openChatUserAction,
    toggleOpenHomeChatsSidebar,
    closeChatUserAction,
    getNewMessageAction
} = chatSlice.actions

export default chatSlice.reducer