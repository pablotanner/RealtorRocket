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

class Lease {
    id: string;
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
    realEstateObject: Property;
    realEstateObjectId: string;
    amenities: Amenity[];
    leases: Lease[];
}

const SendToUnit = ({unit}) => {
    const navigate = useNavigate()

    return (
        <div className="capitalize flex flex-row text-off-black font-600 bg-white w-fit p-2 rounded-full shadow-sm hover:bg-gray-50 cursor-pointer border-2 border-gray-100"
             onClick={() => navigate(`/rentals/${unit.id}`)}

        >
            <LinkIcon className="w-4 h-4 mr-2" />
            View Unit
        </div>
    )

}


class Amenity {
    id: string;
    name: string;
    description: string;
}

class Property {
    id: string;
    realEstateType: string;
    title: string;
    description: string;
    marketPrice: number;
    lotSize: number;
    yearBuilt: number;
    units: Unit[];
    amenities: Amenity[];
}

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
                    onClick={() => navigator.clipboard.writeText(unit.id)}
                >
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
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



const columns: ColumnDef<Property>[] = [
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
        id: "unit",
        header: "Unit",
        cell: ({ row })=> {
            return (
                <SendToUnit unit={row.original} />
            )
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id",
        id: "id",
        header: "Unit ID",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("id")}</div>
        ),
        meta: {
            title: "Unit ID",
        },
    },
    {
        accessorKey: "realEstateObject.id",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Property
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "Property",
        },
        cell: ({ row }) => {
            // @ts-expect-error - TS doesn't understand that we're using a custom accessor
            const property = row?.original?.realEstateObject;
            return (
            <div className="capitalize font-500">
                {property?.title}
            </div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            // @ts-expect-error - TS doesn't understand that we're using a custom accessor
            <div className="capitalize">{row.getValue("status").toLowerCase()}</div>
        ),
        meta: {
            title: "Status",
        },
    },

    {
        accessorKey: "currentTenant",
        header: "Current Tenant",
        cell: ({ row }) => {
            /*
            const lease = row?.original?.leases[0];
            return (
                <div className="capitalize">{lease?.id}</div>
            )
             */
            return (
                <div className="bg-primary-dark items-center w-fit text-white p-2 flex flex-row rounded-2xl cursor-pointer hover:bg-primary-dark/70 transition-all ease-in">
                    <LinkIcon className="w-4 h-4 mr-2"/> John D.
                </div>
            )
        },
        meta: {
            title: "Current Tenant",
        },
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
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: units,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="mt-6 flex flex-col gap-y-2 w-full">
            {/* Header */}
            <div className="flex flex-row justify-end gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Filter Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {/*// @ts-expect-error - TS doesn't understand that we're using a custom accessor*/}
                                        {column.columnDef.meta?.title ?? column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative flex bg-gray-50 rounded-md items-center max-w-sm">
                    <FaMagnifyingGlass className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                    <Input
                        disabled
                        placeholder="Search Unit"
                        value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("id")?.setFilterValue(event.target.value)
                        }
                        className="pl-10 text-md bg-inherit"
                    />
                </div>
            </div>



            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default RentalTable;