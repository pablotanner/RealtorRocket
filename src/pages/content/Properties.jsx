import {useCreatePropertyMutation} from "../../services/api/propertyApi.js";
import PropertyCard from "../../components/properties/PropertyCard.js";
import {CardContent, CardFooter} from "../../components/ui/card.tsx";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../../components/ui/alert-dialog.tsx";
import {Button} from "../../components/ui/button.tsx";
import {Input} from "../../components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../../components/ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../../components/ui/select.tsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const Properties = (props) => {
    const {data} = props;

    const navigate = useNavigate();

    const [createProperty, {data: createdProperty, isLoading: isCreating, isError: isCreateError, error: createError, isSuccess: isCreateSuccess}] = useCreatePropertyMutation();


    let propertyList = [
        {
            id: 1,
            title: "Property 1",
            description: "Property 1 Description",
            image: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg",
            price: 100000,
            currency: "USD",
            location: "Location 1",
            type: "House",
            bedrooms: 3,
            bathrooms: 2,
            area: 1500,
            yearBuilt: 2000,
            realtor: "Realtor 1",
        },
        {
            id: 2,
            title: "Property 2",
            description: "Property 2 Description",
            image: "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg",
            price: 200000,
            currency: "USD",
            location: "Location 2",
            type: "House",
            bedrooms: 4,
            bathrooms: 2,
            area: 2000,
            yearBuilt: 2005,
            realtor: "Realtor 2",
        },
        {
            id: 3,
            title: "Property 3",
            description: "Property 3 Description",
            image: "https://img.staticmb.com/mbcontent/images/crop/uploads/2023/11/most-unique-houses-in-the-world%20(1)_0_1200.jpg",
            price: 300000,
            currency: "USD",
            location: "Location 3",
            type: "House",
            bedrooms: 5,
            bathrooms: 3,
            area: 2500,
            yearBuilt: 2010,
            realtor: "Realtor 3",
        }
    ]


    const realEstateTypes = [
        "SINGLE_FAMILY_HOME",
        "MULTI_FAMILY_HOME",
        "CONDO",
        "APARTMENT",
        "TOWNHOUSE",
        "LUXURY",
        "OFFICE",
        "RETAIL",
        "INDUSTRIAL",
        "LAND",
        "FARM"
    ]

    const propertyFormSchema = z.object({
        title: z.string().min(1),
        description: z.string().min(1),
        price: z.string().min(1),
        numOfRooms: z.string().min(1),
        yearBuilt: z.string().min(1),
        realEstateType: z.string(),
        squareFeet: z.string().min(1)
    })
    const propertyForm = useForm({
        resolver: zodResolver(propertyFormSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            numOfRooms: "",
            yearBuilt: "",
            realEstateType: "",
            squareFeet: "",
        },

    })

    function onSubmit(values) {
        // Parse data
        values.price = parseInt(values.price)
        values.numOfRooms = parseInt(values.numOfRooms)
        values.yearBuilt = parseInt(values.yearBuilt)
        values.squareFeet = parseInt(values.squareFeet)

        createProperty(values);
    }

    useEffect(() => {
        if (isCreateSuccess) {
            toast.info('Property created successfully')
            navigate(`/properties/${createdProperty?.data?.id}`)
        }
        else if (isCreateError) {
            toast.error(createError?.data?.message)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCreating])

    return (
        <div className="flex gap-4 max-w-full flex-wrap">
            {data?.data.map((property) => (<PropertyCard key={property.id} property={property} />))}
            <PropertyCard>
                <CardContent className="p-2 pt-6 items-center justify-center flex">
                    <AlertDialog>
                        <AlertDialogTrigger>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/800px-Plus_symbol.svg.png"
                                alt="Add New"
                                className="border-2 border-gray-100 bg-white w-24 h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 object-cover rounded-full hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer"
                            />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <Form {...propertyForm}>
                                <form onSubmit={propertyForm.handleSubmit(onSubmit)} className="flex flex-col gap-y-3 w-[100%] ">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Add New Property</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Temporary way to add new property
                                </AlertDialogDescription>

                                        <FormField
                                            control={propertyForm.control}
                                            name="title"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Property Title" {...field} />
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
                                                    <FormLabel>Description</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Property Description" {...field} />
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
                                                    <FormLabel>Real Estate Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            {realEstateTypes.map((item, index) => (
                                                                <SelectItem key={index} value={item}>{item}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={propertyForm.control}
                                            name="price"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Price</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Property Price" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                            />
                                        <FormField
                                            control={propertyForm.control}
                                            name="numOfRooms"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Number of Rooms</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Number of Rooms" {...field} />
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
                                                        <Input placeholder="Year Built" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                            />
                                        <FormField
                                            control={propertyForm.control}
                                            name="squareFeet"
                                            render={({field}) => (
                                                <FormItem >
                                                    <FormLabel>Square Feet</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Square Feet" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                            />


                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    className="bg-red-600 hover:bg-red-400"
                                   // close modal
                                    >
                                    Add
                                </Button>
                            </AlertDialogFooter>
                        </form>
                    </Form>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardContent>
                <CardFooter className="flex flex-col p-4 justify-start items-center">
                    <h className="font-400 text-gray-600 text-md lg:text-lg">
                        Click to add new property
                    </h>
                </CardFooter>
            </PropertyCard>
        </div>
    )

}

export default Properties;
