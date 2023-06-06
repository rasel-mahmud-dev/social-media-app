
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



export const fetchAuthFiendsAction = createAsyncThunk("authSlice/fetchAuthFriends", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/users/friends")
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})




export const addFriendAction = createAsyncThunk("authSlice/add-friend", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/users/add-friend", {friendId: payload})
        console.log(data)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})





export const removeFriendAction = createAsyncThunk("authSlice/remove-friend", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/remove-friend", {friendId: payload})
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})




