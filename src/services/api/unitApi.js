import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.js";

export const unitApi = createApi({
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


export const {useGetUnitsQuery, useGetUnitQuery} = unitApi;