import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";
import produce from 'immer';

export const peoplesApi = createApi({
    reducerPath: "peoplesApi",
    baseQuery: function (url) {
        if (url.method === "NONE") return url
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
            }),
            removePeople: builder.mutation({
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
                        const {peopleId, queries} = data

                        let cacheKey = {}

                        // find args for pagination
                        for (let queriesKey in queries) {
                            let query = queries[queriesKey]
                            if (query.status === "fulfilled") {
                                if (query?.data?.peoples && Array.isArray(query.data.peoples)) {
                                    if (query.data.peoples.findIndex(people => people._id === peopleId) !== -1) {
                                        cacheKey = query.originalArgs
                                        break;
                                    }
                                }
                            }
                        }

                        if (peopleId && cacheKey) {
                            //Cash updating in a Pessimistic way
                            dispatch(
                                peoplesApi.util.updateQueryData("fetchPeoples", cacheKey, function (draft) {
                                    draft.peoples = draft.peoples.filter((item) => item._id !== peopleId);
                                    return draft
                                })
                            );
                        }
                    } catch (error) {

                    }
                }
            }),

            updatePeopleFriendStatus: builder.mutation({
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
                        const {_id, queries, friend} = data

                        let cacheKey = {}

                        // find args for pagination
                        for (let queriesKey in queries) {
                            let query = queries[queriesKey]
                            if (query.status === "fulfilled") {
                                if (query?.data?.peoples && Array.isArray(query.data.peoples)) {
                                    if (query.data.peoples.findIndex(people => people._id === _id) !== -1) {
                                        cacheKey = query.originalArgs
                                        break;
                                    }
                                }
                            }
                        }

                        if (_id && cacheKey) {
                            //Cash updating in a Pessimistic way
                            dispatch(
                                peoplesApi.util.updateQueryData("fetchPeoples", cacheKey, function (draft) {
                                    return produce(draft, updatedDraft => {
                                        updatedDraft.peoples = updatedDraft.peoples.map(item => {
                                            if (item._id === _id) {
                                                return { ...item, friend };
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
            })
        }
    }
})
console.log(peoplesApi)

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useFetchPeoplesQuery, useRemovePeopleMutation, useUpdatePeopleFriendStatusMutation} = peoplesApi