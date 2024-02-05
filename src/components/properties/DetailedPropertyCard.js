import { Card,
    CardContent,
 } from "../ui/card.tsx";
import {moneyParser} from "../../utils/inputHandlers.js";
import {useNavigate} from "react-router-dom";
import {LinkIcon} from "lucide-react";
import {Button} from "../ui/button.tsx";

const DetailedPropertyCard = ({ property }) => {
    const navigate = useNavigate();

    const propertyUnits = () => {
        if (property?.units?.length > 1) {
            return "Multi-Unit";
        }
        else if (property?.units?.length === 1) {
            return "Single-Unit";
        }
        else {
            return "No Units";
        }
    }

    // Depending on what is available, display key data
    const displayedData = () => {
        let data = [];

        if (property?.yearBuilt) {
            data.push("Built in " + property.yearBuilt);
        }
        if (property?.lotSize) {
            data.push(property.lotSize + " Sq. m.");
        }
        if (property?.marketPrice) {
            data.push(moneyParser(property.marketPrice));
        }
        if (property?.units?.length > 1 ) {
            data.push(property.units.length + " Units");
        }

        return data.join(", ");
    }

    const getLocation = () => {
        let location = []

        if (property?.address) {
            location.push(property.address);
        }
        if (property?.city) {
            location.push(property.city);
        }
        if (property?.state) {
            location.push(property.state);
        }
        if (property?.country) {
            location.push(property.country);
        }

        return location.join(", ");
    }


    return (
        <Card className="max-w-[500px] shadow-xl rounded-xl h-fit flex-shrink">
            <CardContent className="px-0">
                <img
                    src={property.images[0]?.imageUrl}
                    alt={property.title || "?"}
                    className="h-64 w-[100%] object-cover rounded-xl"
                />

                <div className="px-4 pt-3 flex flex-col gap-2">
                    <div className="flex justify-between flex-row items-center gap-1 flex-wrap">
                        <div className="text-2xl text-off-black font-500">
                            {property.title}
                        </div>
                        <div className="text-gray-900 font-300 mt-1">
                            {property.realEstateType}
                        </div>
                    </div>

                    <div className="text-lg text-gray-600 font-400 flex flex-row items-center gap-2">
                        {propertyUnits()}
                        <span className="p-2 bg-primary-dark rounded-full hover:bg-primary/80 cursor-pointer"
                              onClick={() => navigate(`/properties/${property.id}`)}
                        >
                            <LinkIcon className="w-4 h-4 text-white"/>
                        </span>

                    </div>

                    <div className="text-md text-gray-400 font-400">
                        {displayedData()} <br/>
                        {getLocation()}
                    </div>


                </div>

            </CardContent>

        </Card>
    )
}

export default DetailedPropertyCard;