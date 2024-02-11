import PropertyCard from "../../components/properties/PropertyCard.js";
import {CardContent, CardFooter} from "../../components/ui/card.tsx";
import CreateProperty from "../../components/properties/PropertyCreation/CreateProperty.js";
import PropertyStatus from "../../components/properties/PropertyStatus.js";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Button} from "../../components/ui/button.tsx";
import {PlusIcon} from "lucide-react";
import RentalTable from "../../components/rentals/RentalTable.tsx";
import {selectTenantByLeaseId, selectUnitsByPropertyId} from "../../services/slices/objectSlice.js";


const Rentals = (props) => {
    const {data} = props;
    const navigate = useNavigate()


    const selectedPropertyId = useSelector((state) => state.userSlice.selectedProperty)

    const units = useSelector((state) => selectUnitsByPropertyId(state, selectedPropertyId));

    console.log(units)

    if (!units || units.length === 0)  return (
        <div className="flex flex-col gap-4">
            You don't have any rental properties yet. You can create one by adding a new property using the button below.
            <CreateProperty trigger={<Button variant="gradient" className="w-fit"><PlusIcon className="w-4 h-4 mr-4"/> Create Property</Button>} />
        </div>
    )

    return (
        <>
            <h1>
                Rental Units
            </h1>


            <div className="text-md mb-3">
                These are your rental properties, so the units of each property are displayed here. You can filter the units by property using the dropdown above.

            </div>

                <RentalTable units={units} />
        </>

    )
}

export default Rentals;