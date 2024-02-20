import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {getDateTimeString, zodDateInputPipe, zodNumberInputPipe} from "../../utils/formatters.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {PaymentFrequency} from "../../utils/magicNumbers.js";


const LeaseForm = ({lease, onChange}) => {

    const leaseFormSchema = z.object({
        startDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})}).or(z.null())),
        endDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})}).or(z.null())),
        rentalPrice: zodNumberInputPipe(z.number().positive('Number must be positive')).or(z.null()),
        paymentFrequency: z.string().or(z.null()),
    })

    const leaseForm = useForm({
        resolver: zodResolver(leaseFormSchema),
        defaultValues: {
            startDate: lease?.startDate || null,
            endDate: lease?.endDate || null,
            rentalPrice: lease?.rentalPrice || null,
            paymentFrequency: lease?.paymentFrequency || "MONTHLY" || null,
        },
        mode: 'onBlur',
    })

    const handleChange = (values) => {
        onChange(values)
    }


    return (
        <Form {...leaseForm}>
            <form
                onChange={() => handleChange(leaseForm.getValues())}
            >
                   <FormField
                        control={leaseForm.control}
                        name="startDate"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>Start Date</FormLabel>
                                <FormControl
                                    onChange={
                                        (date) => {
                                            leaseForm.setValue('startDate', getDateTimeString(date))
                                            onChange(leaseForm.getValues())
                                        }
                                    }
                                >
                                    <Input type="date" {...field} defaultValue={lease?.startDate} />
                                </FormControl>
                                <FormDescription>
                                    This field is optional.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        />

                <FormField
                    control={leaseForm.control}
                    name="endDate"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>End Date</FormLabel>
                            <FormControl onChange={
                                (date) => {
                                    leaseForm.setValue('endDate', getDateTimeString(date))
                                    onChange(leaseForm.getValues())

                                }
                            }>
                                <Input type="date" defaultValue={lease?.endDate} {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is optional.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                <FormField
                    control={leaseForm.control}
                    name="rentalPrice"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>Rental Price</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is optional.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                <FormField
                    control={leaseForm.control}
                    name="paymentFrequency"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>Payment Frequency</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Payment Frequency" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                        Object.keys(PaymentFrequency).map((status, index) => {
                                            return (
                                                <SelectItem key={index} value={status}>{PaymentFrequency[status]}</SelectItem>
                                            )
                                        })
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}/>
            </form>
        </Form>
    )
}

export default LeaseForm;