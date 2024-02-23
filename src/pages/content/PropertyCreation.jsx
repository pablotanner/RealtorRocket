import {useState} from "react";
import {
    BuildingIcon,
    Check,
    CrossIcon,
    Home,
    Image,
    Info,
    ListIcon,
    MapPin,
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
import {PaymentStatus} from "../../utils/magicNumbers.js";
import {RealEstateType} from "../../utils/magicNumbers.js";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../../components/ui/carousel.tsx";
import {Button} from "../../components/ui/button.tsx";


const PropertyCreation = () => {

    const [tab, setTab] = useState(1)

    const [unitMultiplicity, setUnitMultiplicity] = useState("single")

    const [images, setImages] = useState([])

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

    const tabList = [
        {
            title: "Property Information",
            status: "incomplete"
        },
        {
            title: "Unit Type",
            status: "incomplete"
        },
        {
            title: "Unit Information",
            status: "incomplete"
        },
        {
            title: "Review",
            status: "incomplete"
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
            images: "",
        }
    }))

    const onSubmit = (data) => {
        console.log(data)
    }


    const StepTab = ({title, status, index}) => {
        return (
            <div
                data-selected={tab === index}
                className="p-4 border-b-2 border-secondary select-none flex flex-col lg:flex-row gap-4 items-center justify-center lg:justify-start w-full hover:border-off-black cursor-pointer data-[selected='true']:border-off-black"
                onClick={() => setTab(index)}
            >
                <div
                    data-complete={status==="complete"}
                    data-selected={tab === index}
                    className="p-2 md:p-4 flex w-8 h-8 md:w-14 md:h-14 items-center justify-center text-md md:text-xl border border-secondary text-gray-400 rounded-lg data-[complete='true']:bg-secondary data-[selected='true']:bg-black data-[selected='true']:text-white">
                    {status === "complete" ? <Check /> : index}
                </div>

                <div className="text-off-black font-500 text-xs md:text-sm text-center">
                    {title}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2">
            <h1>
                Create Property
            </h1>

            <div className="flex flex-row justify-between overflow-auto mb-4">
                {tabList.map((tab, index) => {
                    return (
                        <StepTab title={tab.title} status={tab.status} index={index + 1} key={index}/>
                    )
                })}
            </div>

            <div
                data-selected={tab === 1}
                className="data-[selected='false']:hidden">
                <Form {...propertyForm}>
                    <form onSubmit={propertyForm.handleSubmit(onSubmit)} className="flex flex-col flex-wrap gap-4">

                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-secondary p-4 flex flex-row items-center gap-2">
                                <ListIcon/>
                                Unit Type
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col sm:flex-row gap-4">

                                {unitMultiplicityOptions.map((option, index) => {
                                    return (
                                        <div
                                            key={index}
                                            data-active={option.value === unitMultiplicity}
                                            className="rounded-lg flex-shrink relative border-secondary border-2 shadow-md p-4 flex bg-secondary/20 items-center justify-center cursor-pointer data-[active=true]:bg-gradient-to-br from-indigo-50 to-white data-[active=true]:text-indigo-600 data-[active=true]:border-primary-dark"
                                            onClick={() => setUnitMultiplicity(option.value)}
                                        >
                                            <div className="text-xl font-600 flex flex-col gap-3">
                                                <div className="p-2 bg-white border border-secondary rounded-lg w-fit shadow-sm">
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
                            <CardHeader className="border-b-2 text-lg font-500 border-secondary p-4 flex flex-row items-center gap-2">
                                <Info/>
                                Property Information
                            </CardHeader>
                            <CardContent>

                                <FormGroup useFlex>
                                    <FormField
                                        control={propertyForm.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem >
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
                                                    <Input placeholder="200000" type="number" {...field} />
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
                            <CardHeader className="border-b-2 text-lg font-500 border-secondary p-4 flex flex-row items-center gap-2">
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


                        <Card>
                            <CardHeader className="border-b-2 text-lg font-500 border-secondary p-4 flex flex-row items-center gap-2">
                                <Image/>
                                Images
                            </CardHeader>
                            <CardContent>

                                <div>
                                    <div>
                                        <FormItem >
                                            <FormLabel>Image URL</FormLabel>
                                            <div className="flex flex-row gap-2">
                                                <Input placeholder="Enter an image URL here" className="max-w-96" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)}/>
                                                <Button type="button" onClick={() => {
                                                    setImages([...images, imageUrlInput])
                                                    setImageUrlInput("")
                                                }}
                                                        disabled={!imageUrlInput}
                                                        variant="outline"
                                                >
                                                    Add Image
                                                </Button>
                                            </div>
                                        </FormItem>
                                    </div>
                                </div>

                                <div className="py-4 px-9" hidden={!images.length}>
                                    <Carousel className="w-full max-w-xs">
                                        <CarouselContent>
                                            {images.map((image, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="p-1">
                                                        <img src={image} alt={`Property Image ${index}`} className="w-full h-64 object-cover rounded-lg"/>
                                                    </div>
                                                    <Button className="w-full" type="button" variant="outline" onClick={() => {
                                                        setImages(images.filter((_, i) => i !== index))
                                                    }}
                                                    >
                                                        <XIcon className="w-4 h-4 mr-2"/>
                                                        Delete
                                                    </Button>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                </div>

                            </CardContent>
                        </Card>


                    </form>

                </Form>
                <div>

                </div>





            </div>




        </div>
    )
}

export default PropertyCreation