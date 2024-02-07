import {authApi} from "../api/authApi.js";
import authSlice from "../auth/authSlice.js";
import userSlice from "./userSlice.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { unitApi } from "../api/unitApi.js";
import { propertyApi } from "../api/propertyApi.js";
import { leaseApi } from "../api/leaseApi.js";
import { tenantApi } from "../api/tenantApi.js";

import {leasesReducer, propertiesReducer, tenantsReducer, unitsReducer} from "../api/objectSlice.js";
import { configureStore } from '@reduxjs/toolkit/react'



export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice,
        userSlice: userSlice,
        property: propertiesReducer,
        unit: unitsReducer,
        lease: leasesReducer,
        tenant: tenantsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware])

})


