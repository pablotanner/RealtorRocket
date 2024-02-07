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
            providesTags: ['Leases'],
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


