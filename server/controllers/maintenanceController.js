import prisma from '../prisma.js';

// When report is created by Realtor
export async function createMaintenanceReport(req, res) {
    try {
        const userId = req.user.userId;
        const {unitId, reporterId} = req.body;
        delete req.body.unitId;
        delete req.body.reporterId;
        const newMaintenanceReport = await prisma.maintenanceRequest.create({
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
                reporter: {
                    ...(reporterId) ? {connect: {id: reporterId}} : {}
                }
            }
        });

        res.status(200).json({data: newMaintenanceReport });
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ message: "Error creating maintenance report" });
    }
}


export async function getMaintenanceReports(req, res) {
    try {
        const userId = req.user.userId;

        const maintenanceReports = await prisma.maintenanceRequest.findMany({
            where: {
                OR: [
                    {
                        realtor: {
                            userId: userId
                        }
                    },
                    {
                        reporter: {
                            userId: userId
                        }
                    }
                ]
            }
        })

        res.status(200).json({data: maintenanceReports });
    }
    catch (e) {
        res.status(500).json({ message: "Error getting maintenance reports" });
    }
}