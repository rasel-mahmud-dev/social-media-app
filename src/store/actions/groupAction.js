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


// // fetch room by roomId action
// export const fetchGroupByIdAction = createAsyncThunk("fetch-chat-room", async (roomId, thunkAPI) => {
//     try {
//         let {status, data} = await apis.get("chat/room/" + roomId)
//         if (status === 200) {
//             return data?.room
//         }
//     } catch (ex) {
//         // send error message with reject type in reducer
//         return thunkAPI.rejectWithValue(errorResponse(ex))
//     }
// })


// fetch rooms action
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

