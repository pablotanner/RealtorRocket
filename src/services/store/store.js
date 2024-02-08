import {authApi} from "../api/authApi.js";
import authSlice from "../auth/authSlice.js";
import userSlice from "../slices/userSlice.js";
// The following imports are not used in this file, but are required for the store to work (injections need to be made before store setup)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { unitApi } from "../api/unitApi.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { propertyApi } from "../api/propertyApi.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { leaseApi } from "../api/leaseApi.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { tenantApi } from "../api/tenantApi.js";

import {leasesReducer, propertiesReducer, tenantsReducer, unitsReducer} from "../slices/objectSlice.js";
import { configureStore } from '@reduxjs/toolkit/react'



export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice,
        userSlice: userSlice,
        properties: propertiesReducer,
        units: unitsReducer,
        leases: leasesReducer,
        tenants: tenantsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware])

})


