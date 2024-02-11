import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";

export const unitApi = authApi.injectEndpoints({
    reducerPath: 'unitApi',
    baseQuery: customFetchBase,
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
            providesTags: (result, error, id) => [{ type: 'Units', id }],
        }),
    }),
    overrideExisting: false,
})


export const {useGetUnitsQuery, useGetUnitQuery} = unitApi;