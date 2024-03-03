import prisma from "../prisma.js";

export async function checkOverduePayments() {
  const now = new Date();

  try {
    // Find all payment schedules that are overdue and not already marked as OVERDUE
    const overdueSchedules = await prisma.leasePaymentSchedule.findMany({
      where: {
        dueDate: {
          lt: now,
        },
        AND: {
          status: "SCHEDULED"
        }
      }
    });

    // Update each overdue schedule to mark it as OVERDUE
    const updatePromises = overdueSchedules.map(schedule =>
        prisma.leasePaymentSchedule.update({
          where: {id: schedule.id},
          data: {status: 'OVERDUE'},
        })
    );

    await Promise.all(updatePromises);
    console.log(`Marked ${updatePromises?.length} payment schedules as OVERDUE.`);

  } catch (error) {
    console.log("error finding overdue payments", error);
  }
}