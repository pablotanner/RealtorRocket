
const ReviewCard = ({propertyData, unitData, rentalType}) => {

    const header = rentalType === "whole" ? "Entire Property" : (unitData.length + " Unit(s)")

    return (
        <div className="bg-gray-100 rounded-xl p-4 pt-2 mt-4">
            <div className="font-600 text-lg text-primary-dark">
                {header}
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-400 text-md">
                    {propertyData.title}
                </div>
                <div className="text-gray-700 text-sm">
                    {propertyData.description}
                </div>
                <div className="text-primary text-sm">
                    {propertyData.realEstateType}
                </div>
            </div>
        </div>
    )
}

export default ReviewCard;