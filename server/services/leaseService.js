import prisma from '../prisma.js';


function calculatePaymentDates(startDate, endDate, paymentFrequency) {
  const paymentDates = [];
  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);
  while (currentDate <= lastDate) {
    paymentDates.push(new Date(currentDate));
    currentDate.setMonth(currentDate.getMonth() + paymentFrequency);
  }
  return paymentDates;
}


async function createLeaseWithPaymentSchedule(leaseData) {
  const paymentDates = calculatePaymentDates(
    leaseData.startDate,
    leaseData.endDate,
    leaseData.paymentFrequency
  );
  const lease = await prisma.lease.create({
    data: {
      ...leaseData,
      paymentDates: {
        create: paymentDates.map((date) => ({ date })),
      },
    },
  });
  return lease;
}
