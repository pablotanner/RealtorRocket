import prisma from '../prisma.js';


export async function createExpense(req, res) {
    try {
        const userId = req.user.userId;
        const {unitId, leaseId, maintenanceRequestId} = req.body;
        delete req.body.unitId;
        delete req.body.leaseId;
        delete req.body.maintenanceRequestId;

        // Make sure that the Unit, Lease and MaintenanceRequest (if provided) belong to user/realtor
        if (unitId) {
            const unit = await prisma.unit.findFirst({
                where: {
                    id: unitId,
                    realEstateObject: {
                        realtor: {
                            userId: req.user.userId
                        }
                    },
                }
            });
            if (!unit) {
                return res.status(400).json({ message: "Unit not found" });
            }
        }
        if (leaseId) {
            const lease = await prisma.lease.findFirst({
                where: {
                    id: leaseId,
                    realtor: {
                        userId: req.user.userId
                    }
                }
            });
            if (!lease) {
                return res.status(400).json({ message: "Lease not found" });
            }
        }

        if (maintenanceRequestId) {
            const maintenanceRequest = await prisma.maintenanceRequest.findFirst({
                where: {
                    id: maintenanceRequestId,
                    realtor: {
                        userId: req.user.userId
                    }
                }
            });
            if (!maintenanceRequest) {
                return res.status(400).json({ message: "Maintenance request not found" });
            }
        }

        const newExpense = await prisma.expense.create({
            data: {
                ...req.body,
                realtor: {
                    connect: {
                        userId: userId
                    }
                },
                unit: {
                    ...(unitId) ? {connect: {id: unitId}} : {}
                },
                lease: {
                    ...(leaseId) ? {connect: {id: leaseId}} : {}
                },
                maintenanceRequest: {
                    ...(maintenanceRequestId) ? {connect: {id: maintenanceRequestId}} : {}
                }
            }
        });

        res.status(200).json({data: newExpense });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Error creating expense" });
    }
}


export async function getExpenses(req, res){
    try {
        const userId = req.user.userId;
        const expenses = await prisma.expense.findMany({
            where: {
                realtor: {
                    userId: userId
                }
            }
        })

        res.status(200).json({data: expenses });
    }
    catch (e) {
        res.status(500).json({ message: "Error getting expenses" });
    }
}

export async function deleteExpense(req, res){
    try {
        const userId = Number(req.user.userId);
        const expenseId = Number(req.params.id);
        const expense = await prisma.expense.findFirst({
            where: {
                id: expenseId,
                realtor: {
                    userId: userId
                }
            }
        });

        if (!expense) {
            return res.status(400).json({ message: "Expense not found" });
        }

        await prisma.expense.delete({
            where: {
                id: expenseId
            }
        });

        res.status(200).json({data: expense });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Error deleting expense" });
    }
}
