import {useCallback, useEffect, useMemo, useState} from "react";
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
import {AlertCircle, ArrowLeft, ArrowRight, ListFilter, MoveDown, MoveUp, Pencil, X} from "lucide-react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "./tabs.tsx";
import {Checkbox} from "./checkbox.tsx";
import {isAfter, isBefore, isSameDay} from "date-fns";
import {cn} from "../../utils.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./accordion.tsx";
import {dateParser} from "../../utils/formatters.js";



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

const EnumFilterOptions = [
    {value: "equals", label: "Equals"},
]


const stringFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);
    try{
        switch (filterValue.type) {
            case "contains":
                return value.toLowerCase().includes(filterValue.value.toLowerCase());
            case "equals":
                return value.toLowerCase() === filterValue.value.toLowerCase();
            default:
                return true;
        }
    }
    catch (e) {
        return false;
    }
}

const numberFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);

    try {
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
    catch (e) {
        return false;
    }
}

const dateFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);

    try {
        const date = new Date(value);
        const filterDate = new Date(filterValue.value);
        switch (filterValue.type) {
            case "equals":
                return isSameDay(date, filterDate)
            case "greaterThan":
                return isAfter(date, filterDate)
            case "lessThan":
                return isBefore(date, filterDate)
            default:
                return true;
        }
    }
    catch (e) {
        return false;
    }
}

const enumFilterFn = (row, columnId, filterValue, addMeta) => {
    const value = row.getValue(columnId);
    try {
        switch (filterValue.type) {
            case "equals":
                return value.toLowerCase() === filterValue.value.toLowerCase();
            default:
                return true;
        }
    }
    catch (e) {
        return false;
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
        case "enum":
            return EnumFilterOptions
        default:
            return []
    }
}

