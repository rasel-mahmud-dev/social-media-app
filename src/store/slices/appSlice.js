import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    isOpenSidebar: false,
    lang: "en"
};

export const appSlice = createSlice({
    name: 'appSlice',
    initialState,
    reducers: {
        updateAccessToken(state, action) {
            state.accessToken = action.payload;
        },
        toggleSidebar(state) {
            state.isOpenSidebar = !state.isOpenSidebar
        },
        toggleLang(state, action) {
            if (action.payload) {
                state.lang = action.payload
            } else {
                let lang = state.lang === "en" ? "bn" : "en"
                state.lang = lang
                localStorage.setItem("lang", lang)
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const {toggleSidebar, toggleLang} = appSlice.actions

export default appSlice.reducer