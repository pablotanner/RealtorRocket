import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.js";
import {propertyApi} from "./propertyApi.js";

export const unitApi = propertyApi.injectEndpoints({
    reducerPath: 'unitApi',
    baseQuery: customFetchBase,
    tagTypes: ['Units'],
    endpoints: (build) => ({
        getUnits: build.query({
            query: () => ({
                url: '/units',
                method: 'GET',
            }),
            providesTags: ['Units'],
        }),
        getUnit: build.query({
            query: (id) => ({
                url: `/units/${id}`,
                method: 'GET',
            }),
            providesTags: ['Units'],
        }),
    })
})


export const {useGetUnitsQuery, useGetUnitQuery, usePrefetch: usePrefetchUnits} = unitApi;