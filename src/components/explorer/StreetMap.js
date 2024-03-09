import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import Building from "./Building.js";
const StreetMap = ({selected, onSelect}) => {

    const {data: properties, isLoading}  = useGetPropertiesQuery()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className="bg-background-light flex overflow-auto basis-[70%] flex-grow" >

            <div className="flex flex-row w-full gap-12 justify-start items-end">
                {properties.data.map((property, index) => (
                    <Building property={property} key={index} selectedUnit={selected} onSelectUnit={onSelect} />))}
            </div>


        </div>
    )
}

export default StreetMap;