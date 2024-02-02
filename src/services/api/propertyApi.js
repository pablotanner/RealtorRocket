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
            // Invalidate the cache when a new property is created
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
        deleteProperty: build.mutation({
            query: (id) => ({
                url: '/properties/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Properties'],
        }),
    })
})

export const {
    useGetPropertiesQuery,
    useCreatePropertyMutation,
    useGetPropertyQuery,
    useDeletePropertyMutation,
    usePrefetch: usePropertyPrefetch,
} = propertyApi;