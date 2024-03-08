import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {LeasePaymentSchedule} from "../../utils/classes.ts";
import {CalendarClock, Coins, Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import ViewPayment from "../payments/ViewPayment.js";
import {PaymentScheduleStatusBadge, PaymentStatusBadge} from "../../utils/statusBadges.js";
import {PaymentScheduleStatus, PaymentStatus} from "../../utils/magicNumbers.js";
import {useState} from "react";
import {
    useDeletePaymentMutation,
    useDeletePaymentScheduleMutation,
    useUpdatePaymentMutation, useUpdatePaymentScheduleMutation
} from "../../services/api/financialsApi.js";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {leasePaymentScheduleSchema, paymentSchema} from "../../utils/formSchemas.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogIcon, DialogTitle} from "../ui/dialog.tsx";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Button} from "../ui/button.tsx";
import Link from "../general/Link.tsx";

const PaymentScheduleActions = ({ paymentSchedule }) => {
    const [modalOpen, setModalOpen] = useState(false)

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
            setModalOpen(false)
        })
    }

    return (
        <DropdownMenu>
            <Dialog open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)} >
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
                                    setModalOpen(false)
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
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <MoreHorizontal className="h-5 w-5 ml-3"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm gap-2" onClick={() => setModalOpen(true)}>
                        <Pencil className="w-4 h-4"/>
                        Edit
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className="flex flex-row text-sm gap-2 text-red-500"
                                      onClick={() => deletePaymentSchedule(paymentSchedule?.id)}
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
        id: "view",
        header: "",
        cell: ({ row }) => (
            <ViewPayment payment={row?.original}>
                <Eye className="w-5 h-5 hover:text-primary mt-1"/>
            </ViewPayment>
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

const PaymentScheduleTable = ({ paymentSchedules }) => {

    return (
        <div className={"border-2 border-border p-4 rounded-lg"}>
            <DataTable
                data={paymentSchedules}
                columns={columns}
                defaultSort={{id: "dueDate", desc: false}}
                title="Rent Schedule"
                subtitle="This table shows all expected lease payments and keeps track of their payment status."
                icon={<CalendarClock className={"w-5 h-5"} />} />

        </div>

    )
}

export default PaymentScheduleTable;