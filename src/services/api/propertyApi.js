import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.js";

export const propertyApi = createApi({
    reducerPath: 'propertyApi',
    baseQuery: customFetchBase,
    tagTypes: ['Properties'],
    endpoints: (build) => ({
        getProperties: build.query({
            query: () => ({
                url: '/properties',
                method: 'GET',
            }),
            providesTags: ['Properties'],
        }),
        createProperty: build.mutation({
            query: (body) => ({
                url: '/properties',
                method: 'POST',
                body,
            }),
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { queryFulfilled }) {
                const { data } = await queryFulfilled;
                console.log(data);
            },
            invalidatesTags: ['Properties'],
        }),
        getProperty: build.query({
            query: (id) => ({
                url: `/properties/${id}`,
                method: 'GET',
            }),
            //providesTags: ['Properties'],
        }),
    })
})

export const {
    useGetPropertiesQuery,
    useCreatePropertyMutation,
    useGetPropertyQuery,
} = propertyApi;