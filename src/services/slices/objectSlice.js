import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {authApi} from "../api/authApi.js";

const propertiesAdapter = createEntityAdapter({
    selectId: (property) => property.id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});
const unitsAdapter = createEntityAdapter({
    selectId: (unit) => unit.id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});
const leasesAdapter = createEntityAdapter({
    selectId: (lease) => lease.id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});
const tenantsAdapter = createEntityAdapter({
    selectId: (tenant) => tenant.id,
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
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

export const selectPropertiesByPropertyId = (state, propertyId) => {
    if (!propertyId) return [];
    else if (String(propertyId).toLowerCase() === 'all') {
        return selectAllProperties(state);
    }
    return selectAllProperties(state).filter(property => property.id === propertyId);
}


export const selectUnitsByPropertyId = (state, propertyId) => {
    if (!propertyId) return [];
    else if (String(propertyId).toLowerCase() === 'all') {
        return selectAllUnits(state);
    }
    return selectAllUnits(state).filter(unit => unit.realEstateObjectId === propertyId);
}

export const selectLeasesByUnitId = (state, unitId) => {
    if (!unitId) return [];
    return selectAllLeases(state).filter(lease => lease.unitId === unitId);
}

export const selectLeasesByPropertyId = (state, propertyId) => {
    if (!propertyId) return [];
    if (String(propertyId).toLowerCase() === 'all') {
        return selectAllLeases(state);
    }
    const units = selectUnitsByPropertyId(state, propertyId);
    const leases = [];
    units.forEach(unit => {
        leases.push(...selectLeasesByUnitId(state, unit.id));
    });
    return leases;
}

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
            tenants.push(selectTenantById(state, lease.tenantId));
        });
    });
    return tenants;
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
        units.push(selectUnitById(state, lease.unitId));
    });
    return units;
}

export const selectPropertyByUnitId = (state, unitId) => {
    if (!unitId) return null;
    const unit = selectUnitById(state, unitId );
    return selectPropertyById(state, unit.realEstateObjectId);
}

export const selectPropertyByLeaseId = (state, leaseId) => {
    if (!leaseId) return null;
    const lease = selectLeaseById(state, leaseId);
    const unit = selectUnitById(state, lease.unitId);
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
    return selectTenantById(state, lease?.tenantId);
}

export const selectTenantByPropertyId = (state, propertyId) => {
    if (!propertyId) return null;
    const lease = selectLeaseByPropertyId(state, propertyId);
    return selectTenantById(state, lease?.tenantId);
}


export const selectLeaseByPropertyId = (state, propertyId) => {
    if (!propertyId) return null;
    const unit = selectUnitsByPropertyId(state, propertyId)[0];
    return selectLeaseByUnitId(state, unit?.id);
}

export const selectUnitByLeaseId = (state, leaseId) => {
    if (!leaseId) return null;
    return selectUnitById(state, selectLeaseById(state, leaseId)?.unitId);
}

export const selectUnitByTenantId = (state, tenantId) => {
    if (!tenantId) return null;
    return selectUnitById(state, selectLeaseByTenantId(state, tenantId)?.id);
}

export const selectUnitByPropertyId = (state, propertyId) => {
    if (!propertyId) return null;
    return selectUnitById(state, selectLeaseByPropertyId(state, propertyId)?.id);
}
