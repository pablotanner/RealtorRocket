import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "../../ui/dialog.tsx"
import {Input} from "../../ui/input.tsx";
import {Button} from "../../ui/button.tsx";
import MultiStep from "../../ui/multi-step.js";
import {useEffect, useState} from "react";
import {ArrowLeft, ArrowRight, MinusCircle, PackagePlus, PlusCircle, SquareIcon, SquareStack} from "lucide-react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../ui/form.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../ui/accordion.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../ui/tabs.tsx";
import UnitForm from "./UnitForm.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../ui/select.tsx";
import {useCreatePropertyMutation} from "../../../services/api/propertyApi.js";
import {useNavigate} from "react-router-dom";
import ReviewCard from "./ReviewCard.js";


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

    const [createProperty, {data: createdProperty, isLoading, isSuccess}] = useCreatePropertyMutation();

    const [page, setPage] = useState(0);

    const [rentalConfig, setRentalConfig] = useState(null);

    const [unitFormData, setUnitFormData] = useState([{
        unitNumber: null,
        floor: null,
        unitSize: null,
        numOfFloors: null,
        numOfRooms: null,
        numOfBedrooms: null,
        numOfBathrooms: null,
        garages: null,
    }])

    function addUnitForm() {
        setUnitFormData([...unitFormData, {
            unitNumber: null,
            floor: null,
            unitSize: null,
            numOfFloors: null,
            numOfRooms: null,
            numOfBedrooms: null,
            numOfBathrooms: null,
            garages: null,
        }])
    }

    function removeUnitForm(index) {
        if (unitFormData.length === 1) return;
        const newUnitFormData = [...unitFormData];
        newUnitFormData.splice(index, 1);
        setUnitFormData(newUnitFormData);
    }

    function onPageNumberClick(page) {
        if (page > 1 && !rentalConfig) return;
        setPage(page);
    }

    const propertySchema = z.object({
        title: z.string({errorMap: () => ({message: 'Please enter a title for the property'})}),
        description: z.string({errorMap: () => ({message: 'Please enter a title for the property'})}),
        lotSize: z.coerce.number().or(z.null()),
        yearBuilt: z.coerce.number().or(z.null()),
        realEstateType: z.enum(Object.keys(realEstateTypes), {
            errorMap: () => ({ message: 'Please select a Real Estate Type' })
        }),
        marketPrice: z.coerce.number().or(z.null()),
        street: z.string().or(z.null()),
        city: z.string().or(z.null()),
        state: z.string().or(z.null()),
        zip: z.string().or(z.null()),
        country: z.string().or(z.null()),
    })

    const propertyForm = useForm({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: null,
            description: null,
            lotSize: null,
            yearBuilt: null,
            realEstateType: null,
            marketPrice: null,
            street: null,
            city: null,
            state: null,
            zip: null,
            country: null,
        }
    })

    const [triggers, setTriggers] = useState([]);

    const addTrigger = (trigger) => {
        setTriggers([...triggers, trigger]);
    };


    async function onSubmit(data) {
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
            navigate(`/properties/${createdProperty?.data?.id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading])



    return (
        <Dialog>
            <DialogTrigger asChild>
                {props.trigger}
            </DialogTrigger>
            <DialogContent>
                <Form {...propertyForm}>
                    <form onSubmit={propertyForm.handleSubmit(onSubmit)} className="mt-4">
                        <MultiStep page={page} onPageNumberClick={onPageNumberClick}>
                            <div className="flex flex-col">
                                <div className="text-xl font-600 mb-4">
                                    Property Information
                                </div>
                                Please provide some basic information about the property, you can add more details later.
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

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="realEstateType"
                                                    render={({field}) => (
                                                        <FormItem className="min-w-fit w-[20%]">
                                                            <FormLabel>Real Estate Type (*)</FormLabel>
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


                                                <div className="flex flex-col md:flex-row gap-4">
                                                    <FormField
                                                        control={propertyForm.control}
                                                        name="marketPrice"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Market Price</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        placeholder="200000"
                                                                        {...field}
                                                                        type={"number"}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage/>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={propertyForm.control}
                                                        name="lotSize"
                                                        render={({field}) => (
                                                            <FormItem>
                                                                <FormLabel>Land Size (in m<sup>2</sup>)</FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type="number"
                                                                        placeholder="200" {...field} />
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

                            <div className="flex flex-col gap-y-4">
                                <div className="text-xl font-600">
                                    Rental Configuration
                                </div>
                                How do you plan to rent out your property?


                                <div className="flex flex-row gap-2">
                                    <div
                                        data-active={rentalConfig === "whole"}
                                        className="w-[100%] h-[200p] rounded-lg border-gray-100 border-2 shadow-md p-4 flex items-center justify-center cursor-pointer data-[active=true]:bg-primary-dark data-[active=true]:text-white data-[active=true]:border-primary-dark"
                                        onClick={() => setRentalConfig("whole")}
                                    >
                                        <div className="text-2xl font-600 flex flex-col gap-4">
                                            <SquareIcon className="w-8 h-8" />
                                            Entire Property
                                            <p className="text-sm  font-300">
                                                Rent out the entire property to a single tenant
                                            </p>
                                        </div>
                                    </div>

                                    <div
                                        data-active={rentalConfig === "individual"}
                                        className="w-[100%] h-[200p] rounded-lg border-gray-100 border-2 shadow-md p-4 flex items-center justify-center cursor-pointer data-[active=true]:bg-primary-dark data-[active=true]:text-white data-[active=true]:border-primary-dark"
                                        onClick={() => setRentalConfig("individual")}
                                    >
                                        <div className="text-2xl font-600 flex flex-col gap-4">
                                            <SquareStack className="w-8 h-8" />
                                            Individual Units
                                            <p className="text-sm font-300">
                                                Rent out individual units to multiple tenants
                                            </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => setPage(0)}>
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back
                                    </Button>
                                    <Button variant="gradient" onClick={() => setPage(2)} disabled={!rentalConfig}>
                                        Next
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>


                            <div
                                className="flex flex-col gap-y-2"
                                data-blocked={!rentalConfig}
                            >
                                <div className="text-xl font-600">
                                    {rentalConfig === "whole" ? "Property" : "Unit"} Specifications
                                </div>

                                {rentalConfig === "whole" ? "Please fill out some information about the Rental Property." : "Please add at least one unit to the property."
                                }


                                <div>
                                    <Tabs defaultValue={"0"} hidden={rentalConfig === "whole"}>
                                        <TabsList>
                                            {unitFormData.map((unit, index) => (
                                                <TabsTrigger value={index.toString()} key={"trigger-" +index}>
                                                    Unit {index + 1}
                                                </TabsTrigger>
                                            ))}
                                            { unitFormData.length < 5 && <Button className="py-2" variant="outline" onClick={(event) => {event.preventDefault(); event.stopPropagation(); addUnitForm() }}><PlusCircle className="w-4 h-4"/> </Button>}
                                            { unitFormData.length > 1 && <Button className="py-2" variant="outline" onClick={() => {event.preventDefault(); event.stopPropagation(); removeUnitForm() }}><MinusCircle className="w-4 h-4"/> </Button>}

                                        </TabsList>

                                        {unitFormData.map((unit, index) => (
                                            <TabsContent value={index.toString()} key={"content-"+ index}>
                                                <UnitForm setTrigger={addTrigger} rentalType={rentalConfig} unit={unit} setUnit={(data) => {
                                                    const newUnitFormData = [...unitFormData];
                                                    newUnitFormData[index] = data;
                                                    setUnitFormData(newUnitFormData);
                                                }} />
                                            </TabsContent>
                                        ))}
                                    </Tabs>

                                    {rentalConfig === "whole" && <UnitForm setTrigger={addTrigger} rentalType={rentalConfig} unit={unitFormData[0]} setUnit={(data) => {
                                        setUnitFormData([data]);
                                    }}/>}

                                </div>
                                <div className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => setPage(1)}>
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back
                                    </Button>
                                    <Button variant="gradient" onClick={() => setPage(3)}>
                                        Next
                                        <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </div>
                            </div>


                            <div className="flex flex-col"
                                 data-blocked={!rentalConfig}
                            >
                                <div className="text-xl font-600">
                                    Review
                                </div>
                                Please review the information you have entered and make sure everything is correct.

                                <ReviewCard propertyData={propertyForm.getValues()} unitData={unitFormData} rentalType={rentalConfig} />

                                {/*If form validation error occurs, tell them to go check it out */}
                                <div hidden={Object.keys(propertyForm.formState.errors).length === 0}>
                                    <FormMessage>
                                        There are errors in the form. Please go back and check the form for errors.
                                    </FormMessage>
                                </div>

                                <div className="flex justify-between mt-4">
                                    <Button variant="outline" onClick={() => setPage(2)}>
                                        <ArrowLeft className="mr-2 w-4 h-4" />
                                        Back
                                    </Button>
                                    <Button variant="gradient" onClick={() => setPage(3)} type="submit" isLoading={isLoading} >
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