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
export const fetchGroupDetailAction = createAsyncThunk("fetch-chat-room", async (groupSlug, thunkAPI) => {
    try {
        let {status, data} = await apis.get("groups/" + groupSlug)
        if (status === 200) {
            return data
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


// accept group join group invitation action
export const acceptJoinGroupInvitationAction = createAsyncThunk("accept-group-invitation", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("groups/invitation-accepted", payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


//  group feeds action
export const fetchGroupFeedAction = createAsyncThunk("accept-group-invitation", async (payload, thunkAPI) => {
    try {
        const {query} = payload
        let {status, data} = await apis.get("/groups/feeds" + query)
        if (status === 200) {
            return data?.feeds || []
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


//  group feeds action
export const fetchMyGroupFeedsAction = createAsyncThunk("fetch-groups", async (payload, thunkAPI) => {
    try {
        const {query} = payload
        let {status, data} = await apis.get("/groups/my-feeds" + query)
        if (status === 200) {
            return data || []
        }
    } catch (ex) {
        // send an error message with a reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch group members action
export const fetchGroupMembersAction = createAsyncThunk("accept-group-invitation", async (payload, thunkAPI) => {
    try {
        const {
            groupId,
            // perPage = 10,
            pageNumber = 1,
            orderBy = "createdAt",
            orderDirection = "desc",
        } = payload

        if (!groupId) return thunkAPI.rejectWithValue("Please provide group id")

        let queryParams = `?groupId=${groupId}&pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
        let {status, data} = await apis.get("/groups/members" + queryParams)
        if (status === 200) {
            return data?.members || []
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})
