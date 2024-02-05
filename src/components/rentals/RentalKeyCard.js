import {Card, CardContent} from "../ui/card.tsx";
import {Label} from "../ui/label.tsx";
import {moneyParser} from "../../utils/inputHandlers.js";


const RentalKeyCard = ({unit, isSingleUnit}) => {



    return (
        <Card className="bg-gray-100 flex flex-grow items-center basis-[300px] flex-shrink shadow-lg">
            <CardContent className="p-4 w-[100%] flex flex-col">
                {<div className="p-4 border-gray-200 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-off-black">
                        Unit ID
                    </Label>
                    <h3 className="text-2xl text-gray-400">
                        {unit?.id}
                    </h3>
                </div>}

                <div hidden={isSingleUnit}  className="p-4 border-gray-200 border-t-0 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-off-black">
                        Unit Number
                    </Label>
                    <h3 className="text-2xl text-gray-400">
                        {unit?.unitNumber || "N/A"}
                    </h3>
                </div>

                <div   className="p-4 border-gray-200 border-t-0 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-off-black">
                        Rental Price
                    </Label>
                    <h3 className="text-2xl text-gray-400">
                        {moneyParser(unit?.rentalPrice) || "N/A"}
                    </h3>
                </div>

                <div   className="p-4 border-gray-200 border-t-0 border-2 rounded-md flex flex-col">
                    <Label className="text-sm font-600 text-off-black">
                        Rental Status
                    </Label>
                    <h3 className="text-2xl text-gray-400">
                        {unit?.status || "N/A"}
                    </h3>
                </div>

            </CardContent>
        </Card>
    )
}

export default RentalKeyCard;