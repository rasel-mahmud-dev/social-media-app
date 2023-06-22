import {createSlice} from '@reduxjs/toolkit';
import {
    createRoomAction,
    fetchRoomsAction,
    fetchPrivateMessageAction,
    getChatRoomMessagesAction,
    sendPrivateMessageAction
} from "src/store/actions/chatAction.js";


const initialState = {
    auth: null,
    openHomeChatsSidebar: false,
    openChatUser: null,  // {...friend: {}, room: {}}
    rooms: [],
    messages: {},           // { [roomId: string]: [] }
    messagePaginate: {}     // { [roomId: string]: { perPage: number, pageNumber: number, totalItem?: number }
};

function addNewMessage(state, action) {
    if (!(action.payload && action.payload.roomId)) return;
    const {roomId} = action.payload

    state.messages = {
        ...state.messages,
        [roomId]: [
            ...(state.messages[roomId] || []),
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
            const {messages, roomId} = action.payload
            state.messages = {
                ...state.messages,
                [roomId]: messages || []
            }
        })

        builder.addCase(fetchRoomsAction.fulfilled, (state, action) => {
            // const {messages, channelName} = action.payload
            // state.messages = {
            //     ...state.messages,
            //     [channelName]: messages || []
            // }
            //
            // const {messages, channelName} = action.payload

            state.rooms = action.payload.rooms || []
        })

        builder.addCase(createRoomAction.fulfilled, (state, action) => {
            if (action.payload) {
                state.rooms.push(action.payload)
            }
        })


        // send private message
        builder.addCase(sendPrivateMessageAction.fulfilled, (state, action) => {
            addNewMessage(state, action)
        })

        // get room message for detail chat like messenger or quick popup chat.
        builder.addCase(getChatRoomMessagesAction.fulfilled, (state, action) => {
            // addNewMessage(state, action)

            const {roomId, messages, perPage, pageNumber} = action.payload

            if(!roomId) return;

            if (messages && messages.length > 0) {
                let paginateState = state.messagePaginate[roomId]
                if (paginateState) {
                    paginateState.pageNumber = pageNumber ? pageNumber : 1
                    paginateState.perPage = perPage ? perPage : 10
                } else {
                    state.messagePaginate[roomId] = {
                        pageNumber: pageNumber ? pageNumber : 1,
                        perPage: perPage ? perPage : 10
                    }
                }

                if(state.messages[roomId] && state.messages[roomId].length > 0) return;

                state.messages = {
                    [roomId]: [
                        ...messages,
                        ...(state.messages[roomId] || []),
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