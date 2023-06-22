import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";
import errorResponse from "src/utils/errorResponse.js";


// fetch rooms action
export const fetchRoomsAction = createAsyncThunk("fetch-chat-rooms", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("chat/rooms")
        if (status === 200) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch room by roomId action
export const fetchRoomByIdAction = createAsyncThunk("fetch-chat-room", async (roomId, thunkAPI) => {
    try {
        let {status, data} = await apis.get("chat/room/" + roomId)
        if (status === 200) {
            return data?.room
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch rooms action
export const createRoomAction = createAsyncThunk("create-room", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("chat/room", payload)
        if (status === 201) {
            return data.room
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch chat action
export const fetchChatMessage = createAsyncThunk("fetch-chat-message", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("chat")
        if (status === 200) {
            return data
        }
    } catch (ex) {
        // send an error message with a reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// get room message for detail chat like messenger or quick popup chat.
export const getChatRoomMessagesAction = createAsyncThunk("/chatState/get-room-messages", async (payload, thunkAPI) => {
    try {

        const {
            roomId,
            perPage = 10,
            pageNumber = 1,
            orderBy = "createdAt",
            orderDirection = "desc",
        } = payload

        if (!roomId) return thunkAPI.rejectWithValue("Invalid chat room")

        let queryParams = `?roomId=${roomId}&perPage=${perPage}&pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`

        let {status, data} = await apis.get("chat/room/messages" + queryParams)
        if (status === 200) {
            return {
                messages: data.messages,
                roomId: roomId,
                perPage: perPage,
                pageNumber: pageNumber,
            }
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch private message action
export const fetchPrivateMessageAction = createAsyncThunk("get-room-messages", async (payload, thunkAPI) => {
    try {
        const {roomId} = payload
        let {status, data} = await apis.get("/chat/messages/" + roomId)
        if (status === 200) {
            return {roomId: roomId, messages: data.messages}
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// send private message action
export const sendPrivateMessageAction = createAsyncThunk("send-private-message", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("chat/send", payload)
        if (status === 201) {
            return data.message
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export class getChatRoomMessages {
}