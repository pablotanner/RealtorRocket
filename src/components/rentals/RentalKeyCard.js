import {Card, CardContent} from "../ui/card.tsx";
import {Label} from "../ui/label.tsx";
import {moneyParser} from "../../utils/formatters.js";


const RentalKeyCard = ({unit, isSingleUnit}) => {

    return (
        <Card className="bg-background flex flex-grow items-center basis-[200px] flex-shrink shadow-lg">
            <CardContent className="p-4 w-[100%] flex flex-col">
                {<div className="p-4 border-input border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-foreground">
                        Unit Identifier
                    </Label>
                    <h3 className="text-2xl text-muted-foreground">
                        {unit?.unitIdentifier || "N/A"}
                    </h3>
                </div>}

                <div hidden={isSingleUnit}  className="p-4 border-input border-t-0 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-foreground">
                        Unit Number
                    </Label>
                    <h3 className="text-2xl text-muted-foreground">
                        {unit?.unitNumber || "N/A"}
                    </h3>
                </div>

                <div   className="p-4 border-input border-t-0 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-foreground">
                        Rental Price
                    </Label>
                    <h3 className="text-2xl text-muted-foreground">
                        {moneyParser(unit?.rentalPrice) || "N/A"}
                    </h3>
                </div>

                <div   className="p-4 border-input border-t-0 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-foreground">
                        Rental Status
                    </Label>
                    <h3 className="text-2xl text-muted-foreground">
                        {unit?.status || "N/A"}
                    </h3>
                </div>

            </CardContent>
        </Card>
    )
}

export default RentalKeyCard;