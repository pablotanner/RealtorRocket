
import prisma from '../prisma.js';
import {createLeaseWithPaymentSchedule} from "../services/leaseService.js";


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
                unit: true,
                paymentSchedule: true,
                rentPayments: true,
                expenses: true
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
                unit: true,
                paymentSchedule: true
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

    try {
        const lease = await createLeaseWithPaymentSchedule(req.body,  req.user.userId);

        res.status(200).json({data: lease });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating lease" });
    }
}

export async function updateLease(req, res) {
    try {
        const lease = await prisma.lease.update({
            where: {
                id: parseInt(req.params.id),
                realtor: {
                    userId: req.user.userId
                }
            },
            data: req.body,
            include: {
                tenant: true,
                unit: true,
                paymentSchedule: true
            }
        });

        res.status(200).json({data: lease });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating lease" });
    }
}

export async function deleteLease(req, res) {
    try {
        const lease = await prisma.lease.delete({
            where: {
                id: parseInt(req.params.id),
                realtor: {
                    userId: req.user.userId
                }
            }
        });

        res.status(200).json({data: lease });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting lease" });
    }
}

export async function updateManyLeases(req, res) {
    try {
        const updatedLeases = await prisma.$transaction(req.body.map(lease => {
            return prisma.lease.update({
                where: {
                    id: lease.id,
                    realtor: {
                        userId: req.user.userId
                    }
                },
                data: lease
            })
        }))

        res.status(200).json({data: updatedLeases });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating leases" });
    }
}

export async function deleteManyLeases(req, res) {
    try {
        const deletedLeases = await prisma.$transaction(req.body.map(lease => {
            return prisma.lease.delete({
                where: {
                    id: lease.id,
                    realtor: {
                        userId: req.user.userId
                    }
                }
            })
        }))

        res.status(200).json({data: deletedLeases });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting leases" });
    }
}