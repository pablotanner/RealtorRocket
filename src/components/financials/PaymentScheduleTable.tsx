import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {LeasePaymentSchedule} from "../../utils/classes.ts";
import {CalendarClock, Check, Coins, Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import ViewPayment from "../payments/ViewPayment.js";
import {PaymentScheduleStatusBadge, PaymentStatusBadge} from "../../utils/statusBadges.js";
import {LeaseStatus, PaymentScheduleStatus, PaymentStatus} from "../../utils/magicNumbers.js";
import {useMemo, useState} from "react";
import {
    useDeletePaymentScheduleMutation,
    useUpdatePaymentScheduleMutation
} from "../../services/api/financialsApi.js";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {leasePaymentScheduleSchema, paymentSchema} from "../../utils/formSchemas.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogIcon, DialogTitle} from "../ui/dialog.tsx";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Button} from "../ui/button.tsx";
import Link from "../general/Link.tsx";
import DeleteDialog from "../general/DeleteDialog";
import {
    useCreatePaymentsMutation,
    useDeleteLeasesMutation, useDeletePaymentSchedulesMutation,
    useUpdateLeasesMutation,
    useUpdatePaymentSchedulesMutation
} from "../../services/api/bulkApi";
import {Checkbox} from "../ui/checkbox.tsx";
import {ButtonGroup, ButtonGroupItem} from "../ui/button-group.tsx";

const PaymentScheduleActions = ({ paymentSchedule }) => {
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const [viewModalOpen, setViewModalOpen] = useState(false)

    const [updatePaymentSchedule, {isLoading: isUpdating}] = useUpdatePaymentScheduleMutation()
    const [deletePaymentSchedule] = useDeletePaymentScheduleMutation()

    const paymentScheduleForm = useForm({
        resolver: zodResolver(leasePaymentScheduleSchema),
        defaultValues:{
            ...paymentSchedule,
            dueDate: new Date(paymentSchedule?.dueDate)
        }
    })

    const handleSubmit = (data) => {
        updatePaymentSchedule({id: paymentSchedule?.id, body: data}).then((res) => {
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
                            <CalendarClock className="w-6 h-6"/>
                        </DialogIcon>
                        <DialogTitle>
                            Edit Planned Payment
                        </DialogTitle>
                        <DialogDescription>
                            Update the details of this planned payment.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...paymentScheduleForm}>
                        <form onSubmit={paymentScheduleForm.handleSubmit(handleSubmit)} className="flex flex-col gap-2">

                            <FormGroup useFlex>
                                <FormField
                                    control={paymentScheduleForm.control}
                                    name="amountDue"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Amount Due</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field}  />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={paymentScheduleForm.control}
                                    name="dueDate"
                                    render={({field}) => (
                                        <FormItem  >
                                            <FormLabel>Due Date</FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </FormGroup>

                            <FormField
                                control={paymentScheduleForm.control}
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
                                                    Object.keys(PaymentScheduleStatus).map((status, index) => {
                                                        return (
                                                            <SelectItem key={index} value={status}>{PaymentScheduleStatus[status]}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="w-full flex flex-row gap-2 justify-between mt-2">
                                <Button variant="outline" type="reset" onClick={() => {
                                    setEditModalOpen(false)
                                    paymentScheduleForm.reset()
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
                title="Delete Planned Payment"
                content="Are you sure you want to delete this planned payment? This action cannot be undone."
                onConfirm={() => deletePaymentSchedule(paymentSchedule?.id)}
            />

            {viewModalOpen && <ViewPayment open={viewModalOpen} setOpen={setViewModalOpen} payment={paymentSchedule} />}


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
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const columns: ColumnDef<LeasePaymentSchedule>[] = [
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
        id: "amountDue",
        header: "Amount Due",
        meta: {
            type: "number",
        },
        cell: ({ row }) => {
            return (
                <div className="capitalize font-600">
                    {moneyParser(row?.original?.amountDue)}
                </div>
            )
        },
        accessorFn: (row) => row?.amountDue || 0,
        enableSorting: true,
    },
    {
        id: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            return (
                <div className="capitalize">
                    {dateParser(row?.original?.dueDate)}
                </div>
            )
        },
        accessorFn: (row) => row?.dueDate || "",
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
            options: Object.values(PaymentScheduleStatus),

        },
        cell: ({ row }) => {
            return (
                <PaymentScheduleStatusBadge status={row?.original?.status} />
            )
        },
        accessorFn: (row) => row?.status,
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
                <Link id={tenant?.id} type={"tenant"} />
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
            const paymentSchedule = row.original
            return (
                <PaymentScheduleActions paymentSchedule={paymentSchedule}/>
            )
        },
    },
]


const PaymentScheduleBulkActions = ({selectedRows}) => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const [createPayments] = useCreatePaymentsMutation();
    const [updatePaymentSchedules] = useUpdatePaymentSchedulesMutation();
    const [deletePaymentSchedules] = useDeletePaymentSchedulesMutation();

    if (selectedRows?.length === 0) {
        return null
    }

    const handleMarkAsPaid = () => {
        const paymentsToCreate = selectedRows?.map((paymentSchedule: LeasePaymentSchedule) => {
            return {
                amount: paymentSchedule.amountDue,
                date: new Date().toISOString(),
                leaseId: paymentSchedule.leaseId,
                status: "PAID",
                leasePaymentSchedule: {
                    amountDue: 0,
                    id: paymentSchedule.id,
                    status: "PAID"
                },
                notes: "Created from marking a payment schedule as paid."
            }
        })

        createPayments(paymentsToCreate);


    }

    const handleDelete = () => {
        deletePaymentSchedules(selectedRows);
    }


    const handleStatusChange = (status) => {
        const body = selectedRows.map((row) => {
            return {
                id: row.id,
                status: status
            }
        })

        updatePaymentSchedules(body);
    }

    return (
        <DropdownMenu>
            <DeleteDialog
                open={deleteModalOpen}
                setOpen={setDeleteModalOpen}
                title="Delete Payment Schedules"
                content={`You are about to delete ${selectedRows?.length} payment schedule(s). Are you sure?`}
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
                            {Object.keys(PaymentScheduleStatus).map((status) => (
                                <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
                                    {PaymentScheduleStatus[status]}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>


                    <DropdownMenuItem onClick={handleMarkAsPaid}>
                        <Check className="w-4 h-4 mr-2"/>
                        Mark as Paid
                    </DropdownMenuItem>
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



const PaymentScheduleTable = ({ paymentSchedules, ...props }) => {

    const [selectedRows, setSelectedRows] = useState([])

    const [selectedFilter, setSelectedFilter] = useState("only-unpaid")

    const filteredPaymentSchedules = useMemo(() => {
        if (selectedFilter === "all") return paymentSchedules
        if (selectedFilter === "only-unpaid") {
            return paymentSchedules?.filter((payment: LeasePaymentSchedule) => payment.status !== "PAID" && payment.status !== "WAIVED")
        }
        if (selectedFilter === "only-overdue") {
            return paymentSchedules?.filter((payment: LeasePaymentSchedule) => {
                return payment.status === "OVERDUE"
            })
        }

    }, [selectedFilter, paymentSchedules])

    return (
        <div className={"border-2 border-border p-4 rounded-lg"}>
            <DataTable
                data={filteredPaymentSchedules}
                columns={columns}
                defaultSort={{id: "dueDate", desc: false}}
                title="Rent Schedule"
                subtitle="This table shows all expected lease payments and keeps track of their payment status."
                icon={<CalendarClock className={"w-5 h-5"} />}
                onRowSelectionChange={(selectedRows: LeasePaymentSchedule[]) => setSelectedRows(selectedRows)}
                {...props}
            >

                <ButtonGroup
                    value={selectedFilter}
                    onValueChange={(value) => setSelectedFilter(value)}
                >
                    <ButtonGroupItem value={"all"} >
                        View All
                    </ButtonGroupItem>
                    <ButtonGroupItem value={"only-unpaid"}>
                        Unpaid
                    </ButtonGroupItem>
                    <ButtonGroupItem value={"only-overdue"}>
                        Overdue
                    </ButtonGroupItem>
                </ButtonGroup>

                <PaymentScheduleBulkActions selectedRows={selectedRows} />
            </DataTable>

        </div>

    )
}

export default PaymentScheduleTable;