import PropertyCard from "../../components/properties/PropertyCard.js";
import {CardContent, CardFooter} from "../../components/ui/card.tsx";
import CreateProperty from "../../components/properties/PropertyCreation/CreateProperty.js";
import PropertyStatus from "../../components/properties/PropertyStatus.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import RentalTable from "../../components/rentals/RentalTable.tsx";


const Rentals = (props) => {
    const {data} = props;
    const navigate = useNavigate()

    const selectedPropertyId = useSelector((state) => state.userSlice.selectedProperty)


    let units = data?.data || [];

    if (selectedPropertyId !== "All") units = data?.data?.filter((unit) => unit.realEstateObjectId === selectedPropertyId)


    if (!units || units.length === 0)  return (
        <div className="flex flex-col gap-4">
            You don't have any rental properties yet. You can create one by adding a new property using the button below.
            <CreateProperty trigger={<Button variant="gradient" className="w-fit"><PlusIcon className="w-4 h-4 mr-4"/> Create Property</Button>} />
        </div>
    )

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
            <div className="flex gap-4 flex-wrap">
                <RentalTable units={units} />


            </div>
        </>

    )
}

export default Rentals;