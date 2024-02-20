import prisma from '../prisma.js';


export async function createPayment(req, res) {
    try {
        const { leaseId, tenantId } = req.body;
        const paymentData = req.body;
        delete paymentData.leaseId;
        delete paymentData.tenantId;

        // Check if the submitter is the tenant or realtor
        const lease = await prisma.lease.findUnique({
            where: {
                id: leaseId
            },
            include: {
                realtor: true
            }
        });

        let approvalDate;

        if (lease.realtor.userId === req.user.userId) {
            approvalDate = new Date();
        }

        const newPayment = await prisma.rentPayment.create({
            data: {
                ...paymentData,
                submittedBy: String(req.user.userId),
                submissionDate: new Date(),
                approvalDate: approvalDate,
                lease: {
                    connect: {
                        id: leaseId
                    }
                },
                /*
                tenant: {
                    connect: {
                        id: tenantId
                    }
                 */
            }});

        res.status(200).json({data: newPayment });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error creating payment" });
    }
}

export async function getPayments(req, res) {
    try {
        const payments = await prisma.rentPayment.findMany({
            where: {
                lease: {
                    realtor: {
                        userId: req.user.userId
                    }
                }
            },
            include: {
                lease: true,
                tenant: true
            }
        });


        res.status(200).json({data: payments });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting payments" });
    }
}