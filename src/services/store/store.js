import { configureStore } from '@reduxjs/toolkit/react'
import {authApi} from "../api/authApi.js";
import authSlice from "../auth/authSlice.js";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware])

})


