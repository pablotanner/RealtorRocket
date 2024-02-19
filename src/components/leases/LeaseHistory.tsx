import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {ColumnDef} from "@tanstack/react-table";
import {Lease} from "../../utils/classes.ts";
import {Button} from "../ui/button.tsx";
import {FilePlus2, Scroll} from "lucide-react";
import AddLease from "./AddLease.js";
import {useState} from "react";

const columns: ColumnDef<Lease>[] = [
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
]

const LeaseHistory = ({leases, ...props}) => {

    return (
            <DataTable data={leases} columns={columns} title="Lease History" icon={<Scroll className={"w-5 h-5"} />}
                       defaultSort={{id: "startDate", desc: true}}
            >
                {props.children}
            </DataTable>
        )
}

export default LeaseHistory;