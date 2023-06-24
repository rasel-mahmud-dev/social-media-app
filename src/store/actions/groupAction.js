import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";
import errorResponse from "src/utils/errorResponse.js";


// fetch groups action
export const fetchMyGroupsAction = createAsyncThunk("fetch-my-groups", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("/groups")
        if (status === 200) {
            return data?.groups ?? []
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})



// create group action
export const createGroupAction = createAsyncThunk("create-group", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("groups/create", payload)
        if (status === 201) {
            return data.group
        }
    } catch (ex) {
        // send an error message with a reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})



// fetch group detail  action
export const fetchGroupDetailAction = createAsyncThunk("fetch-chat-room", async (groupId, thunkAPI) => {
    try {
        let {status, data} = await apis.get("groups/" + groupId)
        if (status === 200) {
            return data?.group
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})



// fetch group detail  action
export const addGroupInvitePeopleAction = createAsyncThunk("group-invitation", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("groups/invitation", payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})