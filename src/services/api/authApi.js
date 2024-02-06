import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.js";
import {setAccessToken} from "../auth/authSlice.js";
import {toast} from "../../components/ui/use-toast.tsx";


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        login: build.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        if (data.data.accessToken) {
                            dispatch(setAccessToken(data?.data.accessToken));
                            localStorage.setItem('refreshToken', data.data.refreshToken)
                        }
                        toast({
                            title: "Success",
                            description: "Logged in successfully",
                        });
                        return data;
                    })
                    .catch((error) => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your login",
                            variant: "destructive",
                        });
                    })
            }
        }),
        register: build.mutation({
            query: (credentials) => ({
                url: '/signup',
                method: 'POST',
                body: credentials,
            }),
            /*
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setAccessToken(data.accessToken));
                localStorage.setItem('refreshToken', data.refreshToken)
            }
             */

        }),
        logout: build.mutation({
            query: () => ({
                url: '/logout',
                method: 'POST',
            }),
        }),
        users: build.query({
            query: () => ({
                url: '/users',
                method: 'GET',
            }),
        })
    }),
    tagTypes: ['User', 'Properties', 'Units', 'Tenants', 'Leases'],
})

export const {
    useLoginMutation,
    useRegisterMutation,
    useRefreshMutation,
    useLazyRefreshQuery,
    useLogoutMutation,
    useUsersQuery,
    usePrefetch,
} = authApi;