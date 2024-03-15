import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogIcon,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog.tsx";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {useSelector} from "react-redux";
import {selectLeaseById} from "../../services/slices/objectSlice.js";
import {Coins, CalendarClock} from "lucide-react";
import {cn} from "../../utils.ts";


const ViewPayment = ({payment, open, setOpen, ...props}) => {

    const userData = useSelector(state => state.authSlice.userInfo)

    const lease = useSelector(state => selectLeaseById(state, payment?.leaseId))

    const getTenantName = () => {
        if (lease.tenant) {
            return `${lease.tenant.firstName} ${lease.tenant.lastName}`
        }
        return "-"
    }

    const paymentEntries = [
        {
            label: "Amount",
            value: moneyParser(payment.amount)
        },
        {
            label: "Date",
            value: dateParser(payment.date)
        },
        {
            label: "Status",
            value: payment.status,
        },
        {
            label: "Submitted By",
            value: Number(payment.submittedBy) === userData.id ? "You" : "Tenant"
        },
        {
            label: "Submission Date",
            value: dateParser(payment.submissionDate)
        },
        {
            label: "Approval Date",
            value: dateParser(payment.approvalDate)
        },
        {
            label: "Payment Method",
            value: payment.paymentMethod
        },
        {
            label: "Notes",
            value: payment.notes
        },
        {
            label: "Lease",
            value: payment.leaseId,
        },
        {
            label: "Tenant",
            value: getTenantName()
        }
    ]

    const paymentScheduleEntries = [
        {
            label: "Amount Due",
            value: moneyParser(payment.amountDue)
        },
        {
            label: "Due Date",
            value: dateParser(payment.dueDate)
        },
        {
            label: "Status",
            value: payment.status,
        },
        {
            label: "Lease",
            value: payment.leaseId,
        },
        {
            label: "Tenant",
            value: `${lease.tenant?.firstName} ${lease?.tenant?.lastName}`
        }
    ]

    const entries = payment.dueDate ? paymentScheduleEntries : paymentEntries;
    const title = payment.dueDate ? "View Planned Payment" : "View Payment"
    const description = payment.dueDate ? "The details of the payment schedule are displayed below." : "The details of the payment are displayed below."

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogIcon>
                        {payment.dueDate ? <CalendarClock className="w-6 h-6"/> : <Coins className="w-6 h-6"/>}
                    </DialogIcon>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {entries.map((entry, index) => (
                            <div key={index} className="flex flex-row justify-between">
                                <p className="text-foreground font-400">
                                    {entry.label}
                                </p>
                                <p className="max-w-[50%] text-muted-foreground">
                                    {entry.value || "-"}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}


export default ViewPayment;