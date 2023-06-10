import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";



// fetch all feed
export const fetchFeedsAction = createAsyncThunk("authSlice/fetch-feeds", async (payload = {}, thunkAPI)=>{
    try{
        const {userId, query} = payload
        let {status, data} = await apis.get("/feed" + (query ? query : "?") )
        if(status === 200){
            return {
                isTimeline: !userId,
                feeds: data,
                userId
            }
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})



// fetch  feed detail
export const fetchFeedDetailAction = createAsyncThunk("authSlice/fetch-feed-detail", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/feed/" +  payload)
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})


export const createFeedAction = createAsyncThunk("authSlice/createFeed", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/feed/create", payload)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})



export const deleteFeedAction = createAsyncThunk("authSlice/deleteFeed", async (payload, thunkAPI)=>{
    try{
        let {status} = await apis.delete("/feed/"+ payload)
        if(status === 201){
            return payload
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})



export const toggleLikeAction = createAsyncThunk("authSlice/toggleLikeAction", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/feed/toggle-like", payload)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})

export const addCommentAction = createAsyncThunk("authSlice/addComment", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/comments/create", payload)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})


export const getAllCommentsAction = createAsyncThunk("authSlice/fetchComment", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/comments/" +payload)
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})


export const deleteCommentAction = createAsyncThunk("authSlice/deleteComment", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.delete("/comments/" +payload)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})