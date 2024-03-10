import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogIcon,
    DialogTitle,
} from "../ui/dialog.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {leaseSchema} from "../../utils/formSchemas.js";
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
import {Building, Scroll} from "lucide-react";
import {Input} from "../ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {LeaseStatus, PaymentFrequency} from "../../utils/magicNumbers.js";
import {Button} from "../ui/button.tsx";
import {useUpdateLeaseMutation} from "../../services/api/leaseApi.js";
import {Textarea} from "../ui/textarea.tsx";
import TenantSelection from "../comboboxes/TenantSelection.js";
import RentalSelection from "../comboboxes/RentalSelection.js";
import {selectAllTenants, selectAllUnits} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";


const EditLease = ({lease, open, setIsOpen, ...props}) => {

    const leaseForm = useForm({
        resolver: zodResolver(leaseSchema),
        defaultValues: {
            ...lease,
            startDate: new Date(lease?.startDate),
            endDate: new Date(lease?.endDate),
        }
    })

    const [updateLease, {isLoading: isUpdating}] = useUpdateLeaseMutation()

    const tenants = useSelector(state => selectAllTenants(state));

    const units = useSelector(state => selectAllUnits(state))



    const handleSubmit = (data) => {
        const body = {...data}
        // Remove information wasn't changed
        Object.keys(body).forEach(key => {
            if (key === 'startDate' || key === 'endDate') {
                // Remove time and compare
                if (new Date(body[key]).toDateString() === new Date(lease[key]).toDateString()) {
                    delete body[key]
                }
            }
            if (body[key] === lease[key]) {
                delete body[key]
            }
        })
        body.id = lease.id


        updateLease(body).then((res) => {
            if (res.error) {
                console.log(res.error)
            } else {
                setIsOpen(false)
                // Update the form with the new data
                leaseForm.reset(body)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={() => setIsOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogIcon>
                        <Scroll className="w-6 h-6" />
                    </DialogIcon>
                    <DialogTitle>
                        Edit Lease
                    </DialogTitle>
                    <DialogDescription>
                        Edit the lease information
                    </DialogDescription>
                </DialogHeader>

                <Form {...leaseForm}>
                    <form onSubmit={leaseForm.handleSubmit(handleSubmit)} className="flex flex-col gap-2">

                        <FormGroup>

                            <FormField
                                control={leaseForm.control}
                                name="startDate"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Start Date *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field}  />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={leaseForm.control}
                                name="endDate"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>End Date *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field}  />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>


                        <FormGroup>
                            <FormField
                                control={leaseForm.control}
                                name="rentalPrice"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Rental Price</FormLabel>
                                        <FormControl>
                                            <Input type="currency" {...field}  />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={leaseForm.control}
                                name="paymentFrequency"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Payment Frequency</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select..."/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.keys(PaymentFrequency).map((status, index) => {
                                                        return (
                                                            <SelectItem key={index}
                                                                        value={status}>{PaymentFrequency[status]}</SelectItem>
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
                                control={leaseForm.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select..."/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    Object.keys(LeaseStatus).map((status, index) => {
                                                        return (
                                                            <SelectItem key={index}
                                                                        value={status}>{LeaseStatus[status]}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>


                        <FormField
                            control={leaseForm.control}
                            name="notes"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="resize-none"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={leaseForm.control}
                            name="specialTerms"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Special Terms</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} className="resize-none"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormGroup>
                            <FormField
                                control={leaseForm.control}
                                name="tenantId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tenant</FormLabel>
                                        <FormControl >
                                            <TenantSelection onSelect={(tenantId) => {
                                                leaseForm.setValue('tenantId', tenantId)
                                                leaseForm.trigger('tenantId')
                                            }} selected={Number(leaseForm.getValues("tenantId"))} tenants={tenants}
                                                            className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={leaseForm.control}
                                name="unitId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <FormControl >
                                            <RentalSelection onSelect={(unitId) => {
                                                leaseForm.setValue('unitId', unitId)
                                                leaseForm.trigger('unitId')
                                            }} selected={Number(leaseForm.getValues("unitId"))} units={units}
                                                             className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                        </FormGroup>



                        <div className="w-full flex flex-row gap-2 justify-between mt-2">
                            <Button variant="outline" type="reset" onClick={() => {
                                setIsOpen(false)
                                leaseForm.reset()
                            }}
                                    disabled={isUpdating}
                                    className="w-full"
                            >
                                Cancel
                            </Button>
                            <Button variant="gradient" type="submit"
                                    isLoading={isUpdating}
                                    disabled={isUpdating}
                                    className="w-full"
                            >
                                Save Changes
                            </Button>
                        </div>


                    </form>
                </Form>
            </DialogContent>

        </Dialog>
    )
}

export default EditLease;