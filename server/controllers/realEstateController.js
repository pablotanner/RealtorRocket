import prisma from '../prisma.js';

export async function getProperties(req, res) {
    try {
        // Get this user's properties
        const properties = await prisma.realEstateObject.findMany({
            where: {
                realtor: {
                    userId: req.user.userId
                }
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

            const newProperty = await prisma.realEstateObject.create({
                data: {
                    ...req.body,
                    realtor: {
                        connect: {
                            userId: req.user.userId
                        }
                    }
                },
            });

            res.status(200).json({data: newProperty });
        }
        catch (error) {
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

