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
import {unitSchema} from "../../utils/formSchemas.js";
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
import {Building} from "lucide-react";
import {Input} from "../ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {ListingStatus} from "../../utils/magicNumbers.js";
import {Button} from "../ui/button.tsx";
import {useUpdateUnitMutation} from "../../services/api/unitApi.js";


const EditRentalUnit = ({unit, open, setOpen, ...props}) => {

    const rentalForm = useForm({
        resolver: zodResolver(unitSchema),
        defaultValues: {
            ...unit
        }
    })

    const [updateUnit, {isLoading: isUpdating}] = useUpdateUnitMutation()



    const handleSubmit = (data) => {
        const body = {...data}
        // Remove information wasn't changed
        Object.keys(body).forEach(key => {
            if (body[key] === unit[key]) {
                delete body[key]
            }
        })
        body.id = unit.id


        updateUnit(body).then((res) => {
            if (res.error) {
                console.log(res.error)
            } else {
                setOpen(false)
                // Update the form with the new data
                rentalForm.reset(body)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent>
                <DialogHeader>
                    <DialogIcon>
                        <Building className="w-6 h-6" />
                    </DialogIcon>
                    <DialogTitle>
                        Edit Unit ({unit.unitIdentifier})
                    </DialogTitle>
                    <DialogDescription>
                        Edit the general information for this unit.
                    </DialogDescription>
                </DialogHeader>

                <Form {...rentalForm}>
                    <form onSubmit={rentalForm.handleSubmit(handleSubmit)} className="flex flex-col gap-2">

                        <FormField
                            control={rentalForm.control}
                            name="unitIdentifier"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Unit Identifier *</FormLabel>
                                    <FormControl>
                                        <Input {...field}  />
                                    </FormControl>
                                    <FormMessage/>
                                    <FormDescription>
                                        This is the unique identifier for the unit
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <FormGroup>
                            <FormField
                                control={rentalForm.control}
                                name="unitNumber"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Unit Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="3A" {...field}  />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={rentalForm.control}
                                name="floor"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Floor</FormLabel>
                                        <FormControl>
                                            <Input placeholder="0" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>

                        <FormGroup>
                            <FormField
                                control={rentalForm.control}
                                name="numOfFloors"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Floors</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="2" type="number"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={rentalForm.control}
                                name="numOfRooms"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Rooms</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="6" type="number"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={rentalForm.control}
                                name="unitSize"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Unit Size</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="100" type="number"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </FormGroup>

                        <FormGroup>
                            <FormField
                                control={rentalForm.control}
                                name="numOfBedrooms"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Bedrooms</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="2" type="number"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={rentalForm.control}
                                name="numOfBathrooms"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Bathrooms</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="1" type="number"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={rentalForm.control}
                                name="garages"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Garages</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="2" type="number"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>

                        <FormGroup>
                            <FormField
                                control={rentalForm.control}
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
                                                    Object.keys(ListingStatus).map((status, index) => {
                                                        return (
                                                            <SelectItem key={index}
                                                                        value={status}>{ListingStatus[status]}</SelectItem>
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
                                control={rentalForm.control}
                                name="rentalPrice"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Rental Price</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="2000" type="currency"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                        </FormGroup>

                        <div className="w-full flex flex-row gap-2 justify-between mt-2">
                            <Button variant="outline" type="reset" onClick={() => {
                                setOpen(false)
                                rentalForm.reset()
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

export default EditRentalUnit;