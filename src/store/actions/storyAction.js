import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "../../apis";



// fetch all feed
export const getStoriesAction = createAsyncThunk("fetch-stories", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/story", payload)
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})



// create story
export const createStoryAction = createAsyncThunk("add-story", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/story", payload)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})

