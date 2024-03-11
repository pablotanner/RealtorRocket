import customFetchBase from "./customFetchBase.js";
import {toast} from "../../components/ui/use-toast.tsx";
import {authApi} from "./authApi.js";

export const tenantApi = authApi.injectEndpoints({
    reducerPath: 'tenantApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getTenants: build.query({
            query: () => {
                return {
                    url: `/tenants`,
                    method: 'GET',
                }
            },
            providesTags: ['Tenants'],
        }),
        getTenant: build.query({
            query: (id) => ({
                url: `/tenants/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Tenants', id }],
        }),
        createTenant: build.mutation({
            query: ({bodyData, leaseId}) => {
                const queryParams = leaseId ? "?leaseId=" + leaseId : "";

                return {
                    url: `/tenants${queryParams}`,
                    method: 'POST',
                    body: bodyData,
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Creating Tenant...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Tenant created successfully",
                            variant: "success",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request, please try again.",
                            variant: "error",
                        });
                    })
            },
            invalidatesTags: ['Tenants', 'Units', 'Leases']
        }),
        updateTenant: build.mutation({
            query: ({id, bodyData}) => ({
                url: `/tenants/${id}`,
                method: 'PUT',
                body: bodyData,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Updating Tenant...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Tenant updated successfully",
                            variant: "success",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request, please try again.",
                            variant: "error",
                        });
                    })
            },
            invalidatesTags: ['Tenants']
        }),
        deleteTenant: build.mutation({
            query: (id) => ({
                url: `/tenants/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Deleting Tenant...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Tenant deleted successfully",
                            variant: "success",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request, please try again.",
                            variant: "error",
                        });
                    })
            },
            invalidatesTags: ['Tenants']
        }),
    }),
    overrideExisting: false,
})


export const {useGetTenantsQuery, useGetTenantQuery, useUpdateTenantMutation, useCreateTenantMutation, useDeleteTenantMutation} = tenantApi;