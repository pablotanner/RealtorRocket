import {useMemo} from "react";
import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";


export const Table = ({data: tableData, columns: tableColumns}, props) => {
    const data = useMemo(() => tableData, [tableData]);
    const columns = useMemo(() => tableColumns, [tableColumns]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })


    return (
        <div>
            <div>
                <h1>{props.title}</h1>
            </div>
            <div className="flex flex-row justify-between">
                Header
                <button>
                    Button
                </button>
            </div>
            <table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => {

                        return (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <th key={header.id} colSpan={header.colSpan} scope="col">
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
                                        </th>
                                    );
                                })}
                            </tr>
                        )
                    })}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row => {

                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    }))}
                </tbody>
            </table>
        </div>
    )
}