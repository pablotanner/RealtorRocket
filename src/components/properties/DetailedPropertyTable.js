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


const DetailedPropertyTable = ({ properties }) => {
    const navigate = useNavigate()




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
                        <p className="text-gray-500">
                            Occupancy
                        </p>
                        <p className="text-gray-800">
                            {percentOccupied}%
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-500">
                            Occupied
                        </p>
                        <p className="text-gray-800">
                            {occupiedUnits}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-500">
                            Vacant
                        </p>
                        <p className="text-gray-800">
                            {vacantUnits}
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const OptionsMenu = ({property}) => {
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <MoreHorizontal className="h-6 w-6"/>
                </DropdownMenuTrigger>
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
                                                <span>Unit {unit?.id}</span>
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
                        <DropdownMenuItem className="flex flex-row text-md gap-2 text-red-500" disabled>
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
            <div style={{gridTemplateColumns: "minmax(250px, 1fr) 1fr 1fr 1fr 50px" }} className="bg-white rounded-2xl border-gray-100 border-2 p-4 w-full grid grid-cols-5 gap-8 overflow-auto font-500 text-gray-800 h-fit">
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

    const PropertyRow = ({ property, key }) => {
        return (
            <div key={key} style={{gridTemplateColumns: "minmax(250px, 1fr) 1fr 1fr 1fr 50px" }} className="bg-white rounded-2xl border-gray-100 border-2 p-4 w-full grid grid-cols-5 gap-8 overflow-auto max-h-fit">
                <div className="flex flex-row gap-4 w-full items-center">
                    <img src={property?.images[0].imageUrl} className="w-20 h-20 object-cover rounded-sm hover:opacity-75 cursor-pointer"
                         onClick={() => navigate(`/properties/${property?.id}`)} alt="Property Image"
                    />
                    <div className="flex flex-col justify-start overflow-hidden">
                        <h className="font-500 text-off-black text-xl overflow-ellipsis">
                            {property?.title}
                        </h>
                        <p className="text-gray-500 truncate">
                            {property.realEstateType}
                        </p>
                    </div>
                </div>


                <div className="flex flex-row items-center">
                    {getLocation(property)}
                </div>

                <div className="flex flex-row gap-2 flex-wrap h-[100%]  items-center">
                    {property.units.map((unit, index) => {
                        let unitLabel = `Unit ${unit?.id}`
                        if (property?.units?.length === 1) {
                            unitLabel = "Single Unit"
                        }
                        return (
                            <div key={index} className="flex flex-col gap-2 bg-indigo-100 whitespace-nowrap font-400 text-white h-fit p-1 rounded-md hover:bg-indigo-200 cursor-pointer">
                                <p className="text-gray-800">
                                    {unitLabel}
                                </p>
                            </div>
                        )
                    })}
                </div>


                {getOccupancy(property)}

                <div className="self-start sticky flex items-center h-full ">
                    <OptionsMenu property={property}/>
                </div>

            </div>
        )
    }


    if (properties.length === 0) {
        return (
            <div className="flex flex-col gap-1 ">
                <Header/>
                <p className="text-gray-800 font-500 w-full p-2 ">
                    No properties found.
                </p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 ">
            <Header/>
            {properties?.map((property, index) => {
                return <PropertyRow key={index} property={property} />
            })}
        </div>
    )


}

export default DetailedPropertyTable;