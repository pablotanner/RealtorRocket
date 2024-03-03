import {
    ColumnDef,
} from "@tanstack/react-table";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {DataTable} from "../ui/data-table.js";
import {RentPayment} from "../../utils/classes.ts";
import {PaymentStatusBadge} from "../../utils/statusBadges.js";
import {Coins, Eye, MoreHorizontal, Pencil, Trash2} from "lucide-react";
import ViewPayment from "../payments/ViewPayment.js"
import {PaymentStatus} from "../../utils/magicNumbers.js";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem, DropdownMenuSeparator,
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
import {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {paymentSchema} from "../../utils/formSchemas.js";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {Button} from "../ui/button.tsx";



const PaymentActions = ({ payment }) => {
    const [modalOpen, setModalOpen] = useState(false)

    const [updatePayment, {isLoading: isUpdating}] = useUpdatePaymentMutation()
    const [deletePayment] = useDeletePaymentMutation()

    const paymentForm = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues:{
            ...payment,
            date: new Date(payment?.date)
        }
    })

    const handleSubmit = (data) => {
        updatePayment({id: payment?.id, body: data}).then((res) => {
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
                                                <Input type="number" {...field}  />
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
                                                <Input type="date" {...field} />
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
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <div className="w-full flex flex-row gap-2 justify-between mt-2">
                                <Button variant="outline" type="reset" onClick={() => setModalOpen(false)}
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
                                      onClick={() => deletePayment(payment?.id)}
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
                <div>
                    {tenant?.firstName} {tenant?.lastName}
                </div>
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

const PaymentTable = ({ payments, ...props }) => {

    return (
        <div className={"border-2 border-secondary p-4 rounded-lg"}>
            <DataTable
                data={payments}
                columns={columns}
                defaultSort={{id: "paymentDate", desc: false}}
                title="Payments"
                subtitle="This table records the payments made by tenants."
                icon={<Coins className={"w-5 h-5"} />}
            >
                {props.children}
            </DataTable>

        </div>

    )
}

export default PaymentTable;