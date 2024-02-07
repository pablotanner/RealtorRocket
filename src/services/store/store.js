import {authApi} from "../api/authApi.js";
import authSlice from "../auth/authSlice.js";
import userSlice from "./userSlice.js";
import {leasesReducer, propertiesReducer, tenantsReducer, unitsReducer} from "./objectSlice.js";
import { configureStore } from '@reduxjs/toolkit/react'



export const store = configureStore({
    reducer: {
        userSlice: userSlice,
        property: propertiesReducer,
        unit: unitsReducer,
        lease: leasesReducer,
        tenant: tenantsReducer,
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware])

})


