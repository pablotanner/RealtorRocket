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
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {Coins, PlusIcon} from "lucide-react";
import {zodDateInputPipe, zodNumberInputPipe, zodStringPipe} from "../../utils/formatters.js";
import { useGetLeasesQuery} from "../../services/api/leaseApi.js";
import {useCreatePaymentMutation} from "../../services/api/financialsApi.js";
import LeaseSelection from "../comboboxes/LeaseSelection.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {PaymentStatus} from "../../utils/magicNumbers.js";


const AddPayment = ({...props}) => {

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
    })

    const paymentForm = useForm({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            amount: null,
            date: null,
            status: "PAID",
            notes: null,
            paymentMethod: null,
            leaseId: null,
            //tenantId: tenant?.id,
        },
    })
    const onSubmit = (data) => {
        createPayment(data).then((res) => {
            if (res.error) {
                console.log(res.error)
            }
            else {
                props.onOpenChange()
                paymentForm.reset();
            }
        })
    }

    return (
        <Dialog {...props}>
            <DialogTrigger>
                {props.children}
            </DialogTrigger>
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
                                name="date"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Payment Date*</FormLabel>
                                        <FormControl>
                                            {/*
                                            <DatePicker initialStartDate={new Date()} onChange={(date) => {
                                                leaseForm.setValue('startDate', date)
                                                leaseForm.trigger('startDate')
                                            }}/>
                                            */}
                                            <Input {...field} defaultValue="09:00" type="datetime-local"/>

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
                                        <FormLabel>Amount*</FormLabel>
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
                            name="leaseId"
                            render={({field}) => (
                                <FormItem className="flex flex-col" >
                                    <FormLabel>Lease*</FormLabel>
                                    <FormControl >
                                        <LeaseSelection onSelect={(leaseId) => {
                                            paymentForm.setValue('leaseId', leaseId)
                                            paymentForm.trigger('leaseId')
                                        }} selected={Number(paymentForm.getValues("leaseId"))} leases={leases?.data}
                                                         className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />







                        <div className="flex justify-between gap-2 mt-4">
                            <Button type="button" variant="outline" className="w-full" onClick={props.onOpenChange}>Cancel</Button>
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