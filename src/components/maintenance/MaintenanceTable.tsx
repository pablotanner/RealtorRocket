import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser } from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {MaintenanceRequest} from "../../utils/classes.ts";
import {Drill} from "lucide-react";
import {MaintenanceStatus, Priority} from "../../utils/magicNumbers";
import {MaintenanceStatusBadge, PriorityBadge} from "../../utils/statusBadges";
import Link from "../general/Link.tsx";


const columns: ColumnDef<MaintenanceRequest>[] = [
    {
        id: "createdAt",
        header: "Creation Date",
        cell: ({ row }) => (
            <div className="capitalize">{dateParser(row?.original?.createdAt)}</div>
        ),
        meta: {
            type: "date",
        },
        accessorFn: (row) => new Date(row?.createdAt) || "",
        enableSorting: true,
    },
    {
        id: "title",
        header: "Title",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.title}
                </div>
            )
        },
        accessorFn: (row) => row?.title || "",
        enableSorting: true,
    },
    {
        id: "status",
        header: "Status",
        meta: {
            type: "enum",
            options: Object.values(MaintenanceStatus),
        },
        cell: ({ row }) => {

            return (
                <MaintenanceStatusBadge status={row?.original?.status} />
            )
        },
        accessorFn: (row) => row?.status,
        enableSorting: true,
    },
    {
        id: "priority",
        header: "Priority",
        meta: {
            type: "enum",
            options: Object.values(Priority),
        },
        cell: ({ row }) => {

            return (
                <PriorityBadge priority={row?.original?.priority} />
            )
        },
        accessorFn: (row) => row?.priority,
        enableSorting: true,
    },
    {
        id: "unit",
        header: "Unit",
        cell: ({ row }) => {
            const unit = row.original?.unit;

            if (!unit) return <p className="text-red-600/90">
                No Unit
            </p>
            return (
                <Link id={unit.id} type={"unit"}  />
            )
        },
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.unit?.unitIdentifier || "",
        enableSorting: true,
    },
    {
        id: "category",
        header: "Category",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.category}
                </div>
            )
        },
        accessorFn: (row) => row?.category || "",
        enableSorting: true,
    },
]

const MaintenanceTable = ({ maintenanceReports, ...props }) => {

    return (
        <div className={"border-2 border-border p-4 rounded-lg"}>
            <DataTable
                data={maintenanceReports}
                columns={columns}
                defaultSort={{id: "createdAt", desc: true}}
                title="Maintenance Reports"
                subtitle="All maintenance reports for your properties."
                icon={<Drill className={"w-5 h-5"} />}
                {...props}
            >
                {props.children}
            </DataTable>

        </div>

    )
}
export default MaintenanceTable;