
// fetch
import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "src/apis/index.js";
import {addPeople, removePeople} from "src/store/slices/feedSlice.js";
import errorResponse from "src/utils/errorResponse.js";


export const fetchPeoplesAction = createAsyncThunk("authSlice/fetchPeoples", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/users", payload)
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( errorResponse(ex))
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
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})


//  get all friends and pending friends
export const fetchAuthFriendsAction = createAsyncThunk("authSlice/fetchAuthFriends", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.get("/users/friends?userId=" + payload)
        if(status === 200){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})



export const addFriendAction = createAsyncThunk("authSlice/add-friend", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/users/add-friend", {friendId: payload})
        if(status === 201){
            return data
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( errorResponse(ex))
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
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})


export const removeFriendAction = createAsyncThunk("authSlice/remove-friend", async (payload, thunkAPI)=>{
    try{
        let {status} = await apis.post("/users/remove-friend", {friendId: payload.friendId})
        if(status === 201){
            // thunkAPI.dispatch(addPeople(payload.user))
            return payload
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( errorResponse(ex))
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
        return thunkAPI.rejectWithValue( errorResponse(ex))
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
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})





/**** Update profile *****/

export const updateProfileAction = createAsyncThunk("update-profile", async (payload, thunkAPI)=>{
    try{
        let {status, data} = await apis.post("/auth/update-profile", payload)

        if(status === 201){
            return data?.user
        }
    } catch (ex){
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue( errorResponse(ex))
    }
})

