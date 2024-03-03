import customFetchBase from "./customFetchBase.js";
import {authApi} from "./authApi.js";
import {toast} from "../../components/ui/use-toast.tsx";

export const financialsApi = authApi.injectEndpoints({
    reducerPath: 'financialsApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        getPaymentSchedule: build.query({
            query: (id) => ({
                url: `/paymentSchedules/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Leases', id }],
        }),
        getPayment: build.query({
            query: (id) => ({
                url: `/payments/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Payment', id }],
        }),
        getPayments: build.query({
            query: () => ({
                url: `/payments`,
                method: 'GET',
            }),
            providesTags: ['Payments']
        }),
        createPayment: build.mutation({
            query: (body) => ({
                url: `/payments`,
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment created successfully",
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
            invalidatesTags: ['Payments']
        }),
        updatePayment: build.mutation({
            query: ({id, body}) => ({
                url: `/payments/${id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment updated successfully",
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
            invalidatesTags: ['Payments']
        }),
        deletePayment: build.mutation({
            query: (id) => ({
                url: `/payments/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment deleted successfully",
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
            invalidatesTags: ['Payments']
        }),
        updatePaymentSchedule: build.mutation({
            query: ({id, body}) => ({
                url: `/payment-schedules/${id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Planned Payment updated successfully",
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
        deletePaymentSchedule: build.mutation({
            query: (id) => ({
                url: `/payment-schedules/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Planned Payment deleted successfully",
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

export const {useGetPaymentSchedule, useGetPaymentsQuery, useDeletePaymentScheduleMutation, useUpdatePaymentScheduleMutation, useCreatePaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation} = financialsApi;


