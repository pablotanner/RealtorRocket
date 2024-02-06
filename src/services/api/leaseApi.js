import customFetchBase from "./customFetchBase.js";
import {propertyApi} from "./propertyApi.js";

export const leaseApi = propertyApi.injectEndpoints({
    reducerPath: 'leaseApi',
    baseQuery: customFetchBase,
    tagTypes: ['Leases'],
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
    })
})

export const {useGetLeasesQuery, useGetLeaseQuery, useCreateLeaseMutation} = leaseApi;


