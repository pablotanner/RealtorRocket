import {Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import {useDispatch, useSelector} from "react-redux";
import {selectProperty} from "../../services/store/userSlice.js";

const PropertySelection = () => {
    const {data, isLoading, isSuccess} = useGetPropertiesQuery();

    const dispatch = useDispatch();


    if (isLoading || !isSuccess) {
        return (
            <Select>
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
        <Select onValueChange={(value) => dispatch(selectProperty(value))}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Property"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel className="font-600">Your Properties</SelectLabel>
                    <SelectItem value="All" defaultChecked={true}>
                        All Properties
                    </SelectItem>
                    {properties.map(property => {
                        return (
                            <SelectItem
                                value={property.value}
                                key={property.value}>
                                {property.label} {property.status}
                            </SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default PropertySelection;