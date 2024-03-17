import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {Expense, LeasePaymentSchedule, RentPayment} from "../../utils/classes.ts";
import {PaymentStatusBadge} from "../../utils/statusBadges.js";
import {Check, Coins, ExternalLink, Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import ViewPayment from "../payments/ViewPayment.js"
import {PaymentScheduleStatus, PaymentStatus} from "../../utils/magicNumbers.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {
    useDeleteExpenseMutation,
    useDeletePaymentMutation,
    useUpdatePaymentMutation
} from "../../services/api/financialsApi.js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogIcon,
    DialogTitle,
} from "../ui/dialog.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {paymentSchema} from "../../utils/formSchemas.js";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Button} from "../ui/button.tsx";
import Link from "../general/Link.tsx";
import {Textarea} from "../ui/textarea.tsx";
import DeleteDialog from "../general/DeleteDialog";
import {Checkbox} from "../ui/checkbox.tsx";
import {cn} from "../../utils.ts";


const DeleteExpense = ({expense}) => {
    const [deleteExpense] = useDeleteExpenseMutation()

    const [isOpen, setIsOpen] = useState(false)

    const handleDelete = () => {
        deleteExpense(expense.id)
    }

    return (
        <>
            <DeleteDialog
                title={"Delete Expense"}
                content={"Are you sure you want to delete this expense?"}
                onConfirm={handleDelete}
                open={isOpen}
                setOpen={setIsOpen}
            />
            <div
                onClick={() => setIsOpen(true)}
                className={"cursor-pointer text-muted-foreground w-5 h-5 hover:text-destructive transition-colors"}
            >
                <Trash2 className={"w-5 h-5"} />
            </div>
        </>
    )

}

const columns: ColumnDef<Expense>[] = [
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
        id: "id",
        header: "ID",
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
        id: "title",
        header: "Title",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-600">
                    {row?.original?.title}
                </div>
            )
        },
        accessorFn: (row) => row?.title,
        enableSorting: true,
    },
    {
        id: "amount",
        header: "Amount",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {moneyParser(row?.original?.amount)}
                </div>
            )
        },
        accessorFn: (row) => row?.amount,
        enableSorting: true,
    },
    {
        id: "date",
        header: "Date",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {dateParser(row?.original?.date)}
                </div>
            )
        },
        accessorFn: (row) => row?.date || "",
        meta: {
            type: "date",
        },
        enableSorting: true,
    },
    {
        id: "category",
        header: "Category",
        meta: {
            type: "string",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.category}
                </div>
            )
        },
        accessorFn: (row) => row?.category,
        enableSorting: true,
    },
    {
        id: "lease",
        header: "Lease",
        cell: ({ row }) => {
            const leaseId = row.original?.leaseId;

            return (
                <div className={cn(!leaseId && "text-destructive" )}>
                    {leaseId ? `#${leaseId}` : ""}
                </div>
            )
        },
        meta: {
            type: "string",
        },
        accessorFn: (row) => row?.unitId,
        enableSorting: true,
    },
    {
        id: "unit",
        header: "Unit",
        cell: ({ row }) => {
            const unitId = row.original?.unitId;

            if (!unitId) return ""
            return (
                <Link id={unitId} type={"unit"}  />
            )
        },
        meta: {
            type: "string",
        },
        accessorFn: (row) => row?.unitId,
        enableSorting: true,
    },
    {
        id: "maintenanceRequest",
        header: "Maintenance Request",
        cell: ({ row }) => {
            const maintenanceRequestId = row.original?.maintenanceRequestId;

            return (
                <div className={cn(!maintenanceRequestId && "text-destructive" )}>
                    {maintenanceRequestId ? `#${maintenanceRequestId}` : ""}
                </div>
            )
        },
        meta: {
            type: "string",
        },
        accessorFn: (row) => row?.unitId,
        enableSorting: true,
    },
    {
        id: "description",
        header: "Description",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.description}
                </div>
            )
        },
        accessorFn: (row) => row?.description || "",
        meta: {
            type: "string",
        },
        enableSorting: true,
    },
    {
        id: "notes",
        header: "Notes",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.notes}
                </div>
            )
        },
        accessorFn: (row) => row?.notes || "",
        meta: {
            type: "string",
        },
        enableSorting: true,
    },
    {
        id: "delete",
        header: "",
        cell: ({ row }) => {
            return (
                <DeleteExpense expense={row.original} />
            )
        },
        meta: {
            type: "string",
        },
        enableSorting: false,
        enableHiding: false,
    },
]





const ExpensesTable = ({ expenses, ...props }) => {

    const [selectedRows, setSelectedRows] = useState([])

    return (
        <div className={"border-2 border-border p-4 rounded-lg"}>
            <DataTable
                data={expenses}
                columns={columns}
                defaultSort={{id: "date", desc: true}}
                title="Expenses"
                subtitle="This table records the expenses created by yourself."
                icon={<ExternalLink className={"w-5 h-5"} />}
                //onRowSelectionChange={(selectedRows: Expense[] ) => setSelectedRows(selectedRows)}
                {...props}
            >
                {props.children}
            </DataTable>

        </div>

    )
}

export default ExpensesTable;