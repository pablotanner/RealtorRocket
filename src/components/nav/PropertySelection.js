import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {selectProperty} from "../../services/slices/userSlice.js";
import {getRealEstateIcon, RealEstateType} from "../../utils/magicNumbers.js";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "../ui/hover-card.tsx";
import {selectPropertyById} from "../../services/slices/objectSlice.js";

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
        <Select onValueChange={(value) => dispatch(selectProperty(value))} value={selection}>
            <HoverCard>
                <HoverCardTrigger>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>
                </HoverCardTrigger>
                {
                    property ? (
                        <HoverCardContent className="flex flex-row gap-4 justify-start whitespace-nowrap w-fit">
                            <div className="flex flex-col gap-2 text-sm items-start whitespace-break-spaces">
                                <img
                                    src={property?.images[0]?.imageUrl}
                                    className="w-12 h-12 min-w-12 min-h-12 rounded-full object-cover"
                                />
                                Units: {property?.units.length}
                            </div>
                            <div className="font-500 text-sm text-off-black">
                                Added on {new Date(property?.createdAt).toLocaleDateString()} <br/>
                                {RealEstateType[property?.realEstateType]}
                                <p className="text-gray-500 text-xs font-400 whitespace-break-spaces">
                                    {property?.description}
                                </p>
                            </div>
                        </HoverCardContent>
                    ) : null
                }

            </HoverCard>


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
    )
}

export default PropertySelection;