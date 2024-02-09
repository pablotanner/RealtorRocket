import {useCallback, useMemo, useState} from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel, getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./table.tsx";
import {FaMagnifyingGlass} from "react-icons/fa6";
import {Input} from "./input.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "./dropdown-menu.tsx";
import {Button} from "./button.tsx";
import {ArrowUpDown, ListFilter, MoveDown, MoveUp, X} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./tabs.tsx";
import {Checkbox} from "./checkbox.tsx";



const StringFilterOptions = [
    {value: "contains", label: "Contains"},
    {value: "equals", label: "Equals"},
]

const NumberFilterOptions = [
    {value: "equals", label: "Equals"},
    {value: "greaterThan", label: "Greater Than"},
    {value: "lessThan", label: "Less Than"},
]

const DateFilterOptions = [
    {value: "equals", label: "Equals"},
    {value: "greaterThan", label: "After"},
    {value: "lessThan", label: "Before"},
]

const FilterSymbols = {
    contains: "contains",
    equals: "=",
    greaterThan: ">",
    lessThan: "<",
}


const stringFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);
    switch (filterValue.type) {
        case "contains":
            return value.toLowerCase().includes(filterValue.value.toLowerCase());
        case "equals":
            return value.toLowerCase() === filterValue.value.toLowerCase();
        default:
            return true;
    }
}

const numberFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);
    switch (filterValue.type) {
        case "equals":
            return Number(value) === Number(filterValue.value);
        case "greaterThan":
            return Number(value) > Number(filterValue.value);
        case "lessThan":
            return Number(value) < Number(filterValue.value);
        default:
            return true;
    }
}

const dateFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);
    switch (filterValue.type) {
        case "equals":
            return value === filterValue.value;
        case "greaterThan":
            return value > filterValue.value;
        case "lessThan":
            return value < filterValue.value;
        default:
            return true;
    }
}


const getFilterOptions = (type) => {
    switch (type) {
        case "string":
            return StringFilterOptions
        case "number":
            return NumberFilterOptions
        case "date":
            return DateFilterOptions
        default:
            return []
    }
}


