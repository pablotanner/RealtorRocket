import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {TabsContent} from "../../ui/tabs.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../ui/accordion.tsx";
import {Input} from "../../ui/input.tsx";
import {useEffect} from "react";


const UnitForm = ({unit, setUnit, setTrigger }) => {

    const unitSchema = z.object({
        unitNumber: z.string(),
        floor: z.string(),
        unitSize: z.string(),
        numOfFloors: z.string(),
        numOfRooms: z.string(),
        numOfBedrooms: z.string(),
        numOfBathrooms: z.string(),
        garages: z.string(),
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
                        <form onSubmit={unitForm.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 w-[100%]">
                            <Accordion defaultValue="location">
                                <AccordionItem value="location">
                                    <AccordionTrigger> Unit Location </AccordionTrigger>
                                    <AccordionContent className="flex flex-row gap-x-4">
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
                                                        <Input placeholder="1" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value={"details"}>
                                    <AccordionTrigger> Unit Details </AccordionTrigger>
                                    <AccordionContent>
                                        <FormField
                                            control={unitForm.control}
                                            name="unitSize"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Unit Size (in square metres)</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="200" {...field} />
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
                                                    <FormLabel>Floor Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="1" {...field} />
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
                                                        <Input placeholder="2" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />

                                    </AccordionContent>
                                </AccordionItem>

                                <AccordionItem value={"rooms"}>
                                    <AccordionTrigger> Rooms </AccordionTrigger>
                                    <AccordionContent>
                                        <FormField
                                            control={unitForm.control}
                                            name="numOfRooms"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Number of Rooms</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="6" {...field} />
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
                                                        <Input placeholder="3" {...field} />
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
                                                        <Input placeholder="2" {...field} />
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
