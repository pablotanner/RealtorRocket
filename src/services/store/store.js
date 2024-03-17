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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { financialsApi } from "../api/financialsApi.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { messageApi } from "../api/messageApi.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { maintenanceApi } from "../api/maintenanceApi.js";

import {
    leasesReducer,
    paymentsReducer,
    propertiesReducer,
    tenantsReducer,
    unitsReducer,
    maintenanceReducer,
    expensesReducer
} from "../slices/objectSlice.js";
import { configureStore } from '@reduxjs/toolkit/react'
import {eventsReducer} from "../slices/eventSlice.js";
import {messagesReducer} from "../slices/messageSlice.js";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        authSlice: authSlice,
        userSlice: userSlice,
        properties: propertiesReducer,
        units: unitsReducer,
        leases: leasesReducer,
        payments: paymentsReducer,
        tenants: tenantsReducer,
        maintenance: maintenanceReducer,
        events: eventsReducer,
        messages: messagesReducer,
        expenses: expensesReducer


    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({}).concat([authApi.middleware])

})


