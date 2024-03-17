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
                toast({
                    title: "Creating Payment...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment created successfully.",
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
            invalidatesTags: ['Payments', 'Leases']
        }),
        updatePayment: build.mutation({
            query: ({id, body}) => ({
                url: `/payments/${id}`,
                method: 'PUT',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Updating Payment...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment updated successfully.",
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
                toast({
                    title: "Deleting Payment...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment deleted successfully.",
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
                toast({
                    title: "Updating Payment Schedule...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Payment Schedule updated successfully.",
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
                toast({
                    title: "Deleting Planned Payment...",
                    variant: "loading",
                })
                queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Planned Payment deleted successfully.",
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
        getExpenses: build.query({
            query: () => ({
                url: `/expenses`,
                method: 'GET',
            }),
            providesTags: ['Expenses']
        }),
        deleteExpense: build.mutation({
            query: (id) => ({
                url: `/expenses/${id}`,
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Deleting Expense...",
                    variant: "loading",
                })
                await queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Expense deleted successfully.",
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
            invalidatesTags: ['Expenses']

        }),
        createExpense: build.mutation({
            query: (body) => ({
                url: `/expenses`,
                method: 'POST',
                body
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Creating Expense...",
                    variant: "loading",
                })
                await queryFulfilled
                    .then(() => {
                        toast({
                            title: "Success",
                            description: "Expense created successfully.",
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
            invalidatesTags: ['Expenses']
        }),
    }),
    overrideExisting: false,
})

export const {useGetPaymentSchedule, useGetPaymentsQuery,useDeleteExpenseMutation, useGetExpensesQuery, useCreateExpenseMutation, useDeletePaymentScheduleMutation, useUpdatePaymentScheduleMutation, useCreatePaymentMutation, useUpdatePaymentMutation, useDeletePaymentMutation} = financialsApi;


