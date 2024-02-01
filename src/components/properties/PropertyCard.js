import {Card, CardContent, CardFooter} from "../ui/card.tsx";
import {useNavigate} from "react-router-dom";
import PropertyStatus from "./PropertyStatus.js";

const PropertyCard = ({ property, children }) => {
    const navigate = useNavigate();


    if (children || !property) {
        return (
            <Card className="min-w-fit shadow-md basis-[250px]" >
                {children}
            </Card>
        )
    }

    const { title, description, image, price, currency, location, type, listingStatus, bedrooms, bathrooms, area, yearBuilt, realtor, id } = property;


    return (
        <Card className="min-w-fit shadow-md basis-[250px]">
            <CardContent className="p-2 pt-6 items-center justify-center flex min-w-fit">
                <img
                    src={image || "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg"}
                    alt={title || "?"}
                    className="w-44 h-44 md:w-44 md:h-44 lg:w-64 lg:h-64 object-cover rounded-full hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer"
                    onClick={() => navigate(`/properties/${id}`)}
                />
            </CardContent>
            <CardFooter className="flex flex-col p-4 justify-start items-start">
                <h className="font-600 text-off-black text-xl">
                    {title || "?"}
                </h>
                <p className="md:flex font-400 text-md">
                    {description || "?"}
                    <PropertyStatus status={listingStatus} className="ml-2" />
                </p>
            </CardFooter>
        </Card>
        )
}

export default PropertyCard;