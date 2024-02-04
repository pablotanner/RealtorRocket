import {Card, CardContent, CardFooter} from "../ui/card.tsx";
import {useNavigate} from "react-router-dom";
import PropertyStatus from "./PropertyStatus.js";

const PropertyCard = ({ property, children }) => {
    const navigate = useNavigate();


    if (children || !property) {
        return (
            <Card className="min-w-fit shadow-md basis-[300px] max-w-[300px] pb-10" >
                {children}
            </Card>
        )
    }


    const { title, description, images, price, currency, location, type, listingStatus, bedrooms, bathrooms, area, yearBuilt, realtor, id } = property;


    return (
        <Card className="min-w-fit shadow-md basis-[300px] max-w-[300px]">
            <CardContent className="p-2 pt-6 items-center justify-center flex min-w-fit">
                <img
                    src={images[0]?.imageUrl}
                    alt={title || "?"}
                    className="w-44 h-44 md:w-44 md:h-44 lg:w-64 lg:h-64 object-cover rounded-full hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer"
                    onClick={() => navigate(`/properties/${id}`)}
                />
            </CardContent>
            <CardFooter className="flex flex-col p-4 justify-start items-start max-w-[300px]">
                <h className="font-600 text-off-black text-xl">
                    {title || "?"}
                </h>
                <p className="flex font-400 text-md ">
                    {description || "?"}
                </p>
            </CardFooter>
        </Card>
        )
}

export default PropertyCard;