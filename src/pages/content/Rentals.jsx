import PropertyCard from "../../components/properties/PropertyCard.js";
import {CardContent, CardFooter} from "../../components/ui/card.tsx";
import CreateProperty from "../../components/properties/propertyCreation/CreateProperty.js";
import PropertyStatus from "../../components/properties/PropertyStatus.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";


const Rentals = (props) => {
    const {data} = props;

    const navigate = useNavigate()

    const selectedPropertyId = useSelector((state) => state.userSlice.selectedProperty)

    let properties = data?.data || [];

    if (selectedPropertyId !== "All") properties = data?.data?.filter((property) => property.id === selectedPropertyId)

    const units = []

    properties.forEach((property) => {
        const temp = property.units.map((unit) => {
            return {...unit, property: property}
        })
        units.push(...temp)
    })



    return (
        <>
            These are your rental properties, so the units of each property are displayed here. You can filter the units by property using the dropdown above.
            <br />

            {
                selectedPropertyId !== "All" && (
                    <div className="text-primary-dark">
                        Only showing rental units for property with ID: {selectedPropertyId}
                    </div>
                )
            }
            <div className="flex gap-4 max-w-full flex-wrap">
                {units.map((unit, index) => (
                    <div key={index} className="w-[200px] h-[200px] shadow-xl p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate("/properties/" + unit?.property?.id)}>
                        <div className="flex flex-col">
                            <div className="font-600">
                                Property: {unit.property?.title}
                            </div>
                            <div>
                                Unit ID: {unit.id}
                            </div>
                            <div>
                                Rooms: {unit.numOfRooms || 'N/A'}
                            </div>
                            <div>
                                Bathrooms: {unit.numOfBathrooms || 'N/A'}
                            </div>
                            <div>
                                Bedrooms: {unit.numOfBedrooms || 'N/A'}
                            </div>

                            <PropertyStatus status={unit.status} className="w-fit" />
                        </div>
                    </div>
                    ))}

            </div>
        </>

    )
}

export default Rentals;