import {
    ColumnDef,
    ColumnFiltersState, flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem} from "../ui/dropdown-menu.tsx";
import {Checkbox} from "../ui/checkbox.tsx";
import {Button} from "../ui/button.tsx";
import {ArrowUpDown, ChevronDown, LinkIcon, MoreHorizontal} from "lucide-react";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {Input} from "../ui/input.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";

class Tenant {
    id: string;
    firstName: string;
    lastName: string;
}

class Lease {
    id: string;
    startDate: string;
    endDate: string;
    rentalPrice: number;
    unit: Unit;
    tenant: Tenant;
    totalRentPaid: number;
    totalRentDue: number;
    lastPaymentDate: string;
}

class Unit {
    id: string;
    unitNumber: string;
    floor: number;
    unitSize: number;
    numOfFloors: number;
    numOfRooms: number;
    numOfBathrooms: number;
    numOfBedrooms: number;
    rentalPrice: number;
    status: string;
    leases: Lease[];
}


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
            if (row?.original?.tenant) {
                return (
                    <div className="capitalize">{row?.original?.tenant?.firstName} {row?.original?.tenant?.lastName}</div>
                )
            }
            else {
                return (
                    <div className="capitalize text-red-500">No Tenant</div>
                )
            }
        },
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
                    {moneyParser(row?.original?.totalRentPaid)}
                </div>
            )
        },
        accessorFn: (row) => row?.totalRentPaid || undefined,
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