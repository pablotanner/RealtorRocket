import customFetchBase from "./customFetchBase.js";
import {propertyApi} from "./propertyApi.js";

export const tenantApi = propertyApi.injectEndpoints({
    reducerPath: 'tenantApi',
    baseQuery: customFetchBase,
    tagTypes: ['Tenants'],
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
            invalidatesTags: ['Tenants']
        })
    })
})


export const {useGetTenantsQuery, useGetTenantQuery, useCreateTenantMutation} = tenantApi;