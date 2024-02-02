import prisma from '../prisma.js';

export async function getProperties(req, res) {
    try {
        // Get this user's properties
        const properties = await prisma.realEstateObject.findMany({
            where: {
                realtor: {
                    userId: req.user.userId
                }
            },
            include: {
                units: true
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

        for (let unit of req.body.units) {
            for (let key in unit) {
                if (unit[key] === "") {
                    unit[key] = null;
                }
            }
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
                    }
                },
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
        res.status(500).json({ message: "Error deleting property" });
    }
}

