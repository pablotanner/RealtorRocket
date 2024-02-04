import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../ui/accordion.tsx";
import {Input} from "../../ui/input.tsx";
import {useEffect} from "react";


const UnitForm = ({unit, setUnit, setTrigger, rentalType }) => {

    const unitSchema = z.object({
        unitNumber: z.string(),
        floor: z.coerce.number().or(z.null()),
        unitSize: z.coerce.number().or(z.null()),
        numOfFloors: z.coerce.number().or(z.null()),
        numOfRooms: z.coerce.number().or(z.null()),
        numOfBedrooms: z.coerce.number().or(z.null()),
        numOfBathrooms: z.coerce.number().or(z.null()),
        garages: z.coerce.number().or(z.null()),
    })

    const unitForm = useForm({
        resolver: zodResolver(unitSchema),
        defaultValues: unit
    })

    useEffect(() => {
        unitForm.watch((data) => {
            setUnit(data);
        });

    }, [unitForm.watch]);


    useEffect(() => {
        setTrigger(unitForm.trigger);
    }, [unitForm.trigger]);



    const onSubmit = (data) => {
        setUnit(data)
    }

    return (
                    <Form {...unitForm}>
                        <form onSubmit={unitForm.handleSubmit(onSubmit)} className="flex flex-col gap-y-4 w-[100%]">
                            <Accordion defaultValue={rentalType === "whole" ? "details" : "location"}>
                                <AccordionItem value="location" hidden={rentalType==="whole"}>
                                    <AccordionTrigger> Unit Location </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4">
                                        <FormField
                                            control={unitForm.control}
                                            name="unitNumber"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Unit Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="32" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={unitForm.control}
                                            name="floor"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Floor</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormDescription>
                                                        If the property is a multi-story building, please specify the floor number where the unit is located.
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value={"details"}>
                                    <AccordionTrigger> {rentalType === "whole" ? "Property Details" : "Unit Details"} </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-y-4">
                                        {rentalType === "whole" && <FormField
                                            control={unitForm.control}
                                            name="floor"

                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Floor</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormDescription>
                                                        If the property is a multi-story building, please specify the floor number where the unit is located.
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />}

                                        <FormField
                                            control={unitForm.control}
                                            name="unitSize"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>
                                                        Square Footage (in m<sup>2</sup>)
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="200" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={unitForm.control}
                                            name="numOfFloors"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Number of Floors</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                    <FormDescription>
                                                        If the property has multiple floors, please specify the number of floors.
                                                    </FormDescription>
                                                </FormItem>
                                            )}
                                        />

                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value={"rooms"}>
                                    <AccordionTrigger> Rooms </AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-y-4">
                                        <FormField
                                            control={unitForm.control}
                                            name="numOfRooms"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Number of Rooms</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="6" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={unitForm.control}
                                            name="numOfBedrooms"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Number of Bedrooms</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="3" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={unitForm.control}
                                            name="numOfBathrooms"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Number of Bathrooms</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="2" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={unitForm.control}
                                            name="garages"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Garage Spaces</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="2" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </form>
                    </Form>
    )

}

export default UnitForm;
