import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";


export const messageApi = authApi.injectEndpoints({
    reducerPath: 'messageApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getMessages: build.query({
            query: () => '/messages',
            providesTags: ['Messages'],
        }),
        createMessage: build.mutation({
            query: (body) => ({
                url: '/messages',
                method: 'POST',
                body,
            }),
        invalidatesTags: ['Messages'],
        }),
    }),
})

export const { useGetMessagesQuery, useCreateMessageMutation } = messageApi;