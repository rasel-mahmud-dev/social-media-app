import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    openSidebar: "",  // "left-sidebar" // "right-sidebar"
    lang: "en"
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        updateAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        openSidebarAction(state, action) {
            state.openSidebar = action.payload
        },
    }
});


// Action creators are generated for each case reducer function
export const {openSidebarAction} = appSlice.actions

export default appSlice.reducer