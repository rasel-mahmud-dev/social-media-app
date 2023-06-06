import {createApi} from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from "../customRTKBaseQuery";


// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
    baseQuery: axiosBaseQuery(),
    reducerPath: 'usersApi',

    tagTypes: ['users'],

    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {url: "/api/users"}
                }
            })
        }
    },
})


export const {useGetUsersQuery} = usersApi
