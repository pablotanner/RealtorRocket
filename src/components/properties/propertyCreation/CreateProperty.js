import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../../ui/dialog.tsx"
import {Input} from "../../ui/input.tsx";
import {Button} from "../../ui/button.tsx";
import MultiStep from "../../ui/multi-step.js";
import {useEffect, useState} from "react";
import {ArrowLeft, ArrowRight, MinusCircle, PackagePlus, PlusCircle} from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../ui/accordion.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../ui/tabs.tsx";
import UnitForm from "./UnitForm.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select.tsx";
import {useCreatePropertyMutation} from "../../../services/api/propertyApi.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


const realEstateTypes = {
    "SINGLE_FAMILY_HOME": "Single Family Home",
    "MULTI_FAMILY_HOME": "Multi Family Home",
    "CONDO": "Condo",
    "APARTMENT": "Apartment",
    "TOWNHOUSE": "Townhouse",
    "LUXURY": "Luxury",
    "OFFICE": "Office",
    "RETAIL": "Retail",
    "INDUSTRIAL": "Industrial",
    "LAND": "Land",
    "FARM": "Farm"
}


const CreateProperty = (props) => {
    const navigate = useNavigate();

    const [createProperty, {data: createdProperty, error, isLoading, isSuccess, isError}] = useCreatePropertyMutation();

    const [page, setPage] = useState(0);

    const [unitFormData, setUnitFormData] = useState([{
        unitNumber: '',
        floor: '',
        unitSize: '',
        numOfFloors: '',
        numOfRooms: '',
        numOfBedrooms: '',
        numOfBathrooms: '',
        garages: '',
    }])

    function addUnitForm() {
        setUnitFormData([...unitFormData, {
            unitNumber: '',
            floor: '',
            unitSize: '',
            numOfFloors: '',
            numOfRooms: '',
            numOfBedrooms: '',
            numOfBathrooms: '',
            garages: '',
        }])
    }

    function removeUnitForm(index) {
        if (unitFormData.length === 1) return;
        const newUnitFormData = [...unitFormData];
        newUnitFormData.splice(index, 1);
        setUnitFormData(newUnitFormData);
    }

    function onPageNumberClick(page) {
        setPage(page);
    }

    const propertySchema = z.object({
        title: z.string().min(1, "Please enter a title for the property"),
        description: z.string().min(1, "Please enter a description for the property"),
        lotSize: z.string(),
        yearBuilt: z.string(),
        realEstateType: z.string(),
        marketPrice: z.string(),
        street: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
        country: z.string(),
    })

    const propertyForm = useForm({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: '',
            description: '',
            lotSize: '',
            yearBuilt: '',
            realEstateType: '',
            marketPrice: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
        }
    })

    const [triggers, setTriggers] = useState([]);

    const addTrigger = (trigger) => {
        setTriggers([...triggers, trigger]);
    };


    async function onSubmit(data) {
        //const results = await Promise.all(triggers.map(trigger => trigger()));
        //const allValid = results.every(result => result);
        if (data.lotSize)         data.lotSize = parseInt(data.lotSize)
        if (data.yearBuilt)       data.yearBuilt = parseInt(data.yearBuilt)
        if (data.marketPrice)  data.marketPrice = parseInt(data.marketPrice)

        for (let i = 0; i < unitFormData.length; i++) {
            const unit = unitFormData[i];
            if (unit.floor) unit.floor = parseInt(unit.floor);
            if (unit.unitSize) unit.unitSize = parseInt(unit.unitSize);
            if (unit.numOfFloors) unit.numOfFloors = parseInt(unit.numOfFloors);
            if (unit.numOfRooms) unit.numOfRooms = parseInt(unit.numOfRooms);
            if (unit.numOfBedrooms) unit.numOfBedrooms = parseInt(unit.numOfBedrooms);
            if (unit.numOfBathrooms) unit.numOfBathrooms = parseInt(unit.numOfBathrooms);
            if (unit.garages) unit.garages = parseInt(unit.garages);
        }

        createProperty({...data , units: unitFormData})

    }

    useEffect(() => {
        if (isSuccess) {
            toast.info('Property created successfully')
            navigate(`/properties/${createdProperty?.data?.id}`)
        }
        else if (isError) {
            toast.error(error?.data?.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])



    return (
        <Dialog>
            <DialogTrigger asChild>
                {props.trigger}
            </DialogTrigger>
            <DialogContent className="">
                <Form {...propertyForm}>
                    <form onSubmit={propertyForm.handleSubmit(onSubmit)}>
                        <MultiStep page={page} onPageNumberClick={onPageNumberClick} className="mt-8">
                            <div className="flex flex-col">
                                <div className="text-xl font-600">
                                    Property Information
                                </div>
                                    <Accordion type="single" collapsible defaultValue="general" >
                                        <AccordionItem value={"general"}>
                                            <AccordionTrigger>
                                                General Information
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-y-2">
                                                <FormField
                                                    control={propertyForm.control}
                                                    name="title"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Title (*)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Lakeview Mansion" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="description"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Description (*)</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="A newly built mansion next to the Norris Lake" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />


                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <FormField
                                                        control={propertyForm.control}
                                                        name="realEstateType"
                                                        render={({field}) => (
                                                            <FormItem className="min-w-fit w-[20%]">
                                                                <FormLabel>Real Estate Type</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger>
                                                                            <SelectValue />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        {Object.entries(realEstateTypes).map(([key, value]) => (
                                                                            <SelectItem key={key} value={key}>
                                                                                {value}
                                                                            </SelectItem>
                                                                        ))}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={propertyForm.control}
                                                        name="marketPrice"
                                                        render={({field}) => (
                                                            <FormItem >
                                                                <FormLabel>Market Price</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="200000" {...field} />
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={propertyForm.control}
                                                        name="lotSize"
                                                        render={({field}) => (
                                                            <FormItem >
                                                                <FormLabel>Lot Size (in square metres)</FormLabel>
                                                                <FormControl>
                                                                    <Input placeholder="200" {...field} />
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>



                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem value={"location"}>
                                            <AccordionTrigger>
                                                Location
                                            </AccordionTrigger>
                                            <AccordionContent className="flex flex-col gap-y-2" >
                                                <FormField
                                                    control={propertyForm.control}
                                                    name="street"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Street Address </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Washington Street" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="city"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>City </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Seattle" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="state"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>State </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Washington" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="zip"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>ZIP </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="49203" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="country"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Country </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="USA" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                <div className="flex justify-end mt-4">
                                    <Button variant="gradient" onClick={() => setPage(1)}>
                                        Next
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-xl font-600">
                                    Unit Information
                                </div>
                                Please add at least one unit to the property.
                                <div>
                                    <Tabs defaultValue={"0"}>
                                        <TabsList >
                                            {unitFormData.map((unit, index) => (
                                                <TabsTrigger value={index.toString()} key={"trigger-" +index}>
                                                    Unit {index + 1}
                                                </TabsTrigger>
                                            ))}
                                            { unitFormData.length < 5 && <Button className="py-2" variant="outline" onClick={(event) => {event.preventDefault(); event.stopPropagation(); addUnitForm() }}><PlusCircle className="w-4 h-4"/> </Button>}
                                            { unitFormData.length > 1 && <Button className="py-2" variant="outline" onClick={() => removeUnitForm()}><MinusCircle className="w-4 h-4"/> </Button>}

                                        </TabsList>

                                        {unitFormData.map((unit, index) => (
                                            <TabsContent value={index.toString()} key={"content-"+ index}>
                                                <UnitForm setTrigger={addTrigger} unit={unit} setUnit={(data) => {
                                                    const newUnitFormData = [...unitFormData];
                                                    newUnitFormData[index] = data;
                                                    setUnitFormData(newUnitFormData);
                                                }} />
                                            </TabsContent>
                                        ))}
                                    </Tabs>

                                </div>
                                <div className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => setPage(0)}>
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back
                                    </Button>
                                    <Button variant="gradient" onClick={() => setPage(2)}>
                                        Next
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-xl font-600">
                                    Review
                                </div>
                                <div>
                                    You are about to create a property with the following details:
                                    <div>
                                        - {propertyForm.getValues().title || "No Title"}
                                    </div>
                                    <div>
                                       - {unitFormData.length} Unit(s)
                                    </div>
                                </div>

                                {/*If form validation error occurs, tell them to go check it out */}
                                <div hidden={Object.keys(propertyForm.formState.errors).length === 0}>
                                    <FormMessage>
                                        There are errors in the form. Please go back and check the form for errors.
                                    </FormMessage>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => setPage(1)}>
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back
                                    </Button>
                                    <Button variant="gradient" onClick={() => setPage(2)} type="submit" isLoading={isLoading} >
                                        Create
                                        <PackagePlus className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </MultiStep>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )

}

export default CreateProperty;