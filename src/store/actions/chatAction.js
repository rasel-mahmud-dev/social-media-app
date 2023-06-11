import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";
import errorResponse from "src/utils/errorResponse.js";


// fetch chat action
export const fetchChatMessage = createAsyncThunk("fetch-chat-message", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("/message")
        if (status === 200) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch private message action
export const fetchPrivateMessageAction = createAsyncThunk("get-private-message", async (payload, thunkAPI) => {
    try {
        const {channelName} = payload
        let {status, data} = await apis.get("/message/" + channelName)
        if (status === 200) {
            return {channelName: channelName, messages: data.messages}
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// send private message action
export const sendPrivateMessageAction = createAsyncThunk("send-private-message", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("/message/send", payload)
        if (status === 201) {
            return {
                channelName: payload.channelName,
                message: data.message
            }
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


