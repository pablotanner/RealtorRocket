import prisma from '../prisma.js';


function calculatePaymentDates(startDate, endDate, paymentFrequency) {
  const paymentDates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    paymentDates.push(new Date(currentDate));
    if (paymentFrequency === "WEEKLY") {
        currentDate.setDate(currentDate.getDate() + 7);
    }
    else if (paymentFrequency === "MONTHLY") {
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    else if (paymentFrequency === "YEARLY") {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
    }
    else if (paymentFrequency === "QUARTERLY") {
      currentDate.setMonth(currentDate.getMonth() + 3);
    }
    else {
      return [];
    }
  }
  return paymentDates;
}

export async function createLeaseWithPaymentSchedule(leaseData, userId) {
  const paymentDates = calculatePaymentDates(
    leaseData.startDate,
    leaseData.endDate,
    leaseData.paymentFrequency
  );

  const data = {...leaseData};

  delete data.unitId;
  delete data.tenantId;

  const lease = await prisma.lease.create({
    data: {
      ...data,
      tenant: {
        connect: {
          id: leaseData.tenantId,
        },
      },
      unit: {
            connect: {
                id: leaseData.unitId,
            },
        },
      realtor: {
            connect: {
                userId: userId,
            },
        },
    },
  });

  const paymentSchedules = await prisma.leasePaymentSchedule.createMany({
    data: paymentDates.map((date) => ({
      dueDate: date,
      amountDue: leaseData.rentalPrice,
      leaseId: lease.id,
    })),
  })

    const updatedLease = await prisma.lease.findUnique({
        where: {
        id: lease.id,
        },
        include: {
        tenant: true,
        unit: true,
        paymentSchedule: true,
        },
    });


  return updatedLease;
}