import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {LeasePaymentSchedule, RentPayment} from "../../utils/classes.ts";
import {PaymentStatusBadge} from "../../utils/statusBadges.js";
import {Check, Coins, Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import ViewPayment from "../payments/ViewPayment.js"
import {PaymentScheduleStatus, PaymentStatus} from "../../utils/magicNumbers.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {useDeletePaymentMutation, useUpdatePaymentMutation} from "../../services/api/financialsApi.js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogIcon,
    DialogTitle,
} from "../ui/dialog.tsx";
import {useMemo, useState} from "react";
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
import {
    useCreatePaymentsMutation,
    useDeletePaymentSchedulesMutation, useDeletePaymentsMutation,
    useUpdatePaymentSchedulesMutation, useUpdatePaymentsMutation
} from "../../services/api/bulkApi";
import {ButtonGroup, ButtonGroupItem} from "../ui/button-group.tsx";
import {isWithinInterval, subDays} from "date-fns";



const PaymentActions = ({ payment }) => {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false)

    const [updatePayment, {isLoading: isUpdating}] = useUpdatePaymentMutation()
    const [deletePayment] = useDeletePaymentMutation()

    const paymentForm = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues:{
            ...payment,
        }
    })

    const handleSubmit = (data) => {
        updatePayment({id: payment?.id, body: data}).then((res) => {
            if (res.error) return
            setEditModalOpen(false)
        })
    }

    return (
        <DropdownMenu>
            <Dialog open={editModalOpen} onOpenChange={() => setEditModalOpen(!editModalOpen)} >
                <DialogContent>
                    <DialogHeader>
                        <DialogIcon>
                            <Coins className="w-6 h-6"/>
                        </DialogIcon>
                        <DialogTitle>
                            Edit Payment
                        </DialogTitle>
                        <DialogDescription>
                            Update the details of this payment.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...paymentForm}>
                        <form onSubmit={paymentForm.handleSubmit(handleSubmit)} className="flex flex-col gap-2">

                            <FormGroup>
                                <FormField
                                    control={paymentForm.control}
                                    name="amount"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Amount</FormLabel>
                                            <FormControl>
                                                <Input type="currency" {...field}  />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={paymentForm.control}
                                    name="date"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Date</FormLabel>
                                            <FormControl>
                                                <Input type="datetime-local" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </FormGroup>

                            <FormGroup>
                                <FormField
                                    control={paymentForm.control}
                                    name="status"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select..." />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                       {
                                                           Object.keys(PaymentStatus).map((status, index) => {
                                                               return (
                                                                   <SelectItem key={index} value={status}>{PaymentStatus[status]}</SelectItem>
                                                               )
                                                           })
                                                       }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={paymentForm.control}
                                    name="paymentMethod"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Payment Method</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </FormGroup>

                            <FormField
                                control={paymentForm.control}
                                name="notes"
                                render={({field}) => (
                                    <FormItem  >
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Textarea className="resize-none"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex flex-row gap-2 justify-between mt-2">
                                <Button variant="outline" type="reset" onClick={() => {
                                    setEditModalOpen(false)
                                    paymentForm.reset()
                                }}
                                        disabled={isUpdating} className="w-full">
                                    Cancel
                                </Button>
                                <Button variant="gradient" type="submit" isLoading={isUpdating} disabled={isUpdating} className="w-full">
                                    Save Changes
                                </Button>
                            </div>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>

            <DeleteDialog
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title="Delete Payment"
                content="Are you sure you want to delete this payment? This action cannot be undone."
                onConfirm={() => deletePayment(payment?.id)}
            />

            {viewModalOpen && <ViewPayment open={viewModalOpen} setOpen={setViewModalOpen} payment={payment} />}

            <DropdownMenuTrigger asChild className="cursor-pointer">
                <MoreHorizontal className="h-5 w-5 ml-3"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm gap-2" onClick={() => setViewModalOpen(true)}>
                        <Eye className="w-4 h-4"/>
                        View
                    </DropdownMenuItem>

                    <DropdownMenuItem className="flex flex-row text-sm gap-2" onClick={() => setEditModalOpen(true)}>
                        <Pencil className="w-4 h-4"/>
                        Edit
                    </DropdownMenuItem>

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm gap-2 text-red-500"
                                      onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash2 className="w-4 h-4"/>
                        Delete Payment
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const columns: ColumnDef<RentPayment>[] = [
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
        id: "amount",
        header: "Amount",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-600">
                    {moneyParser(row?.original?.amount)}
                </div>
            )
        },
        accessorFn: (row) => row?.amount || 0,
        enableSorting: true,
    },
    {
        id: "paymentDate",
        header: "Payment Date",
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
        id: "submissionDate",
        header: "Submission Date",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {dateParser(row?.original?.submissionDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.submissionDate || "",
        meta: {
            type: "date",
        },
        enableSorting: true,
    },
    {
        id: "status",
        header: "Status",
        meta: {
            type: "enum",
            options: Object.values(PaymentStatus),
        },
        cell: ({ row }) => {

            return (
                <PaymentStatusBadge status={row?.original?.status} />
            )
        },
        accessorFn: (row) => row?.status,
        enableSorting: true,
    },
    {
        id: "paymentMethod",
        header: "Payment Method",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {row?.original?.paymentMethod}
                </div>
            )
        },
        accessorFn: (row) => row?.paymentMethod || "",
        meta: {
            type: "string",
        },
        enableSorting: true,
    },
    {
        id: "lease",
        header: "Lease",
        cell: ({ row }) => {
            const lease = row.original?.lease;

            if (!lease) return "No Lease"
            return (
                <div>
                    #{lease?.id}
                </div>
            )
        },
        meta: {
            type: "number",
        },
        accessorFn: (row) => row?.leaseId || "",
        enableSorting: true,
    },
    {
        id: "tenant",
        header: "Tenant",
        cell: ({ row }) => {
            const tenant = row.original?.lease?.tenant;

            if (!tenant) return "No Tenant"
            return (
                <Link id={tenant?.id} type={"tenant"}  />
            )
        },
        meta: {
            type: "string",
        },
        accessorFn: (row) => row?.lease?.tenantId,
        enableSorting: true,
    },
    {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original
            return (
                <PaymentActions payment={payment}/>
            )
        },
    },
]


