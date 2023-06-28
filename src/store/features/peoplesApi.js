import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";


export const peoplesApi = createApi({
    reducerPath: "peoplesApi",
    baseQuery: function (url) {
        return apis.get(url)
    },
    tagTypes: ['peoples'],
    endpoints: function (builder) {
        return {
            fetchPeoples: builder.query({
                query(query) {
                    const {
                        // perPage = 10,
                        pageNumber = 1,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    //  fetch peoples
                    return "/users" + `?pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
                },

                transformResponse: function (response, _, query) {
                    return {
                        peoples: response,
                        pageNumber: query.pageNumber,
                    }
                }
            })
        }
    }
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFetchPeoplesQuery} = peoplesApi