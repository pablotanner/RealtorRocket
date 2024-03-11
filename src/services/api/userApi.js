import customFetchBase from "./customFetchBase.js";
import {setUser} from "../auth/authSlice.js";
import {logoutUser} from "../auth/authActions.js";
import {toast} from "../../components/ui/use-toast.tsx";
import {authApi} from "./authApi.js";


export const userApi = authApi.injectEndpoints({
    reducerPath: 'userApi',
    baseQuery: customFetchBase,
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
                toast({
                    title: "Updating Profile...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        dispatch(setUser(data?.data?.data));
                        toast({
                            title: "Success",
                            description: "Profile updated successfully",
                            variant: "success",
                        });
                    })
                    .catch((error) => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "error",
                        });
                    });
            },
            invalidatesTags: ['User'],
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
    }),
    overrideExisting: false,
})


export const {useGetUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = userApi;
