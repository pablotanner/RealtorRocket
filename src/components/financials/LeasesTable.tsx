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
        accessorKey: "leaseId",
        id: "leaseId",
        header: "Lease ID",
        cell: ({ row }) => (
            <div className="capitalize">{row?.original?.id}</div>
        ),
        meta: {
            title: "Lease ID",
        },
    },
    {
        accessorKey: "tenant",
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
        meta: {
            title: "Tenant",
        },
    },
    {
        accessorKey: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Start Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "Start Date",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {dateParser(row?.original?.startDate)}
                </div>
            )
        },
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    End Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "End Date",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {dateParser(row?.original?.endDate)}
                </div>
            )
        },
    },
    {
        accessorKey: "rentalPrice",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Rental Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "Rental Price",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {moneyParser(row?.original?.rentalPrice)}
                </div>
            )
        },
    },
    {
        accessorKey: "totalRentDue",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Rent Due
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "Total Rent Due",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {moneyParser(row?.original?.totalRentDue)}
                </div>
            )
        },
    },
    {
        accessorKey: "totalRentPaid",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Rent Paid
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "Total Rent Paid",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {moneyParser(row?.original?.totalRentPaid)}
                </div>
            )
        },
    },
    {
        accessorKey: "lastPaymentDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    size="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Payment Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        meta: {
            title: "Last Payment Date",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-500">
                    {row?.original?.lastPaymentDate}
                </div>
            )
        },
    },

]

const LeasesTable = ({ leases }) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const table = useReactTable({
        data: leases,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
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
                        placeholder="Search Lease"
                        value={(table.getColumn("leaseId")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("leaseId")?.setFilterValue(event.target.value)
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

export default LeasesTable;