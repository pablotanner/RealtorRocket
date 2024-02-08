import {createEntityAdapter, createSlice} from '@reduxjs/toolkit';
import {authApi} from "./authApi.js";

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


export const selectUnitsByPropertyId = (state, propertyId) => {
    return selectAllUnits(state).filter(unit => unit.realEstateObjectId === propertyId);
}

export const selectLeasesByUnitId = (state, unitId) => {
    return selectAllLeases(state).filter(lease => lease.unitId === unitId);
}

export const selectTenantsByLeaseId = (state, leaseId) => {
    return selectAllTenants(state).filter(tenant => tenant.leaseId === leaseId);
}

export const selectLeasesByTenantId = (state, tenantId) => {
    return selectAllLeases(state).filter(lease => lease.tenantId === tenantId);
}

export const selectUnitsByTenantId = (state, tenantId) => {
    const leases = selectLeasesByTenantId(state, tenantId);
    const units = [];
    leases.forEach(lease => {
        units.push(selectUnitById(state, lease.unitId));
    });
    return units;
}

export const selectPropertyByUnitId = (state, unitId) => {
    const unit = selectUnitById(state, unitId );
    return selectPropertyById(state, unit.realEstateObjectId);
}

export const selectPropertyByLeaseId = (state, leaseId) => {
    const lease = selectLeaseById(state, leaseId);
    const unit = selectUnitById(state, lease.unitId);
    return selectPropertyById(state, unit?.realEstateObjectId);
}

export const selectPropertyByTenantId = (state, tenantId) => {
    const units = selectUnitsByTenantId(state, tenantId);
    if (!units || units.length === 0) return null;
    return selectPropertyById(state, units[0]?.realEstateObjectId);
}

export const selectLeaseByTenantId = (state, tenantId) => {
    const leases = selectLeasesByTenantId(state, tenantId);
    if (!leases || leases.length === 0) return null;
    return leases[0];
}

export const selectLeaseByUnitId = (state, unitId) => {
    const leases = selectLeasesByUnitId(state, unitId);
    if (!leases || leases.length === 0) return null;
    return leases[0];
}

export const selectTenantByLeaseId = (state, leaseId) => {
    const tenants = selectTenantsByLeaseId(state, leaseId);
    if (!tenants || tenants.length === 0) return null;
    return tenants[0];
}

export const selectTenantByUnitId = (state, unitId) => {
    const lease = selectLeaseByUnitId(state, unitId);
    return selectTenantById(state, lease?.tenantId);
}

export const selectTenantByPropertyId = (state, propertyId) => {
    const lease = selectLeaseByPropertyId(state, propertyId);
    return selectTenantById(state, lease?.tenantId);
}


export const selectLeaseByPropertyId = (state, propertyId) => {
    const unit = selectUnitsByPropertyId(state, propertyId)[0];
    return selectLeaseByUnitId(state, unit?.id);
}

export const selectUnitByLeaseId = (state, leaseId) => {
    return selectUnitById(state, selectLeaseById(state, leaseId)?.unitId);
}

export const selectUnitByTenantId = (state, tenantId) => {
    return selectUnitById(state, selectLeaseByTenantId(state, tenantId)?.id);
}

export const selectUnitByPropertyId = (state, propertyId) => {
    return selectUnitById(state, selectLeaseByPropertyId(state, propertyId)?.id);
}
