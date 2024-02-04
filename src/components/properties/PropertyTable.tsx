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
import {ArrowUpDown, ChevronDown, MoreHorizontal} from "lucide-react";
import {useState} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {Input} from "../ui/input.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";


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
    amenities: Amenity[];
    leases: Lease[];
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
        accessorKey: "realEstateType",
        header: "Type of Real Estate",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("realEstateType")}</div>
        ),
    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
    },
    {
        accessorKey: "marketPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Market Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div>USD ${row.getValue("marketPrice")}</div>,
    },
    {
        accessorKey: "lotSize",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Lot Size
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("lotSize")} m<sup>2</sup></div>,
    },
    {
        accessorKey: "yearBuilt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Year Built
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("yearBuilt")}</div>,
    },

    /*{
        accessorKey: "amenities",
        header: "Amenities",
        cell: ({ row }) => (
            <div className="lowercase">
                {row.getValue("amenities").map((amenity: Amenity) => amenity.name).join(", ")}
            </div>
        ),
    },

     */
    {
        accessorKey: "units",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Units
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        // @ts-expect-error - TS doesn't understand that we're using a custom accessor
        cell: ({ row }) => <div className="lowercase">{row.getValue("units").length} units</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const property = row.original

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
                            onClick={() => navigator.clipboard.writeText(property.id)}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            //onClick={() => navigate(`/properties/${property.id}`)}
                        >View Property</DropdownMenuItem>
                        <DropdownMenuItem
                            // Switch to tenant id
                            //onClick={() => navigate(`/tenants/${property.id}`)}
                        >
                            View Tenant
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

// eslint-disable-next-line react/prop-types
const PropertyTable = ({ properties  }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: properties,
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
        <div className="mt-6 flex flex-col gap-y-2">
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
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative flex bg-gray-50 rounded-md items-center max-w-sm">
                    <FaMagnifyingGlass className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search Property"
                        value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("title")?.setFilterValue(event.target.value)
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

export default PropertyTable;