import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";
import {func} from "prop-types";


export const feedsApi = createApi({
    reducerPath: "feedApi",
    baseQuery: function (url) {
        return apis.get(url)
    },
    tagTypes: ['feeds'],
    endpoints: function (builder) {
        return {
            feeds: builder.query({
                // invalidatesTags: ["feeds"],
                query(query) {
                    const {
                        groupId = "",
                        // perPage = 10,
                        pageNumber = 1,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    //  fetch group feeds
                    if (groupId) {
                        return "/groups/feeds" + `?groupId=${groupId}&pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
                    } else {
                        return "/feed" + `?pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
                    }
                },

                transformResponse: function(response, _, query){
                    return {
                        feeds: response,
                        pageNumber: query.pageNumber,
                    }
                },

                providesTags: (result) =>
                    result?.feeds
                        ? [
                            ...result.feeds.map(feed => ({type: 'feeds', id: feed._id})),
                            {type: 'feeds', id: 'LIST'},
                            {type: 'feeds', id: 'PARTIAL-FEEDS'},
                        ]
                        : [
                            {type: 'feeds', id: 'LIST'},
                            {type: 'feeds', id: 'PARTIAL-FEEDS'},
                        ],

            })
        }
    }
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFeedsQuery} = feedsApi