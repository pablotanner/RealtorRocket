import {
    ColumnDef,
} from "@tanstack/react-table";
import {Checkbox} from "../ui/checkbox.tsx";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {Lease} from "@prisma/client";



const columns: ColumnDef<Lease>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                // @ts-expect-error - TS doesn't understand that we're using a custom accessor
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "leaseId",
        header: "Lease ID",
        cell: ({ row }) => (
            <div className="capitalize">{row?.original?.id}</div>
        ),
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.id || undefined,
        enableSorting: true,
    },
    {
        id: "tenant",
        header: "Tenant",
        cell: ({ row }) => {
            // @ts-expect-error - TS doesn't understand that we're using a custom accessor
            if (row?.original?.tenant) {
                return (
                    // @ts-expect-error - TS doesn't understand that we're using a custom accessor
                    <div className="capitalize">{row?.original?.tenant?.firstName} {row?.original?.tenant?.lastName}</div>
                )
            }
            else {
                return (
                    <div className="capitalize text-red-500">No Tenant</div>
                )
            }
        },
        // @ts-expect-error - TS doesn't understand that we're using a custom accessor
        accessorFn: (row) => (row?.tenant?.firstName + row?.tenant?.lastName) || undefined,
        meta: {
            type: "string",
        },
        enableSorting: true,

    },
    {
        id: "startDate",
        header: "Start Date",
        meta: {
            type: "date",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {dateParser(row?.original?.startDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.startDate || undefined,
        enableSorting: true,

    },
    {
        id: "endDate",
        header: "End Date",
        meta: {
            type: "date",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {dateParser(row?.original?.endDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.endDate || undefined,
        enableSorting: true,

    },
    {
        id: "rentalPrice",
        header: "Rental Price",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {moneyParser(row?.original?.rentalPrice)}
                </div>
            )
        },
        accessorFn: (row) => row?.rentalPrice || undefined,
        enableSorting: true,

    },
    {
        id: "totalRentDue",
        header: "Total Rent Due",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {moneyParser(row?.original?.totalRentDue)}
                </div>
            )
        },
        accessorFn: (row) => row?.totalRentDue || undefined,
        enableSorting: true,

    },
    {
        id: "totalRentPaid",
        header: "Total Rent Paid",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {moneyParser(row?.original?.rentPaid)}
                </div>
            )
        },
        accessorFn: (row) => row?.rentPaid || undefined,
        enableSorting: true,

    },
    {
        id: "lastPaymentDate",
        header: "Last Payment Date",
        meta: {
            type: "date",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {dateParser(row?.original?.lastPaymentDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.lastPaymentDate || undefined,
        enableSorting: true,

    },

]

const LeasesTable = ({ leases }) => {

    return (
        <DataTable data={leases} columns={columns} />
    )
}

export default LeasesTable;