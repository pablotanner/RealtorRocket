import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {ImageIcon} from "lucide-react";

const RentalImagesCard = ({unit}) => {


    return (
        <Card className="shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="flex gap-2 border-b-2 border-border pb-4">
                    <ImageIcon className="w-6 h-6 mr-2"/>
                    Images
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    unit.images?.length ? (
                        "Carousel"
                    ) : <p className="text-muted-foreground">
                        No images available
                    </p>
                }
            </CardContent>
        </Card>

    )
}

export default RentalImagesCard;