import customFetchBase from "./customFetchBase.js";
import {createApi} from "@reduxjs/toolkit/query/react";


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getUser: build.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            }),
        })
    })
})


export const {useGetUserQuery} = userApi;
