import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "../ui/dialog.tsx";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import RentalSelection from "../rentals/RentalSelection.js";
import {useGetUnitsQuery} from "../../services/api/unitApi.js";
import TenantSelection from "../tenants/TenantSelection.js";
import {useGetTenantsQuery} from "../../services/api/tenantApi.js";
import {Button} from "../ui/button.tsx";
import {PlusIcon} from "lucide-react";
import {zodDateInputPipe, zodNumberInputPipe, zodStringPipe} from "../../utils/formatters.js";
import {useCreateLeaseMutation} from "../../services/api/leaseApi.js";
import {DatePicker} from "../ui/date-picker.tsx";


const AddLease = ({unit, tenant, ...props}) => {

    const {data: units } = useGetUnitsQuery();

    const {data: tenants } = useGetTenantsQuery();

    const [createLease, {isLoading: isCreating}] = useCreateLeaseMutation();

    const leaseFormSchema = z.object({
        startDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
        endDate: zodDateInputPipe(z.string({errorMap: () => ({message: 'Please enter a valid date.'})})),
        rentalPrice: zodNumberInputPipe(z.number({errorMap: () => ({message: 'Please enter a valid number.'})})),
        paymentFrequency: zodStringPipe(z.string({errorMap: () => ({message: 'Please enter a valid payment frequency.'})})),
        tenantId: z.number({errorMap: () => ({message: 'Please select a tenant.'})}),
        unitId: z.number({errorMap: () => ({message: 'Please select a unit.'})}),
    })

    const leaseForm = useForm({
        resolver: zodResolver(leaseFormSchema),
        defaultValues: {
            startDate: null,
            endDate: null,
            rentalPrice: null,
            paymentFrequency: null,
            tenantId: tenant?.id || null,
            unitId: unit?.id || null,
        },
    })

    const onSubmit = (data) => {
        createLease(data).then((res) => {
            if (res.error) {
                console.log(res.error)
            }
            else {
                props.onOpenChange()
                leaseForm.reset();
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
                    <DialogTitle>
                        Add Lease
                    </DialogTitle>
                </DialogHeader>
                <Form {...leaseForm}>
                    <form
                        onSubmit={leaseForm.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                    >

                        <FormGroup>
                            <FormField
                                control={leaseForm.control}
                                name="startDate"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Lease Start*</FormLabel>
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
                                control={leaseForm.control}
                                name="endDate"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Lease End</FormLabel>
                                        <FormControl>
                                            <Input  {...field} defaultValue="15:00" type="datetime-local" />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>

                        <FormField
                            control={leaseForm.control}
                            name="rentalPrice"
                            render={({field}) => (
                                <FormItem >
                                    <FormLabel>Rental Price*</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="2000" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                            <FormField
                                control={leaseForm.control}
                                name="paymentFrequency"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Payment Frequency*</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="WEEKLY, MONTHLY, QUARTERLY, YEARLY" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />







                        <FormGroup className="mt-2">
                            <FormField
                                control={leaseForm.control}
                                name="unitId"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Unit*</FormLabel>
                                        <FormControl>
                                            <RentalSelection onSelect={(unitId) => {
                                                leaseForm.setValue('unitId', unitId)
                                                leaseForm.trigger('unitId')
                                            }} selected={unit} units={units}
                                                             className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={leaseForm.control}
                                name="tenantId"
                                render={({field}) => (
                                    <FormItem >
                                        <FormLabel>Tenant*</FormLabel>
                                        <FormControl>
                                            <TenantSelection onSelect={(tenantId) => {
                                                leaseForm.setValue('tenantId', tenantId)
                                                leaseForm.trigger('tenantId')
                                            }} selected={tenant} tenants={tenants}
                                                             className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}

                            />

                        </FormGroup>

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

export default AddLease;