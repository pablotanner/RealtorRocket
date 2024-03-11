import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";
import {toast} from "../../components/ui/use-toast.tsx";

export const leaseApi = authApi.injectEndpoints({
    reducerPath: 'leaseApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getLeases: build.query({
            query: (filters = {}) => {
                const queryParams = new URLSearchParams();

                if (filters.tenantId) queryParams.append('tenantId', filters.tenantId);
                if (filters.unitId) queryParams.append('unitId', filters.unitId);

                return {
                    url: `/leases?${queryParams}`,
                    method: 'GET',
                }
            },
            providesTags: (result, error, filters) => {
                // If no filters are provided, update the 'Leases' tag
                if (!filters || Object.keys(filters).length === 0) {
                    return ['Leases'];
                }
                // If filters are provided, do not update any tags
                return [];
            },
        }),
        getLease: build.query({
            query: (id) => ({
                url: `/tenants/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Leases', id }],
        }),
        createLease: build.mutation({
            query: (body) => {
                return {
                    url: '/leases',
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: ['Leases', 'Units', 'Tenants'],
            // API returns back the updated user, so we can use that to update the cache
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                toast({
                    title: "Creating Lease...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Lease created successfully.",
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
        }),
        updateLease: build.mutation({
            query: (data) => {
                const id = data.id;
                const body = {...data};
                delete body.id;
                return {
                    url: `/leases/${id}`,
                    method: 'PATCH',
                    body
                }
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                toast({
                    title: "Updating Lease...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Lease updated successfully.",
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
            invalidatesTags: ['Leases']
        }),
        deleteLease: build.mutation({
            query: (id) => ({
                url: `/leases/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                toast({
                    title: "Deleting Lease...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Lease deleted successfully.",
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
            invalidatesTags: ['Leases']
        }),
    }),
    overrideExisting: false,
})

export const {useGetLeasesQuery, useGetLeaseQuery, useUpdateLeaseMutation, useDeleteLeaseMutation, useCreateLeaseMutation} = leaseApi;


