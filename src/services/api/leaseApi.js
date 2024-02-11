import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";

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
            invalidatesTags: ['Leases']
        })
    }),
    overrideExisting: false,
})

export const {useGetLeasesQuery, useGetLeaseQuery, useCreateLeaseMutation} = leaseApi;


