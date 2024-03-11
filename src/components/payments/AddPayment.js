import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogIcon,
    DialogTitle,
    DialogTrigger
} from "../ui/dialog.tsx";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormGroup,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Coins, PlusIcon} from "lucide-react";
import {zodDateInputPipe, zodNumberInputPipe, zodStringPipe} from "../../utils/formatters.js";
import { useGetLeasesQuery} from "../../services/api/leaseApi.js";
import {useCreatePaymentMutation} from "../../services/api/financialsApi.js";
import LeaseSelection from "../comboboxes/LeaseSelection.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {PaymentStatus} from "../../utils/magicNumbers.js";
import {Checkbox} from "../ui/checkbox.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip.tsx";
import {AiOutlineQuestionCircle} from "react-icons/ai";
import {getNextScheduledPayment, getScheduledPaymentStatus} from "../../utils/financials.js";
import {useState} from "react";
import {PaymentScheduleStatusBadge} from "../../utils/statusBadges.js";
import {cn} from "../../utils.ts";


const AddPayment = ({...props}) => {

    const [open, setOpen] = useState(false)
    const {data: leases } = useGetLeasesQuery();

    const [createPayment, {isLoading: isCreating}] = useCreatePaymentMutation();

    const paymentFormSchema = z.object({
        date: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
        amount:  zodNumberInputPipe(z.number({errorMap: () => ({message: 'Please enter a valid number.'})})),
        notes: zodStringPipe(z.string().or(z.null())),
        status: zodStringPipe(z.string({errorMap: () => ({message: 'Please select a valid status'})})),
        paymentMethod: zodStringPipe(z.string().or(z.null())),
        //tenantId: z.number({errorMap: () => ({message: 'Please select a tenant.'})}),
        leaseId: zodNumberInputPipe(z.number({errorMap: () => ({message: 'Please select a lease.'})})),
        updatePaymentSchedule: z.boolean()
    })

    const [selectedLease, setSelectedLease] = useState(null)

    const paymentForm = useForm({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            amount: null,
            date: null,
            status: "PAID",
            notes: null,
            paymentMethod: null,
            leaseId: null,
            updatePaymentSchedule: false,
            //tenantId: tenant?.id,
        },
    })
    const onSubmit = (data) => {
        const body = {...data};
        delete body.updatePaymentSchedule;
        if (selectedLease?.paymentSchedule?.length && data.status === "PAID" && data.updatePaymentSchedule) {
            const nextPayment = getNextScheduledPayment(selectedLease)
            body.leasePaymentSchedule = {
                id: nextPayment?.id,
                amountDue: nextPayment?.amountDue - data.amount,
                status: getScheduledPaymentStatus(nextPayment, data.amount)
            }
        }

        createPayment(body).then((res) => {
            if (res.error) {
                console.log(res.error)
            }
            else {
                setOpen(false)
                paymentForm.reset();
            }
        })
    }

    const PaymentScheduleUpdate = () => {
        const nextPayment = getNextScheduledPayment(selectedLease)
        const amount = paymentForm.watch("amount")
        const updatePaymentSchedule = paymentForm.watch("updatePaymentSchedule")
        const paymentStatus = paymentForm.watch("status")

        if (!nextPayment || !amount || !selectedLease || !updatePaymentSchedule || paymentStatus !== "PAID" ) return null;

        return (
            <div className="p-2 border border-primary-dark rounded-md flex flex-col gap-1">
                <div className="flex flex-col">
                    <p className="text-sm text-foreground font-500">
                        Rent Schedule Update
                    </p>
                    <p className="text-sm text-muted-foreground font-400">
                        Based on your changes, the next scheduled payment (ID: {nextPayment?.id}) for this lease will be updated as follows:
                    </p>
                </div>
                <div className="grid grid-cols-3">
                    <div className="text-sm flex flex-col gap-1">
                        <p className="text-foreground font-500 opacity-0">
                            Value
                        </p>
                        <p className="text-foreground font-500">
                            Amount Due
                        </p>
                        <p className="text-foreground font-500">
                            Status
                        </p>
                    </div>
                    <div  className="text-sm flex flex-col gap-1">
                        <p className="text-foreground font-500">
                            Before
                        </p>
                        <p className="text-muted-foreground font-400">
                            {nextPayment.amountDue}
                        </p>
                        <p className="text-foreground font-400">
                            <PaymentScheduleStatusBadge status={nextPayment.status}/>
                        </p>
                    </div>
                    <div className="text-sm flex flex-col gap-1">
                        <p className="text-foreground font-500">
                            After
                        </p>
                        <p className={cn("text-muted-foreground font-400", (nextPayment.amountDue - amount) < 0 && "text-red-500" )}>
                            {nextPayment.amountDue - amount}
                        </p>
                        <p className="text-foreground font-400">
                            <PaymentScheduleStatusBadge status={getScheduledPaymentStatus(nextPayment, amount)}/>
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <Dialog {...props} onOpenChange={() => setOpen(!open)} open={open}>
            <Button onClick={() => setOpen(!open)} variant="outline" type="button">
                {props.children}
            </Button>
            <DialogContent >
                <DialogHeader>
                    <DialogIcon>
                        <Coins className="w-6 h-6"/>
                    </DialogIcon>
                    <DialogTitle>
                       Add Payment
                    </DialogTitle>
                    <DialogDescription>
                        Add a new payment to the system.
                    </DialogDescription>
                </DialogHeader>
                <Form {...paymentForm}>
                    <form
                        onSubmit={paymentForm.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                    >
                        <FormGroup asFlex>
                            <FormField
                                control={paymentForm.control}
                                name="leaseId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Lease *</FormLabel>
                                        <FormControl >
                                            <LeaseSelection onSelect={(leaseId) => {
                                                paymentForm.setValue('leaseId', leaseId)
                                                setSelectedLease(leases?.data?.find((lease) => lease.id === leaseId))
                                                paymentForm.trigger('leaseId')
                                            }} selected={Number(paymentForm.getValues("leaseId"))} leases={leases?.data}
                                                            className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={paymentForm.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Amount *</FormLabel>
                                        <FormControl>
                                            <Input type="currency" placeholder="2000" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>



                        <FormGroup asFlex>
                            <FormField
                                control={paymentForm.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the Payment Status" />
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
                                    <FormItem >
                                        <FormLabel>Payment Method</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Credit Card" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </FormGroup>


                        <FormGroup>
                            <FormField
                                control={paymentForm.control}
                                name="notes"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Notes</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Any relevant notes go here" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={paymentForm.control}
                                name="date"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Payment Date *</FormLabel>
                                        <FormControl>
                                            <Input {...field} defaultValue="09:00" type="datetime-local"/>

                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                        </FormGroup>
                        
                        <FormField
                            control={paymentForm.control}
                            name="updatePaymentSchedule"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-start gap-2 space-y-0 mt-2 ">
                                    <Checkbox title={!selectedLease?.paymentSchedule?.length || paymentForm.watch("status") !== "PAID" ? "Please select a lease with a Lease Schedule and set the Payment Status to 'Paid' to use this." : ""} disabled={!selectedLease?.paymentSchedule?.length || paymentForm.watch("status") !== "PAID"} className="" checked={paymentForm.watch("updatePaymentSchedule")} onClick={() => {
                                        paymentForm.setValue('updatePaymentSchedule', !paymentForm.watch("updatePaymentSchedule"))
                                    }}  {...field} />
                                    <div className="flex flex-col gap-1">
                                        <FormLabel className="flex flex-row items-center">
                                            Update Payment Schedule
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div className="ml-1 cursor-pointer">
                                                            <AiOutlineQuestionCircle className="w-4 h-4 text-muted-foreground"/>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent className="max-w-xs md:max-w-md lg:max-w-lg text-wrap">
                                                        <p hidden>
                                                            When checked, this payment will be applied towards the next scheduled lease payment, reducing the amount due. If the payment covers the full amount, the scheduled payment will be marked as 'Paid.'
                                                        </p>
                                                        <p>
                                                            This requires that the lease has a payment schedule and that the payment status is set to 'Paid.'
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>

                                            </TooltipProvider>
                                        </FormLabel>
                                        <FormDescription>
                                            If a planned payment exists for the selected lease, it will be updated accordingly.
                                        </FormDescription>
                                        <FormMessage/>
                                    </div>

                                </FormItem>
                            )}
                        />

                        <PaymentScheduleUpdate/>







                        <div className="flex justify-between gap-2 mt-4">
                            <Button type="button" variant="outline" className="w-full" onClick={() => {
                                setOpen(false)
                                paymentForm.reset();
                            }}>Cancel</Button>
                            <Button type="submit" variant="gradient" className="w-full" isLoading={isCreating}
                            >
                                <PlusIcon className="h-4 w-4 mr-2" />
                                Create
                            </Button>
                        </div>






                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddPayment;