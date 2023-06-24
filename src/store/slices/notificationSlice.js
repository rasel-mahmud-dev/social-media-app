import {createSlice} from '@reduxjs/toolkit';
import { getAllNotificationAction} from "src/store/actions/notificationAction.js";


const initialState = {
    notifications: []
};


export const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState,
    reducers: {
        receivedNewNotification(state, action) {
            console.log(action.payload)
            state.notifications.push(action.payload)
        },

        readNotification(state, action) {
            const {notificationId} = action.payload
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllNotificationAction.fulfilled, (state, action) => {
            state.notifications =  action.payload
        })
    }
});


export const { receivedNewNotification} = notificationSlice.actions

export default notificationSlice.reducer

