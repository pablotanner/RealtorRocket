import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {zodNumberInputPipe, zodStringPipe} from "../../utils/formatters.js";
import {
    Form,
    FormControl,
    FormDescription,
    FormField, FormGroup,
    FormItem,
    FormLabel,
    FormMessage,
    FormValue
} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Button} from "../ui/button.tsx";
import {useState} from "react";
import {Save} from "lucide-react";
import {CivilStatus} from "../../utils/magicNumbers.js";

const EditTenant = ({tenant}) => {
    const [isEditing, setIsEditing] = useState(false);


    const tenantProfileSchema = z.object({
        firstName: zodStringPipe(z.string({errorMap: () => ({message: 'First name is required.'})})),
        lastName: zodStringPipe(z.string({errorMap: () => ({message: 'Last name is required.'})})),
        email: zodStringPipe(z.string().email().or(z.null())),
        phone: zodStringPipe(z.string().or(z.null())),
        civilStatus: zodStringPipe(z.string().or(z.null())),
        occupation: zodStringPipe(z.string().or(z.null())),
        income: zodNumberInputPipe(z.number().or(z.null())),
        creditScore: zodNumberInputPipe(z.number().or(z.null())),
    })

    const tenantProfileForm = useForm({
        resolver: zodResolver(tenantProfileSchema),
        defaultValues: {
            firstName: tenant?.firstName || null,
            lastName: tenant?.lastName || null,
            email: tenant?.email || null,
            phone: tenant?.phone || null,
            civilStatus: tenant?.civilStatus || null,
            occupation: tenant?.occupation || null,
            income: tenant?.income || null,
            creditScore: tenant?.creditScore || null,
        },
    })

    const onSubmit = (data) => {
        console.log(data)
        setIsEditing(false)
    }


    return (
        <div className="p-2">
            <Form {...tenantProfileForm}>
                <form onSubmit={tenantProfileForm.handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 justify-start">
                        <Button
                            variant={isEditing ? "light" : "gradient"}
                            onClick={() => {
                                setIsEditing(!isEditing)
                                tenantProfileForm.reset()
                            }}
                            type="button"
                        >
                            {isEditing ? "Cancel" : "Edit"}
                        </Button>

                        {isEditing && (
                            <Button type="submit" variant="gradient">
                                <Save className="w-4 h-4 mr-2"/>
                                Save
                            </Button>
                        )}

                    </div>

                    <FormGroup>
                        <FormField
                            control={tenantProfileForm.control}
                            name="firstName"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        {isEditing ?
                                            <Input placeholder="John" {...field} />
                                            :
                                            <FormValue>{field.value}</FormValue>
                                        }
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={tenantProfileForm.control}
                            name="lastName"
                            render={({field}) => (
                                <FormItem >
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        {isEditing ?
                                            <Input placeholder="Doe" {...field} />
                                            :
                                            <FormValue>{field.value}</FormValue>
                                        }
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </FormGroup>


                    <FormField
                        control={tenantProfileForm.control}
                        name="email"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>E-Mail</FormLabel>
                                <FormControl>
                                    {isEditing ?
                                        <Input placeholder="john.doe@mail.com" {...field} />
                                        :
                                        <FormValue>{field.value}</FormValue>
                                    }
                                </FormControl>
                                <FormMessage/>

                            </FormItem>
                        )}
                    />

                    <FormField
                        control={tenantProfileForm.control}
                        name="phone"
                        render={({field}) => (
                            <FormItem >
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    {isEditing ?
                                        <Input {...field} />
                                        :
                                        <FormValue>{field.value}</FormValue>
                                    }
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}/>

                    <FormGroup>
                        <FormField
                            control={tenantProfileForm.control}
                            name="occupation"
                            render={({field}) => (
                                <FormItem >
                                    <FormLabel>Occupation</FormLabel>
                                    <FormControl>
                                        {isEditing ?
                                            <Input {...field} placeholder="Nurse" />
                                            :
                                            <FormValue>{field.value}</FormValue>
                                        }
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        <FormField
                            control={tenantProfileForm.control}
                            name="civilStatus"
                            render={({field}) => (
                                <FormItem >
                                    <FormLabel>Civil Status</FormLabel>
                                    <FormControl>
                                        {isEditing ?
                                            <select {...field} className="w-full" defaultValue={tenant.civilStatus || ""}>
                                                <option value=""
                                                        className="text-gray-400"
                                                >Select</option>
                                                {Object.keys(CivilStatus).map((status) => (
                                                    <option key={status} value={status}>{CivilStatus[status]}</option>
                                                ))}
                                            </select>
                                            :
                                            <FormValue>{field.value}</FormValue>
                                        }
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </FormGroup>


                    <FormGroup>
                        <FormField
                            control={tenantProfileForm.control}
                            name="income"
                            render={({field}) => (
                                <FormItem >
                                    <FormLabel>Income</FormLabel>
                                    <FormControl>
                                        {isEditing ?
                                            <Input {...field} placeholder="50000" type="number" />
                                            :
                                            <FormValue>{field.value}</FormValue>
                                        }
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>

                        <FormField
                            control={tenantProfileForm.control}
                            name="creditScore"
                            render={({field}) => (
                                <FormItem >
                                    <FormLabel>Credit Score</FormLabel>
                                    <FormControl>
                                        {isEditing ?
                                            <Input {...field} placeholder="1000" type="number" />
                                            :
                                            <FormValue>{field.value}</FormValue>
                                        }
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                    </FormGroup>



                </form>
            </Form>
        </div>

    )
}

export default EditTenant;