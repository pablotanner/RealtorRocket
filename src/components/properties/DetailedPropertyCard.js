import { Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,} from "../ui/card.tsx";

const DetailedPropertyCard = ({ property }) => {

    return (
        <Card className="w-fit shadow-xl">
            <CardHeader>
                <CardTitle>Property</CardTitle>
                <CardDescription>{property.title}</CardDescription>
            </CardHeader>
            <CardContent>
                <img
                    src={property.images[0]?.imageUrl}
                    alt={property.title || "?"}
                    className="w-44 h-44 md:w-44 md:h-44 lg:w-64 lg:h-64 object-cover rounded-full hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer"
                />
                <CardDescription>{property.description}</CardDescription>
                <CardDescription>{property.price}</CardDescription>
                <CardDescription>{property.currency}</CardDescription>
                <CardDescription>{property.location}</CardDescription>
                <CardDescription>{property.type}</CardDescription>
                <CardDescription>{property.listingStatus}</CardDescription>
                <CardDescription>{property.bedrooms}</CardDescription>
                <CardDescription>{property.bathrooms}</CardDescription>
                <CardDescription>{property.area}</CardDescription>
                <CardDescription>{property.yearBuilt}</CardDescription>
                <CardDescription>{property.realtor}</CardDescription>
            </CardContent>

        </Card>
    )
}

export default DetailedPropertyCard;