import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";


export const friendsApi = createApi({
    reducerPath: "friendsApi",
    baseQuery: function (url) {
        return apis.get(url)
    },
    tagTypes: ['friends'],
    endpoints: function (builder) {
        return {
            fetchFriends: builder.query({
                query(query) {
                    const {
                        // perPage = 10,
                        pageNumber = 1,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    //  fetch feeds
                    return "/users/friends" + `?pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
                },

                transformResponse: function (response, _, query) {
                    return {
                        friends: response.friends,
                        pageNumber: query.pageNumber,
                    }
                }
            })
        }
    }
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFetchFriendsQuery} = friendsApi