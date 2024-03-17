import {useState} from "react";
import {useGetUnitsQuery} from "../../services/api/unitApi.js";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogIcon, DialogTitle} from "../ui/dialog.tsx";
import {Button} from "../ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {maintenanceReportSchema} from "../../utils/formSchemas.js";
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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {MaintenanceStatus, Priority} from "../../utils/magicNumbers.js";
import {Textarea} from "../ui/textarea.tsx";
import LeaseSelection from "../comboboxes/LeaseSelection.js";
import TenantSelection from "../comboboxes/TenantSelection.js";
import {useGetTenantsQuery} from "../../services/api/tenantApi.js";
import {Drill, Flag} from "lucide-react";
import RentalSelection from "../comboboxes/RentalSelection.js";
import {useCreateMaintenanceReportMutation} from "../../services/api/maintenanceApi.js";


const AddMaintenanceReport = (props) => {

    const [open, setOpen] = useState(false)

    const {data: units} = useGetUnitsQuery();

    const {data: tenants} = useGetTenantsQuery();

    const [submitReport, {isLoading: isSubmitting}] = useCreateMaintenanceReportMutation();

    const maintenanceForm = useForm({
        resolver: zodResolver(maintenanceReportSchema),
        defaultValues: {
            unitId: "",
            title: "",
            status: "OPEN",
            priority: "",
            category: "",
            notes: "",
            reporterId: "",
        },
    })

    const onSubmit = (data) => {
        submitReport(data).then((res) => {
            if (res.data) {
                setOpen(false)
                maintenanceForm.reset();
            }
        })
    }


    return (
        <Dialog {...props} onOpenChange={() => setOpen(!open)} open={open}>
            <Button onClick={() => setOpen(!open)} variant="outline" type="button">
                {props.children}
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogIcon>
                        <Drill className="w-6 h-6"/>
                    </DialogIcon>
                    <DialogTitle>
                        Report Maintenance
                    </DialogTitle>
                    <DialogDescription>
                        Use this form to create a new maintenance report.
                    </DialogDescription>
                </DialogHeader>

                <Form {...maintenanceForm}>
                    <form
                        onSubmit={maintenanceForm.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                    >

                        <FormGroup asFlex>
                            <FormField
                                control={maintenanceForm.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title *</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={maintenanceForm.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Plumbing"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                        </FormGroup>

                        <FormGroup asFlex>
                            <FormField
                                control={maintenanceForm.control}
                                name="status"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Status *</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the Status"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                    {
                                                        Object.keys(MaintenanceStatus).map((status, index) => {
                                                            return (
                                                                <SelectItem key={index}
                                                                            value={status}>{MaintenanceStatus[status]}</SelectItem>
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
                                control={maintenanceForm.control}
                                name="priority"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Priority</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the Priority"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem key={"nothing"}
                                                            value={null}> <div className="h-4"/>
                                                </SelectItem>
                                                {
                                                    Object.keys(Priority).map((status, index) => {
                                                        return (
                                                            <SelectItem key={index}
                                                                        value={status}>{Priority[status]}</SelectItem>
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
                            control={maintenanceForm.control}
                            name="unitId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Unit *</FormLabel>
                                    <FormControl>
                                        <RentalSelection onSelect={(unitId) => {
                                            maintenanceForm.setValue('unitId', unitId)
                                            maintenanceForm.trigger('unitId')
                                        }} selected={Number(maintenanceForm.getValues("unitId"))} units={units?.data}
                                                         className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={maintenanceForm.control}
                            name="reporterId"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Reporter</FormLabel>
                                    <FormControl>
                                        <TenantSelection onSelect={(tenantId) => {
                                            maintenanceForm.setValue('reporterId', tenantId)
                                            maintenanceForm.trigger('reporterId')
                                        }} selected={Number(maintenanceForm.getValues("reporterId"))}
                                                         tenants={tenants?.data}
                                                         className="w-full"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                    <FormDescription>
                                        If you want to report a maintenance issue on behalf of a tenant, you can select
                                        them here.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={maintenanceForm.control}
                            name="notes"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter any relevant notes here"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between gap-2 mt-4">
                            <Button type="button" variant="outline" className="w-full" onClick={() => {
                                setOpen(false)
                                maintenanceForm.reset();
                            }}>Cancel</Button>
                            <Button type="submit" variant="gradient" className="w-full" isLoading={isSubmitting}
                            >
                                <Flag className="h-4 w-4 mr-2"/>
                                Submit
                            </Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddMaintenanceReport;