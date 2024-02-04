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


    let units = data?.data || [];

    if (selectedPropertyId !== "All") units = data?.data?.filter((unit) => unit.realEstateObjectId === selectedPropertyId)


console.log(units)

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
                    <div key={index} className="w-[200px] h-[200px] rounded-3xl shadow-xl p-4 hover:bg-gray-50 cursor-pointer" onClick={() => navigate("/rentals/" + unit?.id)}>
                        <div className="flex flex-col gap-2">
                            <div className="font-600">
                                Property: {unit.realEstateObject?.title}
                            </div>
                            <div>
                                Unit ID: {unit.id}
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