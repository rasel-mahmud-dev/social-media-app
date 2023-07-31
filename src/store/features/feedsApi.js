import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";
import {func} from "prop-types";
import produce from "immer";


function findOriginalArgs(queries, friendId) {
    let cacheKey = undefined

    // find args for pagination
    for (let queriesKey in queries) {
        let query = queries[queriesKey]
        if (query.status === "fulfilled") {
            if (query?.data?.friends && Array.isArray(query.data.friends)) {
                if (query.data.friends.findIndex(fri => fri._id === friendId) !== -1) {
                    cacheKey = query.originalArgs
                    break;
                }
            }
        }
    }
    return cacheKey
}



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

            }),

            updateFeed: builder.mutation({
                query: (query) => {
                    return {
                        type: "update_local_cache",
                        data: query
                    }
                },
                invalidatesTags: [{type: 'feeds', id: 'LIST'}],


                async onQueryStarted(postId, {queryFulfilled, dispatch}) {
                    try {
                        const {data} = await queryFulfilled;
                        const {
                            friendId,
                            queries,
                            update,
                        } = data

                        const cacheKey = findOriginalArgs(queries, friendId)

                        if (friendId && cacheKey) {
                            dispatch(
                                friendsApi.util.updateQueryData("fetchFriends", cacheKey, function (draft) {
                                    return produce(draft, updatedDraft => {
                                        updatedDraft.friends = updatedDraft.friends.map(item => {
                                            if (item._id === friendId) {
                                                return {...item, ...update};
                                            } else {
                                                return item;
                                            }
                                        });
                                    });
                                })
                            );
                        }
                    } catch (error) {

                    }
                }



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
export const {
    useFeedsQuery,
    useVideoFeedsQuery,
    useGroupFeedsQuery,
    useAddFeedMutation,
    useUpdateFeedMutation
} = feedsApi