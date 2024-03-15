import prisma from '../prisma.js';

async function createPaymentCore(data, user) {
    try {
        const { leaseId, tenantId } = data;
        const paymentData = data;
        const newLeasePaymentSchedule = paymentData.leasePaymentSchedule;
        delete paymentData.leasePaymentSchedule;
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

        if (lease.realtor.userId === user.userId) {
            approvalDate = new Date();
        }

        const newPayment = await prisma.rentPayment.create({
            data: {
                ...paymentData,
                submittedBy: user.userId,
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

        if (newLeasePaymentSchedule) {
            const paymentSchedule = await prisma.leasePaymentSchedule.findUnique({
                where: {
                    id: Number(newLeasePaymentSchedule.id),
                },
                include: {
                    lease: {
                        include: {
                            realtor: true
                        }
                    }
                }
            });

            if (paymentSchedule.lease.realtor.userId !== user.userId) {
                return { status: 403, message: "Unauthorized to update payment" };
            }

            const updatedSchedule = await prisma.leasePaymentSchedule.update({
                where: {
                    id: newLeasePaymentSchedule.id
                },
                data: {
                    status: newLeasePaymentSchedule.status,
                    amountDue: newLeasePaymentSchedule.amountDue
                }
            });

            if (updatedSchedule && newPayment) {
                return { status: 200, data: newPayment };
            }
            else {
                return { status: 500, message: "Error creating payment" };
            }
        }

        return { status: 200, data: newPayment };
    }
    catch (error) {
        console.log(error)
        return { status: 500, message: "Error creating payment" };
    }

}

export async function createPayment(req, res) {
    try {
        const newPayment = await createPaymentCore(req.body, req.user);
        res.status(newPayment.status).json(newPayment);
    }
    catch (error) {
        console.log(error);
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


// TODO: PaymentSchedules don't have creator and dont necessarily have lease, so currently impossible to connect to user
export async function updateManyPaymentSchedules(req, res) {
    try {
        const updatedPaymentSchedules = await prisma.$transaction(req.body.map(paymentSchedule => {
        return prisma.leasePaymentSchedule.update({
                where: {
                    id: paymentSchedule.id
                },
                data: {
                    ...paymentSchedule
                }
            });
        }))

        res.status(200).json({data: updatedPaymentSchedules });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating payment schedules" });
    }
}

export async function deleteManyPaymentSchedules(req, res) {
    try {
        const deletedPaymentSchedules = await prisma.$transaction(req.body.map(paymentSchedule => {
            return prisma.leasePaymentSchedule.delete({
                where: {
                    id: paymentSchedule.id
                }
            });
        }))

        res.status(200).json({ data: deletedPaymentSchedules });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting payment schedules" });
    }
}




export async function createManyPayments(req, res) {
    let successCount = 0;
    const newPayments =[]

    try {

        for (const payment of req.body) {
            const newPayment = await createPaymentCore(payment, req.user);
            if (newPayment.status === 200) {
                successCount++;
                newPayments.push(newPayment.data);
            }
        }

        res.status(200).json({data: newPayments, message: `${successCount} Payments created successfully`});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: `${successCount} Payment(s) created successfully, ${req.body.length - successCount} failed.`, data: newPayments });
    }
}

export async function updateManyPayments(req, res) {
    try {
        const updatedPayments = await prisma.$transaction(req.body.map(payment => {
            return prisma.rentPayment.update({
                where: {
                    id: payment.id
                },
                data: {
                    ...payment
                }
            });
        }))

        res.status(200).json({data: updatedPayments });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating payments" });
    }
}

export async function deleteManyPayments(req, res) {
    try {
        const deletedPayments = await prisma.$transaction(req.body.map(payment => {
            return prisma.rentPayment.delete({
                where: {
                    id: payment.id
                }
            });
        }))

        res.status(200).json({ data: deletedPayments });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting payments" });
    }
}