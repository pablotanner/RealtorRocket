import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {selectProperty} from "../../services/slices/userSlice.js";
import {getRealEstateIcon, RealEstateType} from "../../utils/magicNumbers.js";
import {selectPropertyById} from "../../services/slices/objectSlice.js";
import {DeleteIcon, Eye, MoreVertical} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "../ui/dropdown-menu.tsx";

const PropertySelection = () => {
    const {data, isLoading, isSuccess} = useGetPropertiesQuery();

    const dispatch = useDispatch();

    const selection = useSelector(state => state.userSlice.selectedProperty);

    // Will be null if no property (all) is selected
    const property = useSelector(state => selectPropertyById(state, selection));

    if (isLoading || !isSuccess) {
        return (
            <Select defaultValue={"All"}>
                <SelectTrigger className="w-[180px]" disabled>
                    <SelectValue placeholder="Loading..."/>
                </SelectTrigger>
            </Select>
        )
    }

    const properties = data.data.map(property => {
        return {
            value: property.id,
            label: property.title,
            type: property.realEstateType
        }
    })


    return (
        <div className="flex flex-row items-center gap-2">

        <Select onValueChange={(value) => dispatch(selectProperty(value))} value={selection}>
            <SelectTrigger>
                <SelectValue/>
            </SelectTrigger>

            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="font-600">Your Properties</SelectLabel>
                    <SelectItem value="all" defaultChecked={true}>
                        All Properties
                    </SelectItem>
                    {properties?.map(property => {
                        return (
                            <SelectItem
                                value={property.value}
                                key={property.value}
                            >
                                <div className="flex flex-row">
                                    {getRealEstateIcon(property.type)}
                                    {property.label}
                                </div>
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>

        <DropdownMenu>
            <DropdownMenuTrigger hidden={!property}>
                <MoreVertical className="w-5 h-5 cursor-pointer"/>
            </DropdownMenuTrigger>
            <DropdownMenuContent hidden={!property}>
                
                <DropdownMenuItem>
                    <Eye className="w-5 h-5 mr-1"/>
                    View
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => dispatch(selectProperty("all"))}
                >
                    <DeleteIcon className="w-5 h-5 mr-1"/>
                    Remove Filter
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>

        </div>

    )
}

export default PropertySelection;