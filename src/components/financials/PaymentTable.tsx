import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {RentPayment} from "../../utils/classes.ts";
import { Coins} from "lucide-react";

import {Badge} from "../ui/badge.tsx";




const columns: ColumnDef<RentPayment>[] = [
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
        id: "amount",
        header: "Amount",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-600">
                    {moneyParser(row?.original?.amount)}
                </div>
            )
        },
        accessorFn: (row) => row?.amount || 0,
        enableSorting: true,
    },
    {
        id: "paymentDate",
        header: "Payment Date",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {dateParser(row?.original?.date)}
                </div>
            )
        },
        accessorFn: (row) => row?.date || "",
        meta: {
            type: "date",
        },
        enableSorting: true,
    },
    {
        id: "submissionDate",
        header: "Submission Date",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {dateParser(row?.original?.submissionDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.submissionDate || "",
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
                        {row?.original?.status?.toLowerCase() || "Unknown"}
                    </Badge>
                </>


            )
        },
        accessorFn: (row) => row?.status,
        enableSorting: true,
    },
    {
        id: "paymentMethod",
        header: "Payment Method",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.paymentMethod}
                </div>
            )
        },
        accessorFn: (row) => row?.paymentMethod || "",
        meta: {
            type: "string",
        },
        enableSorting: true,
    },
    {
        id: "leaseId",
        header: "Lease ID",
        cell: ({ row }) => (
            <div className="capitalize">{row?.original?.leaseId}</div>
        ),
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.leaseId || "",
        enableSorting: true,
    },
    {
        id: "tenantId",
        header: "Tenant ID",
        cell: ({ row }) => (
            <div className="capitalize">{row?.original?.tenantId}</div>
        ),
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.tenantId || "",
        enableSorting: true,
    },
]

const PaymentTable = ({ payments, ...props }) => {

    return (
        <div className={"border-2 border-secondary p-4 rounded-lg"}>
            <DataTable
                data={payments}
                columns={columns}
                defaultSort={{id: "date", desc: false}}
                title="Payments"
                subtitle="These are your payments, either created by yourself or by your tenants."
                icon={<Coins className={"w-5 h-5"} />}
            >
                {props.children}
            </DataTable>

        </div>

    )
}

export default PaymentTable;