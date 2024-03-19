import React, {useEffect, useState} from "react";
import {
    ArrowLeft,
    ArrowRight, BadgeCheck, Building2,
    BuildingIcon,
    Check, CheckCircle2,
    CrossIcon, DoorClosed,
    Home,
    Image,
    Info,
    ListIcon,
    MapPin, Plus,
    SquareIcon,
    SquareStack, XIcon
} from "lucide-react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {propertySchema} from "../../utils/formSchemas.js";
import {Form, FormControl, FormField, FormGroup, FormItem, FormLabel, FormMessage} from "../../components/ui/form.tsx";
import {Card, CardContent, CardHeader, CardTitle} from "../../components/ui/card.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";
import {getRealEstateIcon, ListingStatus} from "../../utils/magicNumbers.js";
import {RealEstateType} from "../../utils/magicNumbers.js";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../../components/ui/carousel.tsx";
import {Button} from "../../components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../components/ui/dialog.tsx";
import UnitCreationTable from "../../components/properties/UnitCreationTable.js";
import {useCreatePropertyMutation} from "../../services/api/propertyApi.js";
import {useNavigate} from "react-router-dom";
import {Progress} from "../../components/ui/multi-step.js";


const PropertyCreation = () => {

    const navigate = useNavigate();

    const [createProperty, {isLoading: isCreating}] = useCreatePropertyMutation();


    const [tab, setTab] = useState(1)

    const [unitMultiplicity, setUnitMultiplicity] = useState("single")

    const [imageUrlInput, setImageUrlInput] = useState("")


    const unitMultiplicityOptions = [
        {
            title: "Single-Unit",
            description: "Select this option if you want to rent out the entire property to a single tenant",
            icon: <Home className="w-6 h-6" />,
            value: "single"
        },
        {
            title: "Multi-Unit",
            description: "Select this option if the property has multiple units and you want to rent them out individually",
            icon: <BuildingIcon className="w-6 h-6" />,
            value: "multiple"
        }
    ]



    const propertyForm = useForm(({
        resolver: zodResolver(propertySchema),
        defaultValues: {
            title: "",
            description: "",
            lotSize: "",
            yearBuilt: "",
            realEstateType: "",
            marketPrice: "",
            street: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            images: [],
            units: [
                {
                    unitNumber: "",
                    floor: "",
                    unitSize: "",
                    numOfFloors: "",
                    numOfRooms: "",
                    numOfBedrooms: "",
                    numOfBathrooms: "",
                    garages: "",
                    status: "ACTIVE",
                    rentalPrice: "",
                    images: []
                }
            ]
        },
    }))

    const [tabStates, setTabStates] = useState([
        {
            title: "Property Information",
            //description: "Provide basic information about the property",
            //icon: <Building2 className="w-6 h-6" />,
            status: "incomplete"
        },
        {
            title: "Unit Information",
            //description: "Enter details about the units in the property",
            //icon: <BuildingIcon className="w-6 h-6" />,
            status: "incomplete"
        },
        {
            title: "Confirmation",
            //description: "Review and confirm details",
            //icon: <CheckCircle2 className="w-6 h-6" />,
            status: "incomplete"
        }
    ])

    useEffect(() => {
        if (propertyForm.formState.isValid){
            setTabStates(tabStates.map((tab, index) => {
                if (index === 0 || index === 1){
                    return {...tab, status: "complete"}
                }
                return tab
            }))
        }
        else {
            setTabStates(tabStates.map((tab, index) => {
                if (index === 0 || index === 1){
                    return {...tab, status: "incomplete"}
                }
                return tab
            }))
        }
    }, [propertyForm.formState.isValid])


    const onSubmit = (data) => {
        const mappedUnits = data.units.map(unit => {
            const {images, ...rest} = unit;
            return rest;
        })

        if (unitMultiplicity === "single"){
            mappedUnits.length = 1;
        }

        const body = {
            ...data,
            images: data.images.map(image => ({imageUrl: image})),
            units: mappedUnits
        }

        createProperty(body).then((res) => {
            if (res.error){
                console.log(res.error)
                return;
            }
            else {
                navigate("/properties")
            }
        })
    }

    const StepTab = ({title, status, index}) => {
        const isDisabled = index !== 1 && tabStates[index - 2].status !== "complete"

        return (
            <div
                data-disabled={isDisabled}
                data-selected={tab === index}
                className="p-4 border-b-2 border-border select-none flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-start w-full hover:border-primary cursor-pointer data-[selected='true']:border-primary data-[disabled='true']:opacity-50 data-[disabled='true']:cursor-not-allowed data-[disabled='true']:hover:border-secondary"
                onClick={() => !isDisabled && setTab(index)}
            >
                <div
                    data-complete={status==="complete"}
                    data-selected={tab === index}
                    data-previous={tab > index}
                    className="p-2 md:p-4 flex w-8 h-8 md:w-14 md:h-14 items-center justify-center text-md md:text-xl border border-border text-gray-400 rounded-lg data-[previous='true']:bg-secondary data-[selected='true']:bg-primary data-[selected='true']:text-white">
                    {index}
                </div>

                <div
                    data-selected={tab === index}
                    className="text-foreground font-500 text-xs md:text-sm text-center data-[selected='true']:text-primary">
                    {title}
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-2 relative mb-16">
            <h1>
                Create Property
            </h1>

            <div className="flex flex-row justify-between overflow-auto mb-4">
                {tabStates.map((tab, index) => {
                    return (
                        <StepTab title={tab.title} status={tab.status} index={index + 1} key={index}/>
                    )
                })}
            </div>





            <div
                data-selected={tab === 1}
                className=" data-[selected='false']:hidden">
                <Form {...propertyForm}>
                    <form onSubmit={propertyForm.handleSubmit(onSubmit)} className="flex flex-col flex-wrap gap-4">

                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <ListIcon/>
                                Unit Type
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col sm:flex-row gap-4">

                                {unitMultiplicityOptions.map((option, index) => {
                                    return (
                                        <div
                                            key={index}
                                            data-active={option.value === unitMultiplicity}
                                            className="rounded-lg flex-shrink relative border-border border-2 shadow-md p-4 flex bg-secondary/20 items-center justify-center cursor-pointer data-[active=true]:bg-gradient-to-br from-primary-accent to-background-light data-[active=true]:text-primary data-[active=true]:border-primary"
                                            onClick={() => setUnitMultiplicity(option.value)}
                                        >
                                            <div className="text-xl font-600 flex flex-col gap-3">
                                                <div className="p-2 bg-background-light border border-border rounded-lg w-fit shadow-sm">
                                                    {option.icon}
                                                </div>

                                                {option.title}
                                                <p
                                                    data-active={option.value === unitMultiplicity}
                                                    className="text-xs md:text-sm lg:text-md font-400 data-[active='true']:text-indigo-500"
                                                >
                                                    {option.description}
                                                </p>

                                                <div className="absolute -top-3 border-2 border-white -right-3 p-1 bg-indigo-500 rounded-full"
                                                     hidden={unitMultiplicity !== option.value}>
                                                    <Check className="text-white w-4 h-4"/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}


                            </CardContent>
                        </Card>


                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <Info/>
                                Property Information
                            </CardHeader>
                            <CardContent>

                                <FormGroup useFlex>
                                    <FormField
                                        control={propertyForm.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem  >
                                                <FormLabel>Title *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Lakeview Mansion" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={propertyForm.control}
                                        name="realEstateType"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Real Estate Type *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {
                                                            Object.keys(RealEstateType).map((type, index) => {
                                                                return (
                                                                    <SelectItem key={index} value={type}>{RealEstateType[type]}</SelectItem>
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
                                        control={propertyForm.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description *</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="A beautiful mansion next to a lake." {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                </FormGroup>


                                <FormGroup useFlex>
                                    <FormField
                                        control={propertyForm.control}
                                        name="lotSize"
                                        render={({field}) => (
                                            <FormItem >
                                                <FormLabel>Land Size (in m<sup>2</sup>)</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="200" type="number" {...field} />
                                                </FormControl>
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
                                                    <Input placeholder="200000" type="currency" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={propertyForm.control}
                                        name="yearBuilt"
                                        render={({field}) => (
                                            <FormItem >
                                                <FormLabel>Year Built</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="2004" type="number" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />

                                </FormGroup>


                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <MapPin/>
                                Location
                            </CardHeader>
                            <CardContent>
                                <FormGroup useFlex>
                                    <FormField
                                        control={propertyForm.control}
                                        name="street"
                                        render={({field}) => (
                                            <FormItem >
                                                <FormLabel>Street Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Washington Street" {...field} />
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
                                                <FormLabel>ZIP</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="49203" {...field} />
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
                                                <FormLabel>City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Seattle" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                </FormGroup>

                                <FormGroup useFlex>
                                    <FormField
                                        control={propertyForm.control}
                                        name="state"
                                        render={({field}) => (
                                            <FormItem >
                                                <FormLabel>State</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Washington" {...field} />
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
                                                <FormLabel>Country</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="USA" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />


                                </FormGroup>




                            </CardContent>
                        </Card>


                        <Card >
                            <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                <Image/>
                                Property Images
                            </CardHeader>
                            <CardContent className="flex flex-col gap-4">
                                <FormItem >
                                    <FormLabel>Image URL</FormLabel>
                                    <div className="flex flex-row gap-2">
                                        <Input placeholder="Enter an image URL here" className="max-w-96" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}/>
                                        <Button type="button" onClick={() => {
                                            propertyForm.setValue("images", [...propertyForm.getValues("images"), imageUrlInput])
                                            setImageUrlInput("")
                                        }}
                                                disabled={!imageUrlInput}
                                                variant="outline"
                                        >
                                            Add Image
                                        </Button>
                                    </div>
                                </FormItem>



                                <Carousel className="w-full max-w-xs" hidden={!propertyForm.getValues("images").length}>
                                    <div className="flex flex-row justify-between">
                                        <CarouselPrevious className="relative translate-x-0 translate-y-0 top-0 left-0" />
                                        <CarouselNext className="relative translate-x-0 translate-y-0 top-0 left-0" />
                                    </div>
                                    <CarouselContent>
                                        {propertyForm.getValues("images").map((image, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <img src={image} alt={`Property Image ${index}`} className="w-full h-64 object-cover rounded-lg"/>
                                                </div>

                                                <Button className="w-full" type="button" variant="outline" onClick={() => {
                                                    propertyForm.setValue("images", propertyForm.getValues("images").filter((_, i) => i !== index))
                                                    propertyForm.trigger("images")
                                                }}
                                                >
                                                    <XIcon className="w-4 h-4 mr-2"/>
                                                    Delete
                                                </Button>
                                            </CarouselItem>
                                        ))}
                                    </CarouselContent>
                                </Carousel>
                            </CardContent>
                        </Card>
                    </form>
                </Form>

            </div>


            <div
                data-selected={tab === 2}
                className=" data-[selected='false']:hidden">


                <Form {...propertyForm}>
                    <form onSubmit={propertyForm.handleSubmit(onSubmit)} className="flex flex-col flex-wrap gap-4 overflow-auto">

                        {
                            unitMultiplicity === "single" ? (
                                <div className="flex flex-col gap-4">
                                    <Card>
                                        <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                            <Info/>
                                            Unit Information
                                        </CardHeader>
                                        <CardContent>
                                            <FormGroup useFlex>
                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].unitNumber"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Unit Number</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].floor"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Floor</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="0" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />


                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].unitSize"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Unit Size </FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="100" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />



                                            </FormGroup>

                                            <FormGroup useFlex>
                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].rentalPrice"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Rental Price</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="2500" type="currency" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].status"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Status</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger>
                                                                        <SelectValue placeholder="Select..." />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent>
                                                                    {
                                                                        Object.keys(ListingStatus).map((type, index) => {
                                                                            return (
                                                                                <SelectItem key={index} value={type}>{ListingStatus[type]}</SelectItem>
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

                                        </CardContent>

                                    </Card>

                                    <Card>
                                        <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                            <DoorClosed/>
                                            Rooms and Garages
                                        </CardHeader>
                                        <CardContent>
                                            <FormGroup useFlex>
                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].numOfFloors"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Number of Floors</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="1" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].numOfRooms"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Number of Rooms</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="6" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />


                                            </FormGroup>

                                            <FormGroup useFlex>
                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].numOfBedrooms"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Number of Bedrooms</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="2" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].numOfBathrooms"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Number of Bathrooms</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="2" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={propertyForm.control}
                                                    name="units[0].garages"
                                                    render={({field}) => (
                                                        <FormItem >
                                                            <FormLabel>Number of Garages</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="2" type="number" {...field} />
                                                            </FormControl>
                                                            <FormMessage/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </FormGroup>

                                        </CardContent>

                                    </Card>

                                    <Card >
                                        <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                                            <Image/>
                                            Unit Images
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-4">
                                            <FormItem >
                                                <FormLabel>Image URL</FormLabel>
                                                <div className="flex flex-row gap-2">
                                                    <Input placeholder="Enter an image URL here" className="max-w-96" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}/>
                                                    <Button type="button" onClick={() => {
                                                        propertyForm.setValue("units[0].images", [...propertyForm.getValues("units[0].images"), imageUrlInput])
                                                        setImageUrlInput("")
                                                    }}
                                                            disabled={!imageUrlInput}
                                                            variant="outline"
                                                    >
                                                        Add Image
                                                    </Button>
                                                </div>
                                            </FormItem>



                                            <Carousel className="w-full max-w-xs" hidden={!propertyForm.getValues("units[0].images")?.length}>
                                                <div className="flex flex-row justify-between">
                                                    <CarouselPrevious className="relative translate-x-0 translate-y-0 top-0 left-0" />
                                                    <CarouselNext className="relative translate-x-0 translate-y-0 top-0 left-0" />
                                                </div>
                                                <CarouselContent>
                                                    {propertyForm.getValues("units[0].images").map((image, index) => (
                                                        <CarouselItem key={index}>
                                                            <div className="p-1">
                                                                <img src={image} alt={`Property Image ${index}`} className="w-full h-64 object-cover rounded-lg"/>
                                                            </div>

                                                            <Button className="w-full" type="button" variant="outline" onClick={() => {
                                                                propertyForm.setValue("units[0].images", propertyForm.getValues("units[0].images").filter((_, i) => i !== index))
                                                                propertyForm.trigger("units[0].images")
                                                            }}
                                                            >
                                                                <XIcon className="w-4 h-4 mr-2"/>
                                                                Delete
                                                            </Button>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                            </Carousel>


                                        </CardContent>
                                    </Card>

                                </div>

                            ) : (
                                <UnitCreationTable units={propertyForm.getValues("units")} onChange={(units) => {
                                    propertyForm.setValue("units", units);
                                    propertyForm.trigger("units")
                                }}/>



                                )
                        }

                    </form>
                </Form>
            </div>


            <div
                data-selected={tab === 3}
                className=" data-[selected='false']:hidden">

                <Card>
                    <CardHeader className="border-b-2 text-lg font-500 border-border p-4 flex flex-row items-center gap-2">
                        <BadgeCheck/>
                        Confirmation
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">
                        You are about to create a property with the following details. Please review and confirm.

                        <div className="grid grid-cols-2">
                            <div className="">
                                <p className="font-500 text-muted-foreground">
                                    Title
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {propertyForm.getValues("title")}
                                </p>
                            </div>

                            <div className="">
                                <p className="font-500 text-muted-foreground">
                                    Type
                                </p>
                                <p className="flex flex-row items-center font-500 text-foreground text-lg">
                                    {getRealEstateIcon(propertyForm.getValues("realEstateType"))} {RealEstateType[propertyForm.getValues("realEstateType")]}
                                </p>
                            </div>
                        </div>


                        <div className="grid grid-cols-2">
                            <div className="">
                                <p className="font-500 text-muted-foreground">
                                    Description
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {propertyForm.getValues("description")}
                                </p>
                            </div>


                            <div className="">
                                <p className="font-500 text-gray-400">
                                    Number of Units
                                </p>
                                <p className="font-500 text-foreground text-lg">
                                    {unitMultiplicity === "single" ? 1 : propertyForm.getValues("units").length}
                                </p>
                            </div>
                        </div>



                    </CardContent>
                </Card>


            </div>


            <div className="fixed bottom-0 left-0 z-20 w-full flex flex-row bg-background-light px-6 h-16 items-center border-y-2 border-border justify-between">
                <Button
                    variant="outline"
                    disabled={tab === 1}
                    onClick={() => {
                        if (tab > 1){
                            setTab(tab - 1)
                        }
                    }}
                    type="button"

                >
                    <ArrowLeft className="w-4 h-4 mr-1"/>
                    Back
                </Button>
                <Button
                    type={tab === 3 ? "submit" : "button"}
                    variant="outline"
                    isLoading={isCreating}
                    onClick={() => {
                    propertyForm.trigger();
                    if (tab === 2 && propertyForm.formState.isValid){
                        // set tab 2 to complete
                        setTabStates(tabStates.map((tab, index) => {
                            if (index === 1){
                                return {...tab, status: "complete"}
                            }
                            return tab
                        }))
                        setTab(3)
                        return;
                    }

                    if (tab === 3){
                        propertyForm.handleSubmit(onSubmit)()
                    } else if (tabStates[tab - 1].status === "complete"){
                        setTab(tab + 1)
                    }
                }}
                >
                    {tab === 3 ? "Create" : "Next"}
                    {tab === 3 ? <Plus className="w-4 h-4 ml-1"/> : <ArrowRight className="w-4 h-4 ml-1"/>}
                </Button>

            </div>

        </div>
    )
}

export default PropertyCreation