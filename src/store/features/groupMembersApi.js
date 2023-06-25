import {createApi} from "@reduxjs/toolkit/query/react";
import apis from "src/apis/index.js";


export const groupMembersApi = createApi({
    baseQuery: function (url) {
        return apis.get(url)
    },
    endpoints: function (builder) {
        return {
            queryObject: builder.query({
                query(query) {
                    const {
                        groupId,
                        // perPage = 10,
                        pageNumber = 1,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    if (!groupId) {
                        // return thunkAPI.rejectWithValue("Please provide group id")
                        return;
                    }

                    return "/groups/members" + `?groupId=${groupId}&pageNumber=${pageNumber}&orderBy=${orderBy}&orderDirection=${orderDirection}`

                }
            }),

            adminMember: builder.query({
                query(query) {
                    const {
                        groupId,
                        orderBy = "createdAt",
                        orderDirection = "desc",
                    } = query

                    if (!groupId) {
                        // return thunkAPI.rejectWithValue("Please provide group id")
                        return;
                    }

                    return "/groups/members" + `?groupId=${groupId}&type=admin&orderBy=${orderBy}&orderDirection=${orderDirection}`

                }
            })

        }
    }
})


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useQueryObjectQuery, useAdminMemberQuery } = groupMembersApi