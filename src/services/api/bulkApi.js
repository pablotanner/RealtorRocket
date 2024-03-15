import {authApi} from "./authApi.js";
import customFetchBase from "./customFetchBase.js";
import {toast} from "../../components/ui/use-toast.tsx";


export const bulkApi = authApi.injectEndpoints({
    reducerPath: 'bulkApi',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        updateLeases: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/leases`,
                    method: 'PATCH',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Updating Leases...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.data?.length} Leases updated successfully`,
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
        deleteLeases: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/leases`,
                    method: 'DELETE',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Deleting Leases...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.data?.length} Leases deleted successfully`,
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
        createPayments: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/payments`,
                    method: 'POST',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Creating Payments...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.data?.length} Payments created successfully`,
                            variant: "success",
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                        toast({
                            title: "Uh oh! Something went wrong.",
                            description: `${error?.error?.data?.message}`,
                            variant: "error",
                        });
                    })
            },
            invalidatesTags: ['Payments', 'Leases']
        }),
        updatePayments: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/payments`,
                    method: 'PATCH',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Updating Payments...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.data?.length} Payments updated successfully`,
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
        deletePayments: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/payments`,
                    method: 'DELETE',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Deleting Payments...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.data?.length} Payment(s) deleted successfully`,
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
        updatePaymentSchedules: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/payment-schedules`,
                    method: 'PATCH',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Updating Payment Schedules...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.data?.length} Payment Schedules updated successfully`,
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
        deletePaymentSchedules: build.mutation({
            query: (body) => {
                return {
                    url: `/bulk/payment-schedules`,
                    method: 'DELETE',
                    body
                }
            },
            async onQueryStarted(arg, { queryFulfilled }) {
                toast({
                    title: "Deleting Payment Schedules...",
                    variant: "loading",
                })
                queryFulfilled
                    .then((data) => {
                        toast({
                            title: "Success",
                            description: `${data?.data?.length} Payment Schedule(s) deleted successfully`,
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
    })
})


export const { useUpdateLeasesMutation, useCreatePaymentsMutation, useUpdatePaymentsMutation, useDeletePaymentsMutation, useDeletePaymentSchedulesMutation, useUpdatePaymentSchedulesMutation, useDeleteLeasesMutation } = bulkApi;