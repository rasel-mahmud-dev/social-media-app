import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";



// fetch all feed
export const fetchFeedsAction = createAsyncThunk("authSlice/updateBiodata", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/feed", payload)
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
        console.log(data)
        if(status === 201){
            return data
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