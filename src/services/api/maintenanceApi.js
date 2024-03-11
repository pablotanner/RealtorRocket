import customFetchBase from "./customFetchBase.js";
import {toast} from "../../components/ui/use-toast.tsx";
import {authApi} from "./authApi.js";


export const maintenanceApi = authApi.injectEndpoints({
    reducerPath: 'maintenanceApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getMaintenanceReports: build.query({
            query: () => ({
                url: '/maintenance',
                method: 'GET',
            }),
            providesTags: ['Maintenance'],
        }),
        createMaintenanceReport: build.mutation({
            query: (body) => ({
                url: '/maintenance',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Maintenance'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                toast({
                    title: "Creating Maintenance Report...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Maintenance Report created successfully.",
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
    }),
})

export const { useGetMaintenanceReportsQuery, useCreateMaintenanceReportMutation } = maintenanceApi;