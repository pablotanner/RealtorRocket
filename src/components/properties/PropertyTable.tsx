import {
    ColumnDef,
} from "@tanstack/react-table";
import {DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem} from "../ui/dropdown-menu.tsx";
import {Checkbox} from "../ui/checkbox.tsx";
import {Button} from "../ui/button.tsx";
import {MoreHorizontal} from "lucide-react";
import {RealEstateType} from "../../utils/magicNumbers.js"
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {Property} from "../../utils/classes.ts";
import {DataTable} from "../ui/data-table.js"

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
                className="mr-3"
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
        header: "Type",
        enableSorting: true,
        cell: ({ row }) => (
            <div className="capitalize">{RealEstateType[row.getValue("realEstateType")]}</div>
        ),
        meta: {
            type: "string"
        }
    },
    {
        accessorKey: "title",
        header: "Title",
        enableSorting: true,
        cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
        meta: {
            type: "string"
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <div title={row.original.description} className="lowercase overflow-hidden text-ellipsis whitespace-nowrap max-w-[200px]">{row.getValue("description")}</div>
            )
        },
        meta: {
            type: "string"
        },
        enableSorting: true,
    },
    {
        accessorKey: "marketPrice",
        header: "Market Price",
        enableSorting: true,
        cell: ({ row }) => <div>{moneyParser(row.getValue("marketPrice"))}</div>,
        meta: {
            type: "number"
        }
    },
    {
        accessorKey: "lotSize",
        header: "Lot Size",
        enableSorting: true,
        cell: ({ row }) => <div className="lowercase">{row.getValue("lotSize")} m<sup>2</sup></div>,
        meta: {
            type: "number"
        }
    },
    {
        accessorKey: "yearBuilt",
        header: "Year Built",
        enableSorting: true,
        cell: ({ row }) => <div className="lowercase">{row.getValue("yearBuilt")}</div>,
        meta: {
            type: "number"
        }
    },
    {
        id: "units",
        header: "Units",
        enableSorting: true,
        cell: ({ row }) => <div className="lowercase">{row?.original?.units?.length} unit(s)</div>,
        meta: {
            type: "number"
        },
        accessorFn: (row) => row.units?.length || 0
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
                            onClick={() => navigator.clipboard.writeText(String(property.id))}
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            //onClick={() => navigate(`/properties/${property.id}`)}
                        >View Property</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

// eslint-disable-next-line react/prop-types
const PropertyTable = ({ properties  }) => {

    return (
        <DataTable
            data={properties}
            columns={columns}
        />

    )

}

export default PropertyTable;