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

export async function updatePayment(req, res) {
    try {
        const { id } = req.params;
        const paymentData = req.body;

        const payment = await prisma.rentPayment.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                lease: {
                    include: {
                        realtor: true
                    }
                }
            }
        });

        // Make sure that either lease or submitter is user
        if (Number(payment.submittedBy) !== req.user.userId && payment.lease.realtor.userId !== req.user.userId) {
            res.status(403).json({ message: "Unauthorized to update payment" });
            return;
        }

        const updatedPayment = await prisma.rentPayment.update({
            where: {
                id: Number(id)
            },
            data: {
                ...paymentData
            }
        });

        res.status(200).json({data: updatedPayment });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating payment" });
    }
}

export async function deletePayment(req, res) {
    try {
        const { id } = req.params;

        const payment = await prisma.rentPayment.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                lease: {
                    include: {
                        realtor: true
                    }
                }
            }
        });

        // Make sure that either lease or submitter is user
        if (Number(payment.submittedBy) !== req.user.userId && payment.lease.realtor.userId !== req.user.userId) {
            res.status(403).json({ message: "Unauthorized to delete payment" });
            return;
        }

        await prisma.rentPayment.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({ message: "Payment deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting payment" });
    }
}

export async function updatePaymentSchedule(req, res){
    try {
        const { id } = req.params;
        const paymentScheduleData = req.body;

        const paymentSchedule = await prisma.leasePaymentSchedule.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                lease: {
                    include: {
                        realtor: true
                    }
                }
            }
        });

        // Make sure that either lease or submitter is user
        if (paymentSchedule.lease.realtor.userId !== req.user.userId) {
            res.status(403).json({ message: "Unauthorized to update payment" });
            return;
        }

        const updatedPaymentSchedule = await prisma.leasePaymentSchedule.update({
            where: {
                id: Number(id)
            },
            data: {
                ...paymentScheduleData
            }
        });

        res.status(200).json({data: updatedPaymentSchedule });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating payment schedule" });
    }
}

export async function deletePaymentSchedule(req, res) {
    try {
        const { id } = req.params;

        const paymentSchedule = await prisma.leasePaymentSchedule.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                lease: {
                    include: {
                        realtor: true
                    }
                }
            }
        });

        // Make sure that either lease or submitter is user
        if (paymentSchedule.lease.realtor.userId !== req.user.userId) {
            res.status(403).json({ message: "Unauthorized to delete payment" });
            return;
        }

        await prisma.leasePaymentSchedule.delete({
            where: {
                id: Number(id)
            }
        });

        res.status(200).json({ message: "Payment Schedule deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting payment schedule" });
    }
}