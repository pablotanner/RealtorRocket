import customFetchBase from "./customFetchBase.js";
import {createApi} from "@reduxjs/toolkit/query/react";
import {authApi} from "./authApi.js";
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


            // Use the new user object from response
            invalidatesTags: ['User'],
        }),
    })
})


export const {useGetUserQuery,
    useUpdateUserMutation
} = userApi;
