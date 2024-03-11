import {Boxes, Building2, LinkIcon, MoreHorizontal, Pencil, Plus, Trash2} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {useNavigate} from "react-router-dom";
import {RealEstateType} from "../../utils/magicNumbers.js";
import {useDeletePropertyMutation} from "../../services/api/propertyApi.js";

import {Image} from "../ui/image.tsx"
import {cn} from "../../utils.ts";
import {useState} from "react";
import DeleteDialog from "../general/DeleteDialog.js";

const DetailedPropertyTable = ({ properties }) => {
    const navigate = useNavigate()

    const [deleteProperty, {isLoading: isDeletingProperty}] = useDeletePropertyMutation()


    const getLocation = (property) => {
        if (property?.city && property?.country) {
            return `${property?.city}, ${property?.country}`
        }
        else if (property?.city) {
            return property?.city
        }
        else if (property?.country) {
            return property?.country
        }
        else {
            return "No Location"
        }
    }

    const occupiedStatus = ["ACTIVE", "RENTED", "SOLD", "RESERVED"]





    const getOccupancy = (property) => {
        let totalUnits = property?.units?.length
        let occupiedUnits = property?.units?.filter(unit => occupiedStatus.includes(unit?.status) )?.length
        let vacantUnits = property?.units?.filter(unit =>  !occupiedStatus.includes(unit?.status))?.length
        let percentOccupied = (occupiedUnits / totalUnits) * 100
        return (
            <div className="flex flex-row gap-2 items-center">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-foreground">
                            Occupancy
                        </p>
                        <p className="text-muted-foreground">
                            {percentOccupied}%
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-foreground">
                            Occupied
                        </p>
                        <p className="text-muted-foreground">
                            {occupiedUnits}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-foreground">
                            Vacant
                        </p>
                        <p className="text-muted-foreground">
                            {vacantUnits}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const OptionsMenu = ({property}) => {
        const [showConfirmation, setShowConfirmation] = useState(false)

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <MoreHorizontal className="h-6 w-6 text-foreground"/>
                </DropdownMenuTrigger>



                <DeleteDialog
                    open={showConfirmation}
                    setOpen={() => setShowConfirmation(!showConfirmation)}
                    onConfirm={() => deleteProperty(property?.id)} title={"Delete Property"}
                    content={"Are you sure that you want to delete the following property? " + property?.title}
                />


                <DropdownMenuContent className="w-[200px]">
                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex flex-row text-md gap-2" onClick={() => navigate(`/properties/${property?.id}`)}>
                            <Building2 className="w-4 h-4 "/>
                            View Property
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex flex-row text-md gap-2" disabled>
                            <Pencil className="w-4 h-4"/>
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger className="text-md">
                                <Boxes className="mr-2 h-4 w-4" />
                                <span>View Rentals</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {property?.units.map((unit, index) => {
                                        return (
                                            <DropdownMenuItem key={index} className="flex flex-row text-md gap-2" onClick={() => navigate('/rentals/' + unit?.id )}>
                                                <LinkIcon className="w-4 h-4"/>
                                                <span>{unit?.unitIdentifier || ("Unit " + unit?.id)}</span>
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem className="flex flex-row text-md gap-2" disabled>
                            <Plus className="w-4 h-4"/>
                            Add Rental
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem className="flex flex-row text-md gap-2 text-red-500"
                                          //onClick={() => deleteProperty(property?.id)}
                                            onClick={() => setShowConfirmation(true)}
                        >
                            <Trash2 className="w-4 h-4"/>
                            Delete Property
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                </DropdownMenuContent>
            </DropdownMenu>
        )
    }


    const Header = () => {
        return (
            <div style={{gridTemplateColumns: "minmax(250px,400px) 1fr 1fr 1fr 50px" }} className="bg-background-light rounded-2xl border-gray-100 border-2 p-4 w-full grid grid-cols-5 gap-8 overflow-x-auto font-500 text-gray-800 h-fit">
                <div className="flex flex-row gap-4 w-full items-center">
                    Property
                </div>
                <div className="flex flex-row gap-4 w-full items-center">
                    Location
                </div>
                <div className="flex flex-row gap-4 w-full items-center">
                    Units
                </div>
                <div className="flex flex-row gap-4 w-full items-center">
                    Occupancy
                </div>
                <div className="flex flex-row gap-4 w-full items-center">
                    Options
                </div>
            </div>
        )
    }

    const PropertyRow = ({ property }) => {
        return (
            <div style={{gridTemplateColumns: "minmax(250px,30%) 1fr 1fr 1fr 50px" }} className="bg-background-light rounded-2xl border-border border-2 p-4 w-full grid grid-cols-5 gap-8 overflow-auto h-[150px] hover:bg-secondary min-h-fit">
                <div className="flex flex-row gap-4 w-full items-center">
                    <Image src={property?.images[0].imageUrl} className="w-20 h-20 object-cover rounded-sm hover:opacity-75 cursor-pointer"
                         onClick={() => navigate(`/properties/${property?.id}`)} alt="Property Image"
                    />
                    <div className="flex flex-col justify-start overflow-hidden">
                        <p className="font-500 text-foreground text-[2vh] md:text-md overflow-hidden">
                            {property?.title}
                        </p>
                        <p className="text-muted-foreground text-sm">
                            {RealEstateType[property.realEstateType]}
                        </p>
                    </div>
                </div>


                <div className="flex flex-row items-center text-muted-foreground text-sm overflow-hidden">
                    {getLocation(property)}
                </div>

                <div className="flex flex-row gap-2 flex-wrap items-center min-h-fit">
                        {property?.units?.map((unit, index) => {
                            let unitLabel = `${unit?.unitIdentifier}`
                            if (property?.units?.length === 1) {
                                unitLabel = "Single Unit"
                            }
                            if (index > 2) {
                                return null
                            }
                            return (
                                <div key={index} className={cn("flex flex-col gap-2 bg-primary/90 whitespace-nowrap font-400 h-fit p-1 rounded-md hover:opacity-90 cursor-pointer", index===2 ? "flex items-center justify-center bg-input" : "flex-row")}
                                     onClick={() => navigate('/rentals/' + unit?.id)}
                                >
                                    <p className={cn("text-center text-white", index === 2 && "text-muted-foreground")}>
                                        {index === 2 ? (property?.units?.length - index) + " more"  : unitLabel}
                                    </p>
                                </div>
                            )
                        })}
                </div>


                {getOccupancy(property)}

                <div className="self-start sticky flex items-center h-full">
                    <OptionsMenu property={property}/>



                </div>

            </div>
        )
    }


    if (properties?.length === 0) {
        return (
            <div className="flex flex-col gap-1 ">
                {/*<Header/>*/}
                <p className="text-muted-foreground font-400 w-full ">
                    No properties found.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 ">
            {/*<Header/>*/}
            {properties?.map((property, index) => {
                return <PropertyRow key={index} property={property} />
            })}

        </div>
    )


}

export default DetailedPropertyTable;