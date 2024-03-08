import {
    ColumnDef,
    ColumnFiltersState, flexRender,
    getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem} from "../ui/dropdown-menu.tsx";
import {Button} from "../ui/button.tsx";
import {ArrowUpDown, ChevronDown, LinkIcon, MoreHorizontal} from "lucide-react";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {Input} from "../ui/input.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {Unit} from "../../utils/classes.ts";
import {DataTable} from "../ui/data-table.js";
import {selectTenantById} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";
import {ListingStatusBadge} from "../../utils/statusBadges.js";
import Link from "../general/Link.tsx";



const RentalTableDropdown = ({unit}) => {
    const navigate = useNavigate()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => navigate(`/properties/${unit.realEstateObjectId}`)}
                >View Property</DropdownMenuItem>
                <DropdownMenuItem
                    // Switch to tenant id
                    onClick={() => navigate(`/rentals/${unit.id}`)}
                >
                    View Rental
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}



const columns: ColumnDef<Unit>[] = [
    {
        id: "unit",
        header: "Unit Identifier",
        cell: ({ row })=> {
            return (
                <Link id={row.original.id} type={"unit"}  />
            )
        },
        meta: {
            type: "string",
        },
        accessorFn: (row) => {
            return row.unitIdentifier
        },
        enableSorting: true,
        enableHiding: false,
    },
    {
        id: "property",
        enableSorting: true,
        header: "Property",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            const property = row?.original?.realEstateObject;
            return (
            <div className="capitalize font-400">
                {property?.title}
            </div>
            )
        },
        accessorFn: (row) => {
            return row.realEstateObject.title
        }
    },
    {
        id: "status",
        header: "Status",
        enableSorting: true,
        cell: ({ row }) => (
            <ListingStatusBadge status={row.original.status} />
        ),
        meta: {
            type: "string"
        },
        accessorFn: (row) => {
            return row.status
        }
    },

    {
        id: "currentTenant",
        header: "Current Tenant",
        enableSorting: true,
        cell: ({ row }) => {
            if (row?.original?.tenantId) {
                // Tenant name
                return (
                    <Link id={row.original.tenantId} type={"tenant"} />
                )
            }
            return (
                "No Tenant"
            )
        },
        meta: {
            type: "string"
        },
        accessorFn: (row) => {
            return row?.tenant?.firstName + " " + row.tenant?.lastName
        }


    },
    {
        id: "leaseStartDate",
        header: "Lease Start Date",
        enableSorting: true,
        cell: ({ row }) => {
            if (row.original.leases[0]?.startDate) {
                return (
                    <div>
                        {
                            dateParser(row.original.leases[0]?.startDate)
                        }
                    </div>
                )
            } else {
                return (
                    <div>

                    </div>
                )
            }
        },
        meta: {
            type: "date"
        },
        accessorFn: (row) => {
            return row.leases[0]?.startDate || undefined
        }
    },

    {
        id: "leaseEndDate",
        header: "Lease End Date",
        enableSorting: true,
        cell: ({ row }) => {
            if (row.original.leases[0]?.endDate) {
                return (
                    <div>
                        {
                           dateParser(row.original.leases[0]?.endDate)
                        }
                    </div>
                )
            } else {
                return (
                    <div>

                    </div>
                )
            }
        },
        meta: {
            type: "date"
        },
        accessorFn: (row) => {
            return row.leases[0]?.endDate || undefined
        }
    },

    {
        id: "monthlyRent",
        header: "Monthly Rent",
        enableSorting: true,
        cell: ({ row }) => {
            return (
                <div>
                    {moneyParser(row.original.rentalPrice)}
                </div>
            )
        },
        meta: {
            type: "number"
        },
        accessorFn: (row) => {
            return row.rentalPrice || undefined
        }
    },


    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const unit = row.original

            return <RentalTableDropdown unit={unit} />
        },
    },
]

// eslint-disable-next-line react/prop-types
const RentalTable = ({ units  }) => {

    return (
        <DataTable data={units} columns={columns} />
    )

}

export default RentalTable;