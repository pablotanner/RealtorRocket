import prisma from '../prisma.js';
import {generateMultiUnitIdentifier, generateSingleUnitIdentifier} from "../util/generateUnitIdentifier.js";


export async function getProperties(req, res) {
    try {
        // Get this user's properties
        const properties = await prisma.realEstateObject.findMany({
            where: {
                realtor: {
                    userId: req.user.userId
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                units: true,
                images: true
            }
        });


        res.status(200).json({data: properties });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting properties" });
    }
}

export async function createProperty(req, res) {
    try {

        // For each empty data, change it to null
        for (let key in req.body) {
            if (req.body[key] === "") {
                req.body[key] = null;
            }
        }

        const propertyTitle = req.body.title;


        let index = 0;
        for (let unit of req.body.units) {
            index++;
            for (let key in unit) {
                if (unit[key] === "") {
                    unit[key] = null;
                }
                unit.unitIdentifier = req.body.units.length > 1 ? generateMultiUnitIdentifier(propertyTitle, unit.unitNumber || index) : generateSingleUnitIdentifier(propertyTitle);
            }
        }


        // if there are no images, add a default image
        if (!req.body.images || req.body.images.length === 0) {
            req.body.images = [{
                imageUrl: "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg",
                userId: req.user.userId
            }]
        } else {
            // if there are images, add the userId to each image
            req.body.images = req.body.images.map(image => ({
                ...image,
                userId: req.user.userId
            }));
        }
            const newProperty = await prisma.realEstateObject.create({
                data: {
                    ...req.body,
                    realtor: {
                        connect: {
                            userId: req.user.userId
                        }
                    },
                    units: {
                        create: req.body.units
                    },
                    images: {
                        ...(req.body.images ? {create: req.body.images} : {}),
                    }
                },
                include: {
                    units: true,
                }
            });

            res.status(200).json({data: newProperty });
        }
        catch (error) {
        console.log(error)
            res.status(500).json({ message: "Error creating property" });
        }
}

export async function getProperty(req, res) {
    try {
        const property = await prisma.realEstateObject.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                units: true,
                images: true
            }
        });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        res.status(200).json({data: property });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting property" });
    }
}

export async function deleteProperty(req, res) {
    try {
        const property = await prisma.realEstateObject.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
        });

        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        await prisma.realEstateObject.delete({
            where: {
                id: parseInt(req.params.id),
            },
        });

        res.status(200).json({ message: "Property deleted" });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error deleting property" });
    }
}

// Get all units of user
export async function getUnits(req, res) {
    try {
        const units = await prisma.unit.findMany({
            where: {
                realEstateObject: {
                    realtor: {
                        userId: req.user.userId
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                realEstateObject: true,
                images: true,
                leases: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        res.status(200).json({data: units });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error getting units" });
    }
}

export async function getUnit(req, res) {
    try {
        const unit = await prisma.unit.findUnique({
            where: {
                id: parseInt(req.params.id),
            },
            include: {
                realEstateObject: {
                    include: {
                        images: true,
                        units: true
                    }
                },
                images: true,
                leases: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        res.status(200).json({data: unit });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting unit" });
    }
}

export async function updateUnit(req, res) {
    try {
        const unit = await prisma.unit.findUnique({
            where: {
                id: parseInt(req.params.id),
                realEstateObject: {
                    realtor: {
                        userId: req.user.userId
                    }
                }
            }
        })

        if (!unit) {
            return res.status(404).json({ message: "Unit not found" });
        }

        const updatedUnit = await prisma.unit.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: req.body,
            include: {
                realEstateObject: true,
                images: true,
                leases: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        res.status(200).json({data: updatedUnit });


    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error updating unit" });
    }
}
