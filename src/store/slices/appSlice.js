import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    openSidebar: "",  // "left-sidebar" // "right-sidebar"
    lang: "en",
    isDarkMode: true
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
                let isLightMode = localStorage.getItem("isLightMode") === "true"
                html.classList.add(isLightMode ? "light" : "dark")
                state.isDarkMode = !isLightMode

            } else {
                if (!isDarkMode) {
                    localStorage.setItem("isLightMode", "true");
                    html.classList.remove("dark")
                    html.classList.add("light")
                    state.isDarkMode = true
                } else {
                    localStorage.setItem("isLightMode", "false");
                    html.classList.remove("light")
                    html.classList.add("dark")
                    state.isDarkMode = true
                }
            }

            console.log(isDarkMode)
        }
    }
});


// Action creators are generated for each case reducer function
export const {openSidebarAction, toggleDarkMode} = appSlice.actions

export default appSlice.reducer