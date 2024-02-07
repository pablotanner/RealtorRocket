

export function generateMultiUnitIdentifier(propertyTitle, unitNumber) {
    const shortName = propertyTitle.split(" ").map(word => word[0]).join("");
    return `${shortName}-${unitNumber}`;
}

export function generateSingleUnitIdentifier(propertyTitle) {
    const shortName = propertyTitle.split(" ").map(word => word[0]).join("");
    return `${shortName}-1`;
}




