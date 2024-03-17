import {useState} from "react";
import {useGetUnitsQuery} from "../../services/api/unitApi.js";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogIcon, DialogTitle} from "../ui/dialog.tsx";
import {Button} from "../ui/button.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {expenseSchema} from "../../utils/formSchemas.js";
import {
    Form,
    FormControl,
    FormField,
    FormGroup,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form.tsx";
import {Input} from "../ui/input.tsx";
import {Textarea} from "../ui/textarea.tsx";
import LeaseSelection from "../comboboxes/LeaseSelection.js";
import {ExternalLink, FilePlus2, Plus} from "lucide-react";
import RentalSelection from "../comboboxes/RentalSelection.js";
import {useGetLeasesQuery} from "../../services/api/leaseApi.js";
import {useCreateExpenseMutation} from "../../services/api/financialsApi.js";


const AddExpense = (props) => {

    const [open, setOpen] = useState(false)

    const {data: units} = useGetUnitsQuery();

    const {data: leases} = useGetLeasesQuery();

    const [createExpense, {isLoading: isCreating}] = useCreateExpenseMutation();

    const expenseForm = useForm({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            title: "",
            amount: "",
            category: "",
            date: "",
            unitId: null,
            leaseId: null,
            maintenanceRequestId: null,
            notes: "",
            description: "",
        },
    })

    const onSubmit = (data) => {
        createExpense(data).then((res) => {
            if (res.data) {
                setOpen(false)
                expenseForm.reset();
            }
        })
    }


    return (
        <Dialog {...props} onOpenChange={() => setOpen(!open)} open={open}>
            <Button onClick={() => setOpen(!open)} variant="outline" type="button">
                <FilePlus2 className="h-4 w-4 mr-2"/>
                Add Expense
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogIcon>
                        <ExternalLink className="w-6 h-6"/>
                    </DialogIcon>
                    <DialogTitle>
                        Add Expense
                    </DialogTitle>
                    <DialogDescription>
                        Add a new expense to the system
                    </DialogDescription>
                </DialogHeader>

                <Form {...expenseForm}>
                    <form
                        onSubmit={expenseForm.handleSubmit(onSubmit)}
                        className="flex flex-col gap-2"
                    >

                        <FormGroup asFlex>
                            <FormField
                                control={expenseForm.control}
                                name="title"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title *</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Plumber Cost"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={expenseForm.control}
                                name="category"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Maintenance"  {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </FormGroup>

                        <FormGroup>

                            <FormField
                                control={expenseForm.control}
                                name="date"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Date *</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={expenseForm.control}
                                name="amount"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Amount *</FormLabel>
                                        <FormControl>
                                            <Input type="currency" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>

                        <FormGroup>

                            <FormField
                                control={expenseForm.control}
                                name="unitId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <FormControl>
                                            <RentalSelection onSelect={(unitId) => {
                                                expenseForm.setValue('unitId', unitId)
                                                expenseForm.trigger('unitId')
                                            }} selected={Number(expenseForm.getValues("unitId"))} units={units?.data}
                                                             className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={expenseForm.control}
                                name="leaseId"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Lease</FormLabel>
                                        <FormControl>
                                            <LeaseSelection onSelect={(leaseId) => {
                                                expenseForm.setValue('leaseId', leaseId)
                                                expenseForm.trigger('leaseId')
                                            }} selected={Number(expenseForm.getValues("leaseId"))} leases={leases?.data}
                                                            className="w-full"
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>


                        <FormField
                            control={expenseForm.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="e.g. Maintenance Costs caused by tenant breaking toilet" className="resize-none min-h-[50px]"  {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={expenseForm.control}
                            name="notes"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Notes</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter any relevant notes here"  className="resize-none min-h-[50px]" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-between gap-2 mt-4">
                            <Button type="button" variant="outline" className="w-full" onClick={() => {
                                setOpen(false)
                                expenseForm.reset();
                            }}>Cancel</Button>
                            <Button type="submit" variant="gradient" className="w-full" isLoading={isCreating}
                            >
                                <Plus className="h-4 w-4 mr-2"/>
                                Submit
                            </Button>
                        </div>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default AddExpense;