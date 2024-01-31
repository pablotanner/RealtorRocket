import {Card, CardContent, CardFooter} from "../ui/card.tsx";
import {useNavigate} from "react-router-dom";


const PropertyCard = ({ property, children }) => {
    const navigate = useNavigate();


    if (children || !property) {
        return (
            <Card className="min-w-fit shadow-md w-[200px]" >
                {children}
            </Card>
        )
    }

    const { title, description, image, price, currency, location, type, bedrooms, bathrooms, area, yearBuilt, realtor, id } = property;


    return (
        <Card className="min-w-fit shadow-md w-[200px]">
            <CardContent className="p-2 pt-6 items-center justify-center flex">
                <img
                    src={image || "https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg"}
                    alt={title || "?"}
                    className="w-24 h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 object-cover rounded-full hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer"
                    onClick={() => navigate(`/properties/${id}`)}
                />
            </CardContent>
            <CardFooter className="flex flex-col p-4 justify-start items-start">
                <h className="font-600 text-off-black text-xl">
                    {title || "?"}
                </h>
                <p className="hidden md:flex font-400 text-md">
                    {description || "?"}
                </p>
            </CardFooter>
        </Card>
        )
}

export default PropertyCard;