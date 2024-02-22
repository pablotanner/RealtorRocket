import {
    ColumnDef,
} from "@tanstack/react-table";
import {Checkbox} from "../ui/checkbox.tsx";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {Lease, LeasePaymentSchedule} from "../../utils/classes.ts";
import {CalendarClock, Eye} from "lucide-react";

import {Badge} from "../ui/badge.tsx";
import ViewPayment from "../payments/ViewPayment.js";




const columns: ColumnDef<LeasePaymentSchedule>[] = [
    {
        id: "view",
        header: "",
        cell: ({ row }) => (
            <ViewPayment payment={row?.original}>
                <Eye className="w-5 h-5 hover:text-primary mt-1"/>
            </ViewPayment>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "id",
        header: "ID",
        cell: ({ row }) => (
            <div className="capitalize">{row?.original?.id}</div>
        ),
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.id || "",
        enableSorting: true,
    },
    {
        id: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {dateParser(row?.original?.dueDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.dueDate || "",
        meta: {
            type: "date",
        },
        enableSorting: true,

    },
    {
        id: "amountDue",
        header: "Amount Due",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {moneyParser(row?.original?.amountDue)}
                </div>
            )
        },
        accessorFn: (row) => row?.amountDue || 0,
        enableSorting: true,
    },
    {
        id: "status",
        header: "Status",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            let variant = "neutral"
            if (row?.original?.status === "PAID") {
                variant = "positive"
            }
            else if (row?.original?.status === "OVERDUE" ) {
                variant = "destructive"
            }
            else if (row?.original?.status === "PENDING" || row?.original?.status === "LATE"){
                variant = "warning"
            }
            else if (row?.original?.status === "CANCELLED" || row?.original?.status === "REJECTED") {
                variant = "purple"
            }


            
            return (
                <>
                    {/*@ts-expect-error variants are defined above */}
                    <Badge variant={variant}>
                        {row?.original?.status.toLowerCase()}
                    </Badge>
                </>
                    

            )
        },
        accessorFn: (row) => row?.status,
        enableSorting: true,
    },
]

const PaymentScheduleTable = ({ paymentSchedules }) => {

    return (
        <div className={"border-2 border-secondary p-4 rounded-lg"}>
            <DataTable
                data={paymentSchedules}
                columns={columns}
                defaultSort={{id: "dueDate", desc: false}}
                title="Planned Payments"
                subtitle="These are the payment schedules for your leases."
                icon={<CalendarClock className={"w-5 h-5"} />} />

        </div>

    )
}

export default PaymentScheduleTable;