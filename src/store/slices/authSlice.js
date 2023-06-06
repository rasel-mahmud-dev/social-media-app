import { createSlice } from '@reduxjs/toolkit';
import {fetchCurrentAuthAction, loginOrRegistrationAction, fetchProfileAction} from "../actions/authAction";


const initialState = {
    auth: null,
    authLoaded: false,
    profile: null
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        // logout user action
        logoutAction(state) {
            state.auth = null
            state.authLoaded = true
            state.biodata = null
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(loginOrRegistrationAction.fulfilled, (state, action) => {
            if(action.payload){
                let {fullName, firstName, lastName, email, role, avatar} = action.payload
               state.auth = {
                   fullName, firstName, lastName, email, role, avatar
               }
               state.authLoaded = true
            }
            // state.entities.push(action.payload)
        })

        // handle rejection error
        builder.addCase(loginOrRegistrationAction.rejected, (state, action) => {
            state.auth = null
            state.authLoaded = true
        })


        // handle fetch current auth user
        builder.addCase(fetchCurrentAuthAction.fulfilled, (state, action) => {

            if(action.payload){
                let { fullName, firstName, lastName, email, role, avatar} = action.payload
                state.auth = {
                    fullName, firstName, lastName, email, role, avatar
                }
                state.authLoaded = true
            }
        })

        // handle rejection
        builder.addCase(fetchCurrentAuthAction.rejected, (state, action) => {
            state.auth = null
            state.authLoaded = true
        })


        // handle fetch current user bio data
        builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
            if(action.payload){
                state.profile = action.payload
            }
        })
    }
});

// Action creators are generated for each case reducer function
export const { logoutAction } = authSlice.actions

export default authSlice.reducer