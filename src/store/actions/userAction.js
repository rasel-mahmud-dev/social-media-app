
// fetch
import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "src/apis/index.js";

export const fetchPeoplesAction = createAsyncThunk("authSlice/fetchPeoples", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/users", payload)
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})




