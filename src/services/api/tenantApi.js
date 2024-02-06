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
            query: (body, leaseId) => {
                const queryParams = leaseId ? "?leaseId=" + leaseId : "";

                return {
                    url: `/tenants${queryParams}`,
                    method: 'POST',
                    body,
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Tenant created successfully",
                        });
                    })
                    .catch(() => {
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: "There was a problem with your request, please try again.",
                            variant: "destructive",
                        });
                    })
            },
            invalidatesTags: ['Tenants']
        })
    })
})


export const {useGetTenantsQuery, useGetTenantQuery, useCreateTenantMutation} = tenantApi;