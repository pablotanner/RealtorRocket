

export function getUnitsAssignedToTenant(tenant) {
    const units = tenant?.unit;
    if (!units || !units?.length) return null;

    return units.filter((unit) => unit?.tenantId === tenant?.id);
}