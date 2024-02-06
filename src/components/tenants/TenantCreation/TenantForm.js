import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Input} from "../../ui/input.tsx";

const TenantForm = ({onSubmit, children}) => {

    const tenantFormSchema = z.object({
        firstName: z.string({errorMap: () => ({message: 'Please enter a first name.'})}),
        lastName: z.string({errorMap: () => ({message: 'Please enter a last name.'})}),
        email: z.string().or(z.null()),
        phone: z.string().or(z.null())
    })

    const tenantForm = useForm({
        resolver: zodResolver(tenantFormSchema),
        defaultValues: {
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
        }
    })

    return (
        <Form {...tenantForm}>
            <form onSubmit={tenantForm.handleSubmit(onSubmit)}>
                <FormField
                    control={tenantForm.control}
                    name="firstName"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={tenantForm.control}
                    name="lastName"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={tenantForm.control}
                    name="email"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>E-Mail</FormLabel>
                            <FormControl>
                                <Input placeholder="john.doe@mail.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is optional.
                            </FormDescription>
                            <FormMessage/>

                        </FormItem>
                    )}
                />

                <FormField
                    control={tenantForm.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem >
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input placeholder="123-456-7890" {...field} />
                            </FormControl>
                            <FormDescription>
                                This field is optional.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                {children}
            </form>
        </Form>
    )
}

export default TenantForm;