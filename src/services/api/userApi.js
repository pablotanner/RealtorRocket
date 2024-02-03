import customFetchBase from "./customFetchBase.js";
import {createApi} from "@reduxjs/toolkit/query/react";
import {setUser} from "../auth/authSlice.js";
import {logoutUser} from "../auth/authActions.js";
import {toast} from "../../components/ui/use-toast.tsx";


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
            // Set the user in the store
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const { data } = await queryFulfilled;
                dispatch(setUser(data.data));
            },
        }),
        updateUser: build.mutation({
            query: (body) => ({
                url: '/user',
                method: 'PATCH',
                body,
            }),
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        dispatch(setUser(data?.data?.data));
                        toast({
                            title: "Success",
                            description: "Profile updated successfully",
                        });
                    })
                    .catch((error) => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "destructive",
                        });
                    });
            }
        }),

        deleteUser: build.mutation({
            query: () => ({
                url: '/user',
                method: 'DELETE',
            }),
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { queryFulfilled }) {
                await queryFulfilled;
                logoutUser();
            },
        }),
    })
})


export const {useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
    usePrefetch,
} = userApi;