const PaymentBulkActions = ({selectedRows}) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [updatePayments] = useUpdatePaymentsMutation()
    const [deletePayments] = useDeletePaymentsMutation()

    if (selectedRows?.length === 0) {
        return null
    }


    const handleDelete = () => {
        deletePayments(selectedRows);
    }


    const handleStatusChange = (status) => {
        const body = selectedRows.map((row) => {
            return {
                id: row.id,
                status: status
            }
        })

        updatePayments(body);
    }

    return (
        <DropdownMenu>
            <DeleteDialog
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title="Delete Payments"
                content={`You are about to delete ${selectedRows?.length} payment(s). Are you sure?`}
                onConfirm={handleDelete}
            />

            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Pencil className="w-4 h-4 mr-2"/> {selectedRows?.length} Selected
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            Set Status
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            {Object.keys(PaymentStatus).map((status) => (
                                <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
                                    {PaymentStatus[status]}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>

                </DropdownMenuGroup>

                <DropdownMenuSeparator/>


                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm text-red-500"
                                      onClick={() => setDeleteModalOpen(true)}
                    >
                        <Trash2 className="w-4 h-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )

}



const PaymentTable = ({ payments, ...props }) => {

    const [selectedRows, setSelectedRows] = useState([])

    const [selectedFilter, setSelectedFilter] = useState("all")

    const filteredPayments = useMemo(() => {
        if (selectedFilter === "all") return payments
        if (selectedFilter === "30-days") {
            return payments?.filter((payment: RentPayment) => isWithinInterval(new Date(payment.date), {
                start: subDays(new Date(), 30),
                end: new Date()
            }))
        }
        if (selectedFilter === "90-days") {
            return payments?.filter((payment: RentPayment) => isWithinInterval(new Date(payment.date), {
                start: subDays(new Date(), 90),
                end: new Date()
            }))
        }

    }, [selectedFilter, payments])


    return (
        <div className={"border-2 border-border p-4 rounded-lg"}>
            <DataTable
                data={filteredPayments}
                columns={columns}
                defaultSort={{id: "submissionDate", desc: true}}
                title="Payments"
                subtitle="This table records the payments made by tenants."
                icon={<Coins className={"w-5 h-5"} />}
                onRowSelectionChange={(selectedRows: RentPayment[] ) => setSelectedRows(selectedRows)}
                {...props}

            >

                <ButtonGroup
                    value={selectedFilter}
                    onValueChange={(value) => setSelectedFilter(value)}
                >
                    <ButtonGroupItem value={"all"} >
                        View All
                    </ButtonGroupItem>
                    <ButtonGroupItem value={"30-days"}>
                        30 Days
                    </ButtonGroupItem>
                    <ButtonGroupItem value={"90-days"}>
                        90 Days
                    </ButtonGroupItem>
                </ButtonGroup>

                {props.children}

                <PaymentBulkActions selectedRows={selectedRows} />
            </DataTable>

        </div>

    )
}

export default PaymentTable;