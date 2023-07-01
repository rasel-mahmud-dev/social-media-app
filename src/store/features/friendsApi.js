import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";
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

export const friendsApi = createApi({
    reducerPath: "friendsApi",
    baseQuery: function (url) {
        if (url.method === "NONE") return url
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
            }),

            changeFriendStatus: builder.mutation({
                query(data) {
                    return {
                        method: "NONE",
                    }
                },
                transformResponse: function (responseData, a, queryArgs) {
                    return queryArgs
                },
                async onQueryStarted(postId, {queryFulfilled, dispatch}) {
                    try {
                        const {data} = await queryFulfilled;
                        const {
                            friendId,
                            friendQueries,
                            update,
                        } = data

                        const cacheKey = findOriginalArgs(friendQueries, friendId)

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
            }),

            removeFriendCache: builder.mutation({
                query(data) {
                    return {
                        method: "NONE",
                    }
                },
                transformResponse: function (responseData, a, queryArgs) {
                    return queryArgs
                },
                async onQueryStarted(postId, {queryFulfilled, dispatch}) {
                    try {
                        const {data} = await queryFulfilled;
                        const {
                            friendId,
                            friendQueries,
                        } = data

                        // find args for pagination
                        const cacheKey = findOriginalArgs(friendQueries, friendId)

                        if (friendId && cacheKey) {
                            dispatch(
                                friendsApi.util.updateQueryData("fetchFriends", cacheKey, function (draft) {
                                    draft.friends = draft.friends.filter(item => item._id !== friendId)
                                    return draft
                                })
                            );
                        }
                    } catch (error) {

                    }
                }
            })
        }
    }
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFetchFriendsQuery, useChangeFriendStatusMutation, useRemoveFriendCacheMutation} = friendsApi