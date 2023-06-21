import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";
import errorResponse from "src/utils/errorResponse.js";


// fetch all feed
export const fetchFeedsAction = createAsyncThunk("feedState/fetch-feeds", async (payload = {}, thunkAPI) => {
    try {
        const {userId, query, pageNumber = 1} = payload
        let {status, data} = await apis.get("/feed" + (query ? query : "?"))
        if (status === 200) {
            return {
                isTimeline: !userId,
                feeds: data,
                userId,
                pageNumber
            }
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


// fetch  feed detail
export const fetchFeedDetailAction = createAsyncThunk("feedState/fetch-feed-detail", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("/feed/" + payload)
        if (status === 200) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const createFeedAction = createAsyncThunk("feedState/createFeed", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("/feed/create", payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const deleteFeedAction = createAsyncThunk("feedState/deleteFeed", async (payload, thunkAPI) => {
    try {
        let {status} = await apis.delete("/feed/" + payload)
        if (status === 201) {
            return payload
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const toggleLikeAction = createAsyncThunk("feedState/toggleLikeAction", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("/feed/toggle-like", payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

export const addCommentAction = createAsyncThunk("feedState/addComment", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.post("/comments/create", payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const getAllCommentsAction = createAsyncThunk("feedState/fetchComment", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("/comments/" + payload)
        if (status === 200) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})


export const deleteCommentAction = createAsyncThunk("feedState/deleteComment", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.delete("/comments/" + payload)
        if (status === 201) {
            return data
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})