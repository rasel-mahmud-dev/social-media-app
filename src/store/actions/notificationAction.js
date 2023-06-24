

// import {createAsyncThunk} from "@reduxjs/toolkit";
// import apis from "../../apis";
// import errorResponse from "src/utils/errorResponse.js";
//

// get all notification action
import {createAsyncThunk} from "@reduxjs/toolkit";
import apis from "src/apis/index.js";
import errorResponse from "src/utils/errorResponse.js";

export const getAllNotificationAction = createAsyncThunk("received-new-notification", async (payload, thunkAPI) => {
    try {
        let {status, data} = await apis.get("/notification/all")
        if (status === 200) {
            return data?.notifications ?? []
        }
    } catch (ex) {
        // send error message with reject type in reducer
        return thunkAPI.rejectWithValue(errorResponse(ex))
    }
})

