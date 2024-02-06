import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {zodInputStringPipe} from "../../utils/formatters.js";


const LeaseForm = ({lease, onChange}) => {

    const leaseFormSchema = z.object({
        startDate: z.string().or(z.null()),
        endDate: z.string().or(z.null()),
        rentalPrice: zodInputStringPipe(z.number().positive('Number must be positive')).or(z.null()),
        leaseLength: z.string().or(z.null()),
    })

    const leaseForm = useForm({
        resolver: zodResolver(leaseFormSchema),
        defaultValues: {
            startDate: lease?.startDate || null,
            endDate: lease?.endDate || null,
            rentalPrice: lease?.rentalPrice || null,
            leaseLength: lease?.leaseLength || null,
        },
        mode: "onBlur"
    })

    return (
        <Form {...leaseForm}>
            <form onChange={() => {
                onChange(leaseForm.getValues())
            }}>
                   <FormField
                        control={leaseForm.control}
                        name="startDate"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
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
                            <FormControl>
                                <Input type="date" {...field} />
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
                            <FormMessage/>
                        </FormItem>
                    )}/>

                <FormField
                    control={leaseForm.control}
                    name="leaseLength"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>Lease Length</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is optional.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>
            </form>
        </Form>
    )
}

export default LeaseForm;