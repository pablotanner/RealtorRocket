import customFetchBase from "./customFetchBase.js";
import {toast} from "../../components/ui/use-toast.tsx";
import {authApi} from "./authApi.js";

export const propertyApi = authApi.injectEndpoints({
    reducerPath: 'propertyApi',
    baseQuery: customFetchBase,
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
                toast({
                    title: "Creating Property...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        const unitShortCodes = data.data?.data?.units?.map(unit => unit.unitIdentifier);

                        toast({
                            title: "Success",
                            description: "Property created successfully, your units are: " + unitShortCodes.join(", "),
                            variant: "success",
                        });
                    })
                    .catch((error) => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "error",
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
                toast({
                    title: "Deleting Property...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Property deleted successfully",
                            variant: "success",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request.",
                            variant: "error",
                        });
                    })
            },
            invalidatesTags: ['Properties', 'Units'],
        }),
    }),
    overrideExisting: false,
})

export const {
    useGetPropertiesQuery,
    useCreatePropertyMutation,
    useGetPropertyQuery,
    useDeletePropertyMutation,
} = propertyApi;