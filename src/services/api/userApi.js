import customFetchBase from "./customFetchBase.js";
import {createApi} from "@reduxjs/toolkit/query/react";
import {setUser} from "../auth/authSlice.js";


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    tagTypes: ['User'],
    endpoints: (build) => ({
        getUser: build.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
            providesTags: ['User'],
        }),
        updateUser: build.mutation({
            query: (body) => ({
                url: '/user',
                method: 'PATCH',
                body,
            }),
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setUser(data.data));
            },
        }),
    })
})


export const {useGetUserQuery,
    useUpdateUserMutation
} = userApi;