const FilterContent = ({column, index, tempColumnFilters, handleSelectChange, handleInputChange, filterOptions, setTempColumnFilters}) => {

    const type = column?.columnDef?.meta?.type;

    let content = (
        <>
            <select
                value={tempColumnFilters[column.id]?.type || ""}
                onChange={(e) => handleSelectChange(column.id, e.target.value)}
                className="rounded-md border border-input bg-background-light text-foreground text-sm capitalize font-500"
            >
                <option value="">Select Filter</option>
                {filterOptions[index]?.map((option) => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    );
                })}
            </select>
            <Input
                value={tempColumnFilters[column.id]?.value || ""}
                type={column?.columnDef?.meta?.type}
                onChange={(e) => handleInputChange(column.id, e.target.value)}
                className="w-fit"
            />
        </>
    )
    if (type === "date") {
        content = (
            <>
                <select
                    value={tempColumnFilters[column.id]?.type || ""}
                    onChange={(e) => handleSelectChange(column.id, e.target.value)}
                    className="rounded-md border border-input bg-background-light text-foreground text-sm capitalize font-500"
                >
                    <option value="">Select Filter</option>
                    {filterOptions[index]?.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        );
                    })}
                </select>
                <input
                    type="date"
                    value={tempColumnFilters[column.id]?.value || ""}
                    onChange={(e) => {
                        setTempColumnFilters({
                            ...tempColumnFilters,
                            [column.id]: {type: tempColumnFilters[column.id]?.type, value: e.target.value}
                        });
                    }}
                    className="rounded-md border border-input w-full h-8 bg-background-light text-foreground text-sm "
                />
            </>
        )
    }
    if (type === "enum") {
        const options = column?.columnDef?.meta?.options;

        content = (
            <select
                value={tempColumnFilters[column.id]?.value || ""}
                onChange={(e) => {
                    setTempColumnFilters({
                        ...tempColumnFilters,
                        [column.id]: {type: "equals", value: e.target.value}
                    });
                }}
                className="rounded-md border border-input bg-background-light text-foreground text-sm capitalize font-500"
            >
                <option value="">Select Filter</option>
                {options?.map((option, index) => {
                    return (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        )
    }


    return (
        <div className="flex flex-col gap-2 items-center justify-start">
            {content}
            <Button
                variant="outline"
                className="w-full"
                disabled={!tempColumnFilters[column.id]?.type || !tempColumnFilters[column.id]?.value}
                onClick={() => {
                    column.setFilterValue(tempColumnFilters[column.id]);
                }}
            >
                Apply
            </Button>
        </div>

    )
}



export const DataTable = ({data: tableData, columns: tableColumns, ...props}) => {
    function getColumnName (column) {
        return column?.columnDef?.meta?.title || column?.columnDef?.header || column?.id || "";
    }

    const [page, setPage] = useState(1)


    const columns = useMemo(() => {
        return tableColumns?.map(column => {
            switch (column.meta?.type) {
                case "string":
                    return {...column, filterFn: stringFilterFn};
                case "number":
                    return {...column, filterFn: numberFilterFn};
                case "date":
                    return {...column, filterFn: dateFilterFn};
                case "enum":
                    return {...column, filterFn: enumFilterFn};
                default:
                    return column;
            }
        })?.map(column => {
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
                                variant="table"
                                onClick={() => {
                                    if (!column.getIsSorted()) {
                                        column.toggleSorting(false)
                                    }
                                    else if (column.getIsSorted() === "asc") {
                                        column.toggleSorting(true)
                                    }
                                    else {
                                        column.clearSorting()
                                    }
                                }}
                                className="capitalize relative flex flex-row justify-start  px-4 -ml-4 pr-6"
                            >
                                {headerLabel}

                                {column.getIsSorted() === "asc" && (
                                    <MoveUp className="absolute right-1 h-4 w-4" />
                                )}
                                {column.getIsSorted() === "desc" && (
                                    <MoveDown className="absolute right-1  h-4 w-4" />
                                )}
                            </Button>
                        )

                    }
                }
            }
            return column;
        })
    }, [tableColumns]);


    const [sorting, setSorting] = useState(props.defaultSort ? [props.defaultSort] : [])

    // Filters before being applied to the table
    const [tempColumnFilters, setTempColumnFilters] = useState([])

    // The actual state of the table
    const [columnFilters, setColumnFilters] = useState([])

    const [columnVisibility, setColumnVisibility] = useState({})
    const [rowSelection, setRowSelection] = useState({})

    const data = useMemo(() => {
        // if data changes, reset selected rows (so no weird behaviour if a row is deleted)
        setRowSelection({})

        return tableData;

    }, [tableData]);

    /*

        useEffect(() => {
        // if data changes, reset selected rows (so no weird behaviour if a row is deleted)
        setRowSelection({})
    }, [tableData?.length])

     */



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
            pagination: {
                pageIndex: page - 1,
                pageSize: props?.pageSize || 10
            }
        },
    })


    // If user selects a row, call the onRowSelectionChange prop
    useEffect(() => {
        if (props.onRowSelectionChange){
            const actualRows = table.getSelectedRowModel().rows.map((row) => row.original)
            props.onRowSelectionChange(actualRows)
        }
    }, [rowSelection])




    // Filter options for each column (depends on data type; string/number/date)
    const filterOptions = useMemo(() => {
        return table.getAllColumns()?.filter((column) => column.getCanFilter())?.map((column) => {
            return getFilterOptions(column?.columnDef?.meta?.type);
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

            <div className="text-sm rounded-xl bg-primary p-2 px-3 capitalize text-white flex flex-row gap-1 items-center">
                        <p>
                            {getColumnName(column)}
                        </p>
                        <p className="font-600 text-gray-100">
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
        )
    }

    useEffect(() => {
        // If no data or data is empty, scroll to center of table
        if (!tableData?.length) {
            const table = document.querySelector("table");
            table?.scrollIntoView({behavior: "instant", block: "center", inline: "center"})
        }


    }, [tableData])


    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4" hidden={!props.title}>
                <div className="p-2 border border-border rounded-lg text-primary-dark shadow-md" hidden={!props.icon}>
                    {props.icon}
                </div>
                <div>
                    <h3>
                        {props.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                        {props.subtitle}
                    </p>
                </div>
            </div>
            <div className="flex flex-row gap-2 flex-wrap items-center">
                <div className="relative flex bg-background-light rounded-md items-center max-w-sm">
                    <FaMagnifyingGlass className="absolute top-3 left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        onChange={(e) => {
                            table.setGlobalFilter(e.target.value)
                        }}
                        className="pl-10 text-sm bg-inherit text-foreground rounded-md border"
                    />
                </div>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" >
                            <ListFilter className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-[250px]">
                        <Tabs defaultValue="columns">
                            <TabsList className="w-full">
                                <TabsTrigger value="columns" className="w-full">
                                    Columns
                                </TabsTrigger>
                                <TabsTrigger value="filters" className="w-full">
                                    Filters
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="columns" className="px-2 pb-2">
                                <div className="w-full h-[1px] bg-secondary" />
                                {table
                                    .getAllColumns()
                                    ?.filter((column) => column.getCanHide())
                                    ?.map((column) => {
                                        return (
                                            <div key={column.id} className="flex flex-row items-center gap-1 text-sm capitalize rounded-md py-[2px]"
                                                 onClick={() => column.toggleVisibility()}>
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

                            <TabsContent value="filters" className="max-h-[300px] overflow-auto overflow-x-hidden">
                                <Accordion collapsible>
                                    {table.getAllColumns()?.filter((column) => column.getCanFilter())?.map((column, index) => {
                                        return (
                                            <AccordionItem key={index} value={column?.id} className="w-full">
                                                <AccordionTrigger className="capitalize text-sm py-2 text-foreground font-400">
                                                    {getColumnName(column)}
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <FilterContent column={column} index={index} filterOptions={filterOptions} tempColumnFilters={tempColumnFilters} setTempColumnFilters={setTempColumnFilters} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} />
                                                </AccordionContent>
                                            </AccordionItem>
                                        )

                                    })}
                                </Accordion>
                            </TabsContent>
                        </Tabs>
                    </DropdownMenuContent>
                </DropdownMenu>

                {props.children}


                {columnFilters?.map((filter, index) => {
                    return (
                        <FilterItem filter={filter} key={index} />
                    )
                })}

            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups()?.map((headerGroup) => {
                        return (
                            <TableRow key={headerGroup.id}>
                                {headerGroup?.headers?.map((header) => {
                                    const sticky = header.column?.columnDef?.meta?.sticky;

                                    return (
                                        <TableHead key={header.id} colSpan={header.colSpan} scope="col"
                                                   className={cn(sticky && "sticky w-fit bg-secondary z-30")}
                                        >
                                            {header.isPlaceholder ? null : (
                                                flexRender(
                                                        header.column.columnDef.header,
                                                    header.getContext())
                                            )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        )
                    })}
                </TableHeader>
                <TableBody>
                    {
                        !data?.length ? (
                            <TableRow>
                                <TableCell colSpan={table?.getAllColumns()?.length}>
                                    <div className="flex flex-col items-center gap-1 text-center">
                                        <div className="p-3 bg-red-600/20 rounded-full">
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                        </div>
                                        <h3 className="text-md text-foreground">
                                            No Data Available
                                        </h3>
                                        <p className="text-sm font-400 text-muted-foreground max-w-[250px] sm:max-w-[350px]">
                                            There is no data available for this table, if you believe this is an error, please contact support.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            table?.getRowModel()?.rows?.map((row => {
                                return (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => {
                                            const sticky = cell?.column?.columnDef?.meta?.sticky;
                                            return (
                                                <TableCell key={cell.id}
                                                           className={cn(sticky && "sticky w-fit items-center bg-secondary z-20", sticky === "left" && "left-0", sticky === "right" && "-right-2")}
                                                >
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            }))
                        )
                    }
                </TableBody>
            </Table>
            <div className="w-full flex justify-between items-center">
                <Button variant="outline" type="button" className="text-foreground" disabled={!table.getCanPreviousPage()}
                        onClick={() => {
                            table.previousPage()
                            setPage(page - 1)
                        }}
                >
                    <ArrowLeft className="w-4 h-4 mr-1"/> Previous
                </Button>

                <p className="text-muted-foreground text-sm white-space-nowrap md:text-md">
                    Page {page} of {table.getPageCount()}
                </p>

                <Button variant="outline" type="button" className="text-foreground" disabled={!table.getCanNextPage()}
                        onClick={() => {
                            table.nextPage()
                            setPage(page + 1)
                        }}
                >
                    Next <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
            </div>
        </div>
    )
}