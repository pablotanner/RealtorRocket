import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {LeasePaymentSchedule} from "../../utils/classes.ts";
import {CalendarClock, Eye} from "lucide-react";
import ViewPayment from "../payments/ViewPayment.js";
import {PaymentStatusBadge} from "../../utils/statusBadges.js";


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
            <div className="capitalize">#{row?.original?.id}</div>
        ),
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.id || "",
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
                <div className="capitalize font-600">
                    {moneyParser(row?.original?.amountDue)}
                </div>
            )
        },
        accessorFn: (row) => row?.amountDue || 0,
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
        id: "status",
        header: "Status",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <PaymentStatusBadge status={row?.original?.status} />
            )
        },
        accessorFn: (row) => row?.status,
        enableSorting: true,
    },
    {
        id: "lease",
        header: "Lease",
        cell: ({ row }) => {
            const lease = row.original?.lease;

            if (!lease) return "No Lease"
            return (
                <div>
                    #{lease?.id}
                </div>
            )
        },
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.leaseId || "",
        enableSorting: true,
    },
    {
        id: "tenant",
        header: "Tenant",
        cell: ({ row }) => {
            const tenant = row.original?.lease?.tenant;

            if (!tenant) return "No Tenant"
            return (
                <div>
                    {tenant?.firstName} {tenant?.lastName}
                </div>
            )
        },
        meta: {
            type: "string",
        },
        accessorFn: (row) => row?.lease?.tenantId,
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
                subtitle="These are the planned payments (payment deadlines) created for your leases."
                icon={<CalendarClock className={"w-5 h-5"} />} />

        </div>

    )
}

export default PaymentScheduleTable;