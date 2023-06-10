
// fetch
import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "src/apis/index.js";
import {addPeople, removePeople} from "src/store/slices/feedSlice.js";


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



export const fetchProfileMediaAction = createAsyncThunk("fetch-media", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/users/media/"+payload.userId)
        if(status === 200){
            return {
                userId: payload.userId,
                media: data.media
            }
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})


//  get all friends and pending friends
export const fetchAuthFriendsAction = createAsyncThunk("authSlice/fetchAuthFriends", async (payload, thunkAPI)=>{
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
        if(status === 201){
            thunkAPI.dispatch(removePeople(payload))
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})



export const confirmFriendRequestAction = createAsyncThunk("authSlice/confirm-friend", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/users/accept-request", {friendId: payload.friendId})

        if(status === 201){
            thunkAPI.dispatch(removePeople(payload.userId))
            return {...data, friendId: payload.friendId}
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})


export const removeFriendAction = createAsyncThunk("authSlice/remove-friend", async (payload, thunkAPI)=>{
    try{
        let {status} = await apis.post("/users/remove-friend", {friendId: payload.friendId})
        if(status === 201){
            thunkAPI.dispatch(addPeople(payload.user))
            return payload
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})




export const addInToSaveAction = createAsyncThunk("authSlice/remove-friend", async (payload, thunkAPI)=>{
    try{
        let {status,data} = await apis.post("/saved", payload)
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})


export const fetchAllSavedAction = createAsyncThunk("authSlice/remove-friend", async (payload, thunkAPI)=>{
    try{
        let {status,data} = await apis.get("/saved")
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( ex.message)
    }
})




