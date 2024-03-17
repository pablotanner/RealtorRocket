import {
    ColumnDef,
} from "@tanstack/react-table";
import {Checkbox} from "../ui/checkbox.tsx";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {Lease, RentPayment} from "../../utils/classes.ts";
import {Eye, MoreHorizontal, Pencil, Scroll, Trash2} from "lucide-react";
import {LeaseStatusBadge} from "../../utils/statusBadges.js";
import {LeaseStatus} from "../../utils/magicNumbers.js";
import Link from "../general/Link.tsx";
import {useMemo, useState} from "react";
import {useDeleteLeaseMutation} from "../../services/api/leaseApi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import EditLease from "../leases/EditLease";
import DeleteDialog from "../general/DeleteDialog";
import {useDeleteLeasesMutation, useUpdateLeasesMutation} from "../../services/api/bulkApi";
import {Button} from "../ui/button.tsx";
import ViewLease from "../leases/ViewLease.js";
import {isWithinInterval, subDays} from "date-fns";
import {ButtonGroup, ButtonGroupItem} from "../ui/button-group.tsx";



const LeaseActions = ({lease}) => {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false)

    const [deleteLease] = useDeleteLeaseMutation();

    return (
        <DropdownMenu>
            <EditLease lease={lease} open={editModalOpen} setIsOpen={setEditModalOpen} />

            <DeleteDialog
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title="Delete Lease"
                content="Are you sure you want to delete this lease? This action cannot be undone."
                onConfirm={() => deleteLease(lease?.id)}
            />

            {viewModalOpen && <ViewLease lease={lease} open={viewModalOpen} setOpen={setViewModalOpen} />}

            <DropdownMenuTrigger asChild className="cursor-pointer">
                <MoreHorizontal className="h-5 w-5 ml-3"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm gap-2" onClick={() => setViewModalOpen(true)}>
                        <Eye className="w-4 h-4"/>
                        View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                        <Pencil className="w-4 h-4 mr-2"/>
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm text-red-500"
                                      onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash2 className="w-4 h-4 mr-2"/>
                        Delete Lease
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
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
        id: "lease",
        header: "Lease",
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
        id: "tenant",
        header: "Tenant",
        cell: ({ row }) => {
            if (row?.original?.tenantId) {
                return (
                    <Link id={row.original.tenantId} type={"tenant"} />
                )
            }
            else {
                return (
                    <div className="capitalize text-red-600/90 font-500">No Tenant</div>
                )
            }
        },
        accessorFn: (row) => (row?.tenant?.firstName + " " + row?.tenant?.lastName) || "",
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
                <div className="capitalize">
                    {dateParser(row?.original?.startDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.startDate || "",
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
                <div className="capitalize">
                    {dateParser(row?.original?.endDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.endDate || "",
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
                <div className="capitalize">
                    {moneyParser(row?.original?.rentalPrice)}
                </div>
            )
        },
        accessorFn: (row) => row?.rentalPrice || "",
        enableSorting: true,
    },
    {
        id: "unit",
        header: "Unit",
        cell: ({ row }) => {
            if (row?.original?.unitId) {
                return (
                    <Link id={row.original.unitId} type={"unit"}  />
                )
            }
            else {
                return (
                    <div className="capitalize text-red-500">No Unit</div>
                )
            }
        },
        accessorFn: (row) => row?.unit?.unitIdentifier || "",
        meta: {
            type: "string",
        },
        enableSorting: true,
    },
    {
        id: "status",
        header: "Status",
        meta: {
            type: "enum",
            options: Object.values(LeaseStatus)
        },
        cell: ({ row }) => {
            return (
                <LeaseStatusBadge status={row?.original?.status} />
            )
        },
        accessorFn: (row) => row?.status || undefined,
        enableSorting: true,
    },
    {
        id: "paymentFrequency",
        header: "Payment Frequency",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.paymentFrequency?.toLowerCase()}
                </div>
            )
        },
        accessorFn: (row) => row?.paymentFrequency || "",
        enableSorting: true,
    },
    {
        id: "notes",
        header: "Notes",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.notes}
                </div>
            )
        },
        accessorFn: (row) => row?.notes || "",
        enableSorting: true,
    },
    {
        id: "specialTerms",
        header: "Special Terms",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.specialTerms}
                </div>
            )
        },
        accessorFn: (row) => row?.specialTerms || "",
        enableSorting: true,
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            const lease = row.original
            return (
                <LeaseActions lease={lease}/>
            )
        },
    },
]

const LeaseBulkActions = ({selectedRows}) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [updateLeases] = useUpdateLeasesMutation();
    const [deleteLeases] = useDeleteLeasesMutation();


    if (selectedRows.length === 0) {
        return null
    }


    const handleDeleteLeases = () => {
        deleteLeases(selectedRows)
    }

    const handleStatusChange = (status: string) => {
        const body = selectedRows.map((row) => {
            return {
                id: row.id,
                status: status
            }
        })

        updateLeases(body);
    }

    return (
        <DropdownMenu>
            <DeleteDialog
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title="Delete Leases"
                content={`You are about to delete ${selectedRows?.length} lease(s). Are you sure?`}
                onConfirm={handleDeleteLeases}
            />

            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Pencil className="w-4 h-4 mr-2"/> {selectedRows?.length} Selected
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Set Status
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {Object.keys(LeaseStatus).map((status) => (
                                <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
                                    {LeaseStatus[status]}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                </DropdownMenuGroup>

                <DropdownMenuSeparator/>

                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm text-red-500"
                                      onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash2 className="w-4 h-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}


const LeasesTable = ({ leases }) => {

    const [selectedRows, setSelectedRows] = useState<Lease[]>([])

    const [selectedFilter, setSelectedFilter] = useState("active")

    const filteredLeases = useMemo(() => {
        if (selectedFilter === "all") return leases
        if (selectedFilter === "active") {
            return leases?.filter((lease: Lease) => lease.status === "ACTIVE")
        }
        if (selectedFilter === "inactive") {
            return leases?.filter((lease: Lease) => lease.status !== "ACTIVE")
        }

    }, [selectedFilter, leases])


    return (
        <div className={"border-2 border-border p-4 rounded-lg "}>

            <DataTable
                data={filteredLeases}
                columns={columns}
                title="Leases"
                subtitle="These are all your leases."
                icon={<Scroll className={"w-5 h-5"} />}
                defaultSort={{id: "lease", desc: true}}
                onRowSelectionChange={(selectedRows: Lease[]) => setSelectedRows(selectedRows)}
            >

                <ButtonGroup
                    value={selectedFilter}
                    onValueChange={(value) => setSelectedFilter(value)}
                >
                    <ButtonGroupItem value={"all"} >
                        View All
                    </ButtonGroupItem>
                    <ButtonGroupItem value={"active"}>
                        Active
                    </ButtonGroupItem>
                    <ButtonGroupItem value={"inactive"}>
                        Inactive
                    </ButtonGroupItem>
                </ButtonGroup>

                <LeaseBulkActions selectedRows={selectedRows}/>

            </DataTable>

        </div>

    )
}

export default LeasesTable;