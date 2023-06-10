import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    openSidebar: "",  // "left-sidebar" // "right-sidebar"
    lang: "en",
    isDarkMode: false
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

        toggleDarkMode(state, action) {
            let isDarkMode = action.payload
            let html = document.documentElement
            if (isDarkMode === undefined) {
                isDarkMode = localStorage.getItem("darkMode") === "true"
                html.classList.add(isDarkMode ? "dark" : "light")
                state.isDarkMode = isDarkMode
            } else {
                localStorage.setItem("darkMode", isDarkMode);
                if (isDarkMode) {
                    html.classList.remove("light")
                    html.classList.add("dark")
                    state.isDarkMode = true
                } else {
                    html.classList.remove("dark")
                    html.classList.add("light")
                    state.isDarkMode = false
                }
            }
        }
    }
});


// Action creators are generated for each case reducer function
export const {openSidebarAction, toggleDarkMode} = appSlice.actions

export default appSlice.reducer