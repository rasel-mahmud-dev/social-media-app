import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from "./slices/authSlice";
import appReducer from "./slices/appSlice";
import feedReduce from "./slices/feedSlice";
import chatReducer from "./slices/chatSlice";
import {notificationSlice} from "src/store/slices/notificationSlice.js";
import {groupMembersApi} from "src/store/features/groupMembersApi.js";



export const store = configureStore({
    reducer: {
        authState: authReducer,
        appState: appReducer,
        chatState: chatReducer,
        feedState: feedReduce,
        notificationState: notificationSlice.reducer,
        // Add the generated reducer as a specific top-level slice
        [groupMembersApi.reducerPath]: groupMembersApi.reducer,

    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([groupMembersApi.middleware]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)