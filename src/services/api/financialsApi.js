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
    }),
    overrideExisting: false,
})

export const {useGetPaymentSchedule} = financialsApi;


