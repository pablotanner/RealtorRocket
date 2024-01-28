import {createApi} from "@reduxjs/toolkit/query";

import customFetchBase from "./customFetchBase.js";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),

            //transformResponse: (response, meta, arg) => response.data,

            //transformErrorResponse: (response, meta, arg) => response.status,

        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'POST',
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
    }),
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLogoutMutation,
} = authApi