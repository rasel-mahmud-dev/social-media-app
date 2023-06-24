import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'


import {usersApi} from "./services/usersApi";
import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";
import feedReduce from "./slices/feedSlice";
import chatReducer from "./slices/chatSlice";
import {notificationSlice} from "src/store/slices/notificationSlice.js";



export const store = configureStore({
    reducer: {
        authState: authReducer,
        appState: appReducer,
        chatState: chatReducer,
        feedState: feedReduce,
        notificationState: notificationSlice.reducer,
        // Add the generated reducer as a specific top-level slice
        [usersApi.reducerPath]: usersApi.reducer,

    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([usersApi.middleware]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)