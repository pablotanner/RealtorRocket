
import prisma from '../prisma.js';


// Get leases of realtor, either all or by unitId and/or tenantId
export async function getLeases(req, res) {
    // If provided, add unitId or tenantId
    const {unitId, tenantId} = req.query;

    try {
        let query = {}

        if (unitId) {
            query["unitId"] = parseInt(unitId)
        }
        if (tenantId) {
            query["tenantId"] = parseInt(tenantId)
        }

        query["realtor"] = {userId: req.user.userId}


        const leases = await prisma.lease.findMany({
            where: query,
            include: {
                tenant: true,
                unit: true
            },
            orderBy: {
                createdAt: "desc"
            },
        });

        res.status(200).json({data: leases });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error getting leases" });
    }
}

// Get a lease by leaseId
export async function getLease(req, res) {
    try {
        const lease = await prisma.lease.findUnique({
            where: {
                id: parseInt(req.params.id),
                realtor: {
                    userId: req.user.userId
                }
            },
            include: {
                tenant: true,
                unit: true
            }
        });

        if (!lease) {
            return res.status(404).json({ message: "Lease not found" });
        }

        res.status(200).json({data: lease });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting lease" });
    }
}

// Create lease
export async function createLease(req, res) {
    const {tenantId, unitId} = req.body;
    // Remove tenantId and unitId from req.body
    delete req.body.tenantId;
    delete req.body.unitId;


    try {
        const newLease = await prisma.lease.create({
            data: {
                ...req.body,
                tenant: {
                    connect: {
                        id: tenantId
                    }
                },
                unit: {
                    connect: {
                        id: unitId
                    }
                },
                realtor: {
                    connect: {
                        userId: req.user.userId
                    }
                }
            }
        });

        res.status(200).json({data: newLease });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating lease" });
    }
}
