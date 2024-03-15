import {ColumnDef} from "@tanstack/react-table";
import {Tenant} from "../../utils/classes.ts";
import {Checkbox} from "../ui/checkbox.tsx";
import {dateParser} from "../../utils/formatters.js";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Button} from "../ui/button.tsx";
import {MoreHorizontal, Pencil, Send, Trash2, UserRound} from "lucide-react";
import {DataTable} from "../ui/data-table.js";
import {Avatar, AvatarFallback} from "../ui/avatar.tsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectUnitsByLeaseIds, selectUnitsByTenantId} from "../../services/slices/objectSlice.js";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip.tsx";
import {Badge} from "../ui/badge.tsx";
import {useDeleteTenantMutation} from "../../services/api/tenantApi.js";
import {isAfter, isBefore} from "date-fns";
import Link from "../general/Link.tsx";
import DeleteDialog from "../general/DeleteDialog";
import {useState} from "react";


const TenantTable = ({tenants}) => {
    const navigate = useNavigate();

    const [deleteTenant, {isLoading: isDeletingTenant}] = useDeleteTenantMutation()


    // True if the user has an active lease (end date is after today or no end date at all)
    const getActiveLeases = (leases) => {
        return leases.filter(lease => lease.status === "ACTIVE")
    }

    const TenantOptions = ({tenant}) => {
        const [deleteModalOpen, setDeleteModalOpen] = useState(false)


        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <MoreHorizontal className="h-5 w-5 ml-3"/>
                </DropdownMenuTrigger>

                <DeleteDialog
                    open={deleteModalOpen}
                    setOpen={setDeleteModalOpen}
                    title="Delete Tenant"
                    content="Are you sure you want to delete this tenant? This action cannot be undone."
                    onConfirm={() => deleteTenant(tenant?.id)}
                />

                <DropdownMenuContent className="w-[150px]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex flex-row text-sm gap-2" onClick={() => navigate(`/tenants/${tenant?.id}`)}>
                            <UserRound className="w-4 h-4 "/>
                            View Profile
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex flex-row text-sm gap-2 text-red-500"
                                          onClick={() => setDeleteModalOpen(true)}
                        >
                            <Trash2 className="w-4 h-4"/>
                            Delete Tenant
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        )
    }


    const columns: ColumnDef<Tenant>[] = [
        {
            id: "tenant",
            header: "Tenant",
            enableSorting: false,
            cell: ({ row }) => {

                const tenant = row.original;

                return (
                    <div className="flex flex-row items-center gap-2">
                        <Avatar className="cursor-pointer hover:border-2 hover:border-primary" onClick={() => navigate("/tenants/" + tenant?.id)}>
                            <AvatarFallback>{tenant?.firstName[0]?.toUpperCase()}{tenant?.lastName[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="font-500 text-md ">
                                {tenant?.firstName + " " + tenant?.lastName}
                            </p>
                            <p className="font-300 text-gray-500 text-sm">
                                {tenant?.email}
                            </p>
                        </div>
                    </div>
                )
            },
            meta: {
                type: "string"
            },
            accessorFn: (row) => row.firstName + " " + row?.lastName + " " + row?.email
        },
        {
            accessorKey: "leaseStatus",
            header: "Lease Status",
            enableSorting: true,
            cell: ({ row }) => {
                const tenant = row.original;


                const getLeaseText = (lease) => {
                    if (lease?.endDate && isBefore(new Date(lease?.endDate), new Date())) {
                        return "Lease Ended on " + dateParser(lease?.endDate)
                    }
                    else if (lease?.endDate) {
                        return "Lease Ends on " + dateParser(lease?.endDate)
                    }
                    else {
                        return "No Lease End Date"
                    }
                }

                let mostRecentLease;

                try {
                    mostRecentLease = tenant?.leases[0]
                }
                catch (e) {
                    mostRecentLease = null;
                }


                const activeLeases = getActiveLeases(tenant?.leases);

                return (
                    <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-col">
                            <p className="font-400 text-md ">
                                {
                                    activeLeases.length ? `${activeLeases.length} Active Lease${activeLeases.length > 1 ? 's' : ''}` : "No Active Lease"
                                }
                            </p>
                            <p className="font-300 text-gray-500 text-sm">
                                {mostRecentLease ? getLeaseText(mostRecentLease) : "No Lease"}
                            </p>
                        </div>
                    </div>
                )
            },
            meta: {
                type: "string"
            },
            accessorFn: (row) => {
                const activeLeases = getActiveLeases(row?.leases);
                return activeLeases.length ? "Active" : "Inactive"
            }
        },
        {
            id: "currentUnit",
            header: "Current Unit",
            enableSorting: true,
            cell: ({ row }) => {
                const tenant = row.original;

                let mostRecentUnit;

                try {
                    mostRecentUnit = tenant?.unit[0]
                }
                catch (e) {
                    mostRecentUnit = null;
                }

                if (!mostRecentUnit) return (
                    <p className="font-300 text-md text-gray-500">
                        No Unit
                    </p>
                )
                return (
                    <Link id={mostRecentUnit.id} type={"unit"}  />
                )

            },
            meta: {
                type: "string"
            },
            accessorFn: (row) => {
                // @ts-expect-error - We added this above by mapping the tenants
                return row.unit?.unitIdentifier || undefined
            }
        },
        {
            accessorKey: "user",
            header: "User",
            cell: ({ row }) => {
                return (
                    <div className="flex w-fit items-start flex-col gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        <Badge variant="negative" className="h-fit whitespace-nowrap" >
                                            Unverified Tenant
                                        </Badge>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        This tenant has not created an account yet.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <Button variant="default" size="md">
                            <Send className="mr-2 w-3 h-3"/>
                            Contact
                        </Button>
                    </div>
                )
            },
            meta: {
                type: "string"
            },
            enableSorting: true,
            accessorFn: (row) => row.userId ? "Verified" : "Unverified"
        },
        {
            id: "createdAt",
            header: "Created At",
            enableSorting: true,
            cell: ({ row }) => <div className="lowercase">{dateParser(row.getValue("createdAt"))}</div>,
            meta: {
                type: "date"
            },
            accessorFn: (row) => new Date(row.createdAt)
        },
        {
            id: "actions",
            header: "Actions",
            enableHiding: false,
            cell: ({ row }) => {
                const tenant = row.original

                return (
                    <TenantOptions tenant={tenant}/>
                )
            },
        },
    ]


    return (
        <DataTable
            data={tenants}
            columns={columns}
            defaultSort={{id: "leaseStatus", desc: false}}
        />
    )
}

export default TenantTable;