export const DataTable = ({data: tableData, columns: tableColumns}, props) => {
    function getColumnName (column) {
        return column.columnDef.meta.title;
    }

    const data = useMemo(() => tableData, [tableData]);
    const columns = useMemo(() => {
        return tableColumns.map(column => {
            switch (column.meta?.type) {
                case "string":
                    return {...column, filterFn: stringFilterFn};
                case "number":
                    return {...column, filterFn: numberFilterFn};
                default:
                    return column;
            }
        }).map(column => {
            const headerLabel = column.header;
            if (column.enableSorting) {
                return {
                    ...column,
                    meta: {
                        ...column.meta,
                        title: column.meta?.title || headerLabel
                    },
                    header: ({column}) => {
                        return (
                            <Button
                                variant="ghost"
                                size="ghost"
                                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                                className="capitalize"
                            >
                                {headerLabel}

                                {column.getIsSorted() === "asc" && (
                                    <MoveUp className="ml-2 h-4 w-4" />
                                )}
                                {column.getIsSorted() === "desc" && (
                                    <MoveDown className="ml-2 h-4 w-4" />
                                )}
                            </Button>
                        )

                    }
                }
            }
            return column;
        })
    }, [tableColumns]);


    const [sorting, setSorting] = useState([])

    // Filters before being applied to the table
    const [tempColumnFilters, setTempColumnFilters] = useState([])

    // The actual state of the table
    const [columnFilters, setColumnFilters] = useState([])

    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    // Filter options for each column (depends on data type; string/number/date)
    const filterOptions = useMemo(() => {
        return table.getAllColumns().filter((column) => column.getCanFilter()).map((column) => {
            return getFilterOptions(column.columnDef.meta.type);
        });
    }, [table]);

    // Handle the change of the filter type dropdown
    const handleSelectChange = useCallback((columnId, type) => {
        //if (!type || type === "Select Filter") return;
        setTempColumnFilters({
            ...tempColumnFilters,
            [columnId]: {type: type, value: tempColumnFilters[columnId]?.value || ""}
        });
    }, [tempColumnFilters]);

    // Handle the change of the filter value input
    const handleInputChange = useCallback((columnId, value) => {
        setTempColumnFilters({
            ...tempColumnFilters,
            [columnId]: {type: tempColumnFilters[columnId]?.type, value: value}
        });
    }, [tempColumnFilters]);



    const FilterItem = ({filter}) => {
        const column = table.getColumn(filter.id)
        const symbol = FilterSymbols[filter?.value?.type]


        return (
            <div className="rounded-xl bg-indigo-300 p-2">
                <div className="flex flex-row items-center gap-2">
                    <div className="text-sm capitalize text-off-black flex flex-row gap-1 items-center">
                        <p>
                            {getColumnName(column)}
                        </p>
                        <p className="font-600 text-gray-700">
                            {symbol}
                        </p>
                        <p>
                            {filter?.value?.value}
                        </p>

                        <X className="w-4 h-4 cursor-pointer"
                           onClick={() => {
                                 column.setFilterValue(undefined)
                           }}
                        />
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <div>
                <h1>{props.title}</h1>
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
                <div className="relative flex bg-gray-50 rounded-md items-center max-w-sm">
                    <FaMagnifyingGlass className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search..."
                        onChange={(e) => {
                            table.setGlobalFilter(e.target.value)
                        }}
                        className="pl-10 text-sm bg-inherit"
                    />
                </div>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <ListFilter className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="min-w-[200px]">
                        <Tabs defaultValue="columns">
                            <TabsList className="w-full">
                                <TabsTrigger value="columns" className="w-full">
                                    Columns
                                </TabsTrigger>
                                <TabsTrigger value="filters" className="w-full">
                                    Filters
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="columns" className="px-2 pb-4">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <div key={column.id} className="flex flex-row items-center text-sm capitalize gap-1 mb-[4px] cursor-pointer" onClick={() => column.toggleVisibility()}>
                                                <Checkbox
                                                    key={column.id}
                                                    className="capitalize"
                                                    checked={column.getIsVisible()}
                                                />
                                                {getColumnName(column)}
                                            </div>
                                        )
                                    })}
                            </TabsContent>

                            <TabsContent value="filters">
                                {table.getAllColumns().filter((column) => column.getCanFilter()).map((column, index) => {

                                    return (
                                        <div key={column.id}>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>
                                                    <div className="capitalize">
                                                        {getColumnName(column)}
                                                    </div>
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuSubContent>
                                                    <div>
                                                        <select
                                                            value={tempColumnFilters[column.id]?.type || ""}
                                                            onChange={(e) => handleSelectChange(column.id, e.target.value)}
                                                        >
                                                            <option value="">Select Filter</option>
                                                            {filterOptions[index].map((option) => {
                                                                return (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                    <Input
                                                        value={tempColumnFilters[column.id]?.value || ""}
                                                        onChange={(e) => handleInputChange(column.id, e.target.value)}
                                                    />
                                                    <Button
                                                        variant="outline"
                                                        disabled={!tempColumnFilters[column.id]?.type || !tempColumnFilters[column.id]?.value}
                                                        onClick={() => {
                                                            column.setFilterValue(tempColumnFilters[column.id]);
                                                        }}
                                                    >
                                                        Apply
                                                    </Button>
                                                </DropdownMenuSubContent>
                                            </DropdownMenuSub>
                                        </div>
                                    )
                                })}
                            </TabsContent>
                        </Tabs>
                    </DropdownMenuContent>
                </DropdownMenu>

                {columnFilters.map((filter, index) => {
                    return (
                        <FilterItem filter={filter} key={index} />
                    )
                })}
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan} scope="col">
                                            {header.isPlaceholder ? null : (
                                                <div>
                                                    <span>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        )
                    })}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row => {

                        return (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    }))}
                </TableBody>
            </Table>
        </div>
    )
}