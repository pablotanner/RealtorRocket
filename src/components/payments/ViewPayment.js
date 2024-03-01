import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "../ui/dialog.tsx";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {useSelector} from "react-redux";
import {selectLeaseById} from "../../services/slices/objectSlice.js";


const ViewPayment = ({payment, ...props}) => {

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

    return (
        <Dialog>
            <DialogTrigger>
                {props.children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        View Payment
                    </DialogTitle>
                </DialogHeader>
                <div>
                    {entries.map((entry, index) => (
                        <div key={index} className="flex flex-row justify-between">
                            <p className="text-gray-600 font-400">
                                {entry.label}
                            </p>
                            <p className="max-w-[50%]">
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