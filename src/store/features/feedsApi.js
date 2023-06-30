import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";
import {func} from "prop-types";


export const feedsApi = createApi({
    reducerPath: "feedApi",
    baseQuery: function (url) {
        if (typeof url === "object" && url.type === "update_local_cache") {
            return url.data
        } else {
            return apis.get(url)
        }
    },
    tagTypes: ['feeds'],
    endpoints: function (builder) {
        return {
            feeds: builder.query({
                // invalidatesTags: ["feeds"],
                query(query) {
                    const {
                        // perPage = 10,
                        pageNumber = 1,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    //  fetch feeds
                    return "/feed" + `?pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`

                },

                transformResponse: function (response, _, query) {
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

            }),
            videoFeeds: builder.query({
                // invalidatesTags: ["feeds"],
                query(query) {
                    const {
                        // perPage = 10,
                        pageNumber = 1,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    //  fetch feeds
                    return "/feed/video" + `?pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`

                },

                transformResponse: function (response, _, query) {
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

            }),

            groupFeeds: builder.query({
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
                    if (!groupId) return

                    return "/groups/feeds" + `?groupId=${groupId}&pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
                },

                transformResponse: function (response, _, query) {
                    return {
                        groupFeeds: response.feeds,
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

            }),


            addFeed: builder.mutation({
                query: (query) => {
                    return {
                        type: "update_local_cache",
                        data: query
                    }
                },
                invalidatesTags: [{type: 'groupFeeds', id: 'LIST'}],
                // async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
                //
                //     // const patchResult = dispatch(
                //     //     feedsApi.util.updateQueryData('groupFeeds', id, (draft) => {
                //     //         console.log(draft)
                //     //         Object.assign(draft, patch)
                //     //     })
                //     // )
                //
                //     try {
                //         await queryFulfilled
                //
                //     } catch {
                //         // patchResult.undo()
                //
                //         /**
                //          * Alternatively, on failure you can invalidate the corresponding cache tags
                //          * to trigger a re-fetch:
                //          * dispatch(api.util.invalidateTags(['Post']))
                //          */
                //     }
                // },
            }),

            // addFeed: builder.query({
            //     // invalidatesTags: ["feeds"],
            //     query(query) {
            //         const {
            //             groupId = "",
            //             // perPage = 10,
            //             pageNumber = 1,
            //             orderBy = "createdAt",
            //             orderDirection = "desc",
            //         } = query
            //
            //         //  fetch group feeds
            //         if (!groupId) return
            //
            //         return "/groups/feeds" + `?groupId=${groupId}&pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`
            //     },
            //
            //     transformResponse: function (response, _, query) {
            //         return {
            //             groupFeeds: response.feeds,
            //             pageNumber: query.pageNumber,
            //         }
            //     },
            //
            //     providesTags: (result) =>
            //         result?.feeds
            //             ? [
            //                 ...result.feeds.map(feed => ({type: 'feeds', id: feed._id})),
            //                 {type: 'feeds', id: 'LIST'},
            //                 {type: 'feeds', id: 'PARTIAL-FEEDS'},
            //             ]
            //             : [
            //                 {type: 'feeds', id: 'LIST'},
            //                 {type: 'feeds', id: 'PARTIAL-FEEDS'},
            //             ],
            //
            // })
        }
    }
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFeedsQuery, useVideoFeedsQuery, useGroupFeedsQuery, useAddFeedMutation} = feedsApi