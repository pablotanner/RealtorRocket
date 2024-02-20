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
            invalidatesTags: ['Payments']
        }),
    }),
    overrideExisting: false,
})

export const {useGetPaymentSchedule, useGetPaymentsQuery, useCreatePaymentMutation} = financialsApi;


