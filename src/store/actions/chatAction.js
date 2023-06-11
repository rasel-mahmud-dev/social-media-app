import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";
import errorResponse from "src/utils/errorResponse.js";


// fetch groups action
export const fetchGroupsAction = createAsyncThunk("fetch-chat-groups", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("chat/groups")
        if (status === 200) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch groups action
export const createGroupAction = createAsyncThunk("create-group", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("chat/group", payload)
        if (status === 201) {
            return data.group
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
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch private message action
export const fetchPrivateMessageAction = createAsyncThunk("get-group-messages", async (payload, thunkAPI) => {
    try {
        const {groupId} = payload
        let {status, data} = await apis.get("/chat/messages/" + groupId)
        if (status === 200) {
            return {groupId: groupId, messages: data.messages}
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
            return {
                groupId: payload.groupId,
                message: data.message
            }
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


