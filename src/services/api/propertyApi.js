import {createApi} from "@reduxjs/toolkit/query/react";
import customFetchBase from "./customFetchBase.js";
import {toast} from "../../components/ui/use-toast.tsx";

export const propertyApi = createApi({
    reducerPath: 'propertyApi',
    baseQuery: customFetchBase,
    tagTypes: ['Properties', 'Units'],
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
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: "Property created successfully",
                        });
                    })
                    .catch((error) => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "destructive",
                        });
                    })
            },
            invalidatesTags: ['Properties','Units'],
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
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Property deleted successfully",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "destructive",
                        });
                    })
            },
            invalidatesTags: ['Properties','Units'],
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