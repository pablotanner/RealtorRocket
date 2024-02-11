import {createEntityAdapter, createSelector, createSlice} from '@reduxjs/toolkit';
import {authApi} from "../api/authApi.js";

const propertiesAdapter = createEntityAdapter({
    selectId: (property) => property.id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const unitsAdapter = createEntityAdapter({
    selectId: (unit) => unit.id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const leasesAdapter = createEntityAdapter({
    selectId: (lease) => lease.id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});
const tenantsAdapter = createEntityAdapter({
    selectId: (tenant) => tenant.id,
    sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = {
    properties: propertiesAdapter.getInitialState(),
    units: unitsAdapter.getInitialState(),
    leases: leasesAdapter.getInitialState(),
    tenants: tenantsAdapter.getInitialState(),
}


/**
 * The addMatchers are used to update the properties/units/tenant/leases whenever the API call for them goes through,
 * the logic of when this happens is handled by the Tags in the API Slice.
 * These states are used to store the data from the API calls and offer lookups for the data (e.g. from property to tenant),
 * so that the API calls need to send less data.
 */


const propertySlice = createSlice({
    name: 'properties',
    initialState: initialState.properties,
    reducers: {
        propertyAdded: propertiesAdapter.addOne,
        propertiesAdded: propertiesAdapter.addMany,
        propertyUpdated: propertiesAdapter.updateOne,
        propertyRemoved: (state, action) => {
            propertiesAdapter.removeOne(state, action.payload);
            // Assuming you have a way to select all units for a property in state
            const relatedUnits = selectUnitsByPropertyId(state, action.payload);
            relatedUnits.forEach(unit => {
                unitsAdapter.removeOne(state, unit.id);
                // Assuming you have a way to select all leases for a unit in state
                const relatedLeases = selectLeasesByUnitId(state, unit.id);
                relatedLeases.forEach(lease => {
                    leasesAdapter.removeOne(state, lease.id);
                    // Assuming you have a way to select all tenants for a lease in state
                    const relatedTenants = selectTenantsByLeaseId(state, lease.id);
                    relatedTenants.forEach(tenant => {
                        tenantsAdapter.removeOne(state, tenant.id);
                    });
                });
            });
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.getProperties.matchFulfilled,
                (state, action) => {
                    propertiesAdapter.setAll(state, action.payload.data);
                }
            )
    },
})

const unitSlice = createSlice({
    name: 'units',
    initialState: initialState.units,
    reducers: {
        unitAdded: unitsAdapter.addOne,
        unitsAdded: unitsAdapter.addMany,
        unitUpdated: unitsAdapter.updateOne,
        unitRemoved: unitsAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.getUnits.matchFulfilled,
                (state, action) => {
                    unitsAdapter.setAll(state, action.payload.data);
                }
            )
    },
})

const leaseSlice = createSlice({
    name: 'leases',
    initialState: initialState.leases,
    reducers: {
        leaseAdded: leasesAdapter.addOne,
        leasesAdded: leasesAdapter.addMany,
        leaseUpdated: leasesAdapter.updateOne,
        leaseRemoved: leasesAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.getLeases.matchFulfilled,
                (state, action) => {
                    leasesAdapter.setAll(state, action.payload.data);
                }
            )
    },
})

const tenantSlice = createSlice({
    name: 'tenants',
    initialState: initialState.tenants,
    reducers: {
        tenantAdded: tenantsAdapter.addOne,
        tenantsAdded: tenantsAdapter.addMany,
        tenantUpdated: tenantsAdapter.updateOne,
        tenantRemoved: tenantsAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                authApi.endpoints.getTenants.matchFulfilled,
                (state, action) => {
                    tenantsAdapter.setAll(state, action.payload.data);
                }
            )
    },
})

export const {
    propertyAdded,
    propertiesAdded,
    propertyUpdated,
    propertyRemoved,
} = propertySlice.actions;

export const propertiesReducer = propertySlice.reducer;



export const {
    unitAdded,
    unitsAdded,
    unitUpdated,
    unitRemoved,
} = unitSlice.actions;

export const unitsReducer = unitSlice.reducer;

export const {
    leaseAdded,
    leasesAdded,
    leaseUpdated,
    leaseRemoved,
} = leaseSlice.actions;

export const leasesReducer = leaseSlice.reducer;

export const {
    tenantAdded,
    tenantsAdded,
    tenantUpdated,
    tenantRemoved,
} = tenantSlice.actions;

export const tenantsReducer = tenantSlice.reducer;


export const {
    selectAll: selectAllProperties,
    selectIds: selectPropertyIds,
    selectById: selectPropertyById,
} = propertiesAdapter.getSelectors((state) => state.properties);

export const {
    selectAll: selectAllUnits,
    selectById: selectUnitById,
    selectIds: selectUnitIds,
} = unitsAdapter.getSelectors((state) => state.units);

export const {
    selectAll: selectAllLeases,
    selectById: selectLeaseById,
    selectIds: selectLeaseIds,
} = leasesAdapter.getSelectors((state) => state.leases);

export const {
    selectAll: selectAllTenants,
    selectById: selectTenantById,
    selectIds: selectTenantIds,
} = tenantsAdapter.getSelectors((state) => state.tenants);



export const selectPropertiesByPropertyId = createSelector(
    selectAllProperties,
    (_, propertyId) => propertyId,
    (properties, propertyId) => {
        if (!propertyId) return [];
        else if (String(propertyId).toLowerCase() === 'all') {
            return properties;
        }
        return properties.filter(property => property.id === propertyId);
    }
)



export const selectUnitsByPropertyId = createSelector(
    [selectAllUnits, selectAllLeases, (_, propertyId) => propertyId],
    (units, leases, propertyId) => {
        if (!propertyId) return [];
        else if (String(propertyId).toLowerCase() === 'all') {
            return units;
        }
        return units.filter(unit => unit.realEstateObjectId === propertyId).map(unit => {
            // Directly filter leases without using selectLeasesByUnitId to avoid breaking memoization
            const unitLeases = leases.filter(lease => lease.unitId === unit.id);
            return {...unit, leases: unitLeases};
        });
    }
);

export const selectLeasesByPropertyId = createSelector(
    [selectAllLeases, (state) => state, (_, propertyId) => propertyId], // Pass the entire state to the selector
    (leases, state, propertyId) => {
        if (!propertyId) return [];
        else if (String(propertyId).toLowerCase() === 'all') {
            return leases;
        }

        // Now we correctly pass the whole state and the propertyId to selectUnitsByPropertyId
        const units = selectUnitsByPropertyId(state, propertyId);


        // Assuming units have a property that can be used to link them to leases, e.g., `leaseId`
        const leaseIds = units.map(unit => unit.leaseId); // Ensure this matches your data model
        return leases.filter(lease => leaseIds.includes(lease.id));
    }
);



export const selectLeasesByUnitId = createSelector(
    [selectAllLeases, (_, unitId) => unitId],
    (leases, unitId) => {
        console.log(leases)
        return leases.filter(lease => lease.unitId === unitId)
    }
)


export const selectTenantsByPropertyId = (state, propertyId) => {
    if (!propertyId) return [];
    else if (String(propertyId).toLowerCase() === 'all') {
        return selectAllTenants(state);
    }
    const units = selectUnitsByPropertyId(state, propertyId);
    const tenants = [];
    units.forEach(unit => {
        const leases = selectLeasesByUnitId(state, unit.id);
        leases.forEach(lease => {
            const tenant = selectTenantById(state, lease.tenantId);
            if (tenant) tenants.push(tenant);
        });
    });
    return tenants.filter((tenant) => tenant !== undefined);
}

export const selectTenantsByLeaseId = (state, leaseId) => {
    if (!leaseId) return [];
    return selectAllTenants(state).filter(tenant => tenant.leaseId === leaseId);
}

export const selectLeasesByTenantId = (state, tenantId) => {
    if (!tenantId) return [];
    return selectAllLeases(state).filter(lease => lease.tenantId === tenantId);
}

export const selectUnitsByTenantId = (state, tenantId) => {
    if (!tenantId) return [];
    const leases = selectLeasesByTenantId(state, tenantId);
    const units = [];
    leases.forEach(lease => {
        const unit = selectUnitById(state, lease.unitId);
        if (unit) units.push(unit);
    });
    return units;
}

export const selectPropertyByUnitId = (state, unitId) => {
    if (!unitId) return null;
    const unit = selectUnitById(state, unitId );
    if (!unit) return null;
    return selectPropertyById(state, unit.realEstateObjectId);
}

export const selectPropertyByLeaseId = (state, leaseId) => {
    if (!leaseId) return null;
    const lease = selectLeaseById(state, leaseId);
    if (!lease) return null;
    const unit = selectUnitById(state, lease.unitId);
    if (!unit) return null;
    return selectPropertyById(state, unit?.realEstateObjectId);
}

export const selectPropertyByTenantId = (state, tenantId) => {
    if (!tenantId) return null;
    const units = selectUnitsByTenantId(state, tenantId);
    if (!units || units.length === 0) return null;
    return selectPropertyById(state, units[0]?.realEstateObjectId);
}

export const selectLeaseByTenantId = (state, tenantId) => {
    if (!tenantId) return null;
    const leases = selectLeasesByTenantId(state, tenantId);
    if (!leases || leases.length === 0) return null;
    return leases[0];
}

export const selectLeaseByUnitId = (state, unitId) => {
    if (!unitId) return null;
    const leases = selectLeasesByUnitId(state, unitId);
    if (!leases || leases.length === 0) return null;
    return leases[0];
}

export const selectTenantByLeaseId = (state, leaseId) => {
    if (!leaseId) return null;
    const tenants = selectTenantsByLeaseId(state, leaseId);
    if (!tenants || tenants.length === 0) return null;
    return tenants[0];
}

export const selectTenantByUnitId = (state, unitId) => {
    if (!unitId) return null;
    const lease = selectLeaseByUnitId(state, unitId);
    if (!lease) return null;
    return selectTenantById(state, lease?.tenantId);
}

export const selectTenantByPropertyId = (state, propertyId) => {
    if (!propertyId) return null;
    const lease = selectLeaseByPropertyId(state, propertyId);
    if (!lease) return null;
    return selectTenantById(state, lease?.tenantId);
}


export const selectLeaseByPropertyId = (state, propertyId) => {
    if (!propertyId) return null;
    const unit = selectUnitsByPropertyId(state, propertyId)[0];
    if (!unit) return null;
    return selectLeaseByUnitId(state, unit?.id);
}

export const selectUnitByLeaseId = (state, leaseId) => {
    if (!leaseId) return null;
    return selectUnitById(state, selectLeaseById(state, leaseId)?.unitId);
}

export const selectUnitByTenantId = (state, tenantId) => {
    if (!tenantId) return null;
    const lease = selectLeaseByTenantId(state, tenantId);
    if (!lease) return null;
    return selectUnitById(state, lease?.unitId);
}
