

export function getNextScheduledPayment(lease) {
    if (!lease?.paymentSchedule?.length) return null;

    // Sort the payments by due date
    const sortedPayments = [...lease.paymentSchedule].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    // Find the next payment (that isn't paid)
    const nextPayment = sortedPayments.find((payment) => payment.status !== "PAID" && payment.status !== "WAIVED");

    if (!nextPayment) return null;

    return nextPayment;
}

export function getScheduledPaymentStatus (scheduledPayment, paymentAmount) {
    if (!scheduledPayment || !scheduledPayment?.status) return null

    if (scheduledPayment.amountDue - paymentAmount <= 0) return "PAID"
    if (scheduledPayment.amountDue - paymentAmount > 0) return "PARTIALLY_PAID"
    else return scheduledPayment.status;

}