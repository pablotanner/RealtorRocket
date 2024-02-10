import {useNavigate, useParams} from "react-router-dom";
import DetailedPropertyCard from "../../components/properties/DetailedPropertyCard.js";
import RentalKeyCard from "../../components/rentals/RentalKeyCard.js";
import {Label} from "../../components/ui/label.tsx";
import {BathIcon, BedIcon, CarFront, LandPlot} from "lucide-react";
import {numberToLiteral} from "../../utils/formatters.js";
import TenantCard from "../../components/rentals/TenantCard.js";
import {useSelector} from "react-redux";
import {selectPropertyByUnitId, selectTenantById} from "../../services/slices/objectSlice.js";


const RentalDetail = (props) => {
    const {data} = props;

    const { id } = useParams();

   // const navigate = useNavigate();

    const property = useSelector(state => selectPropertyByUnitId(state, id));

    const tenant = useSelector(state => selectTenantById(state, data?.data?.leases[0]?.tenantId))

    return (
        <div className="min-w-fit flex flex-row flex-wrap gap-x-6 gap-y-8">
            <div className="flex flex-row flex-wrap justify-start w-[100%] gap-x-8 gap-y-8">
                <DetailedPropertyCard property={property}/>
                <RentalKeyCard unit={data?.data} isSingleUnit={property?.units?.length === 1}/>

                <TenantCard tenant={tenant}/>


                <div className="bg-gray-100 p-4 rounded-lg shadow-lg max-w-full flex-grow border-gray-200 border-2" >
                    <Label className="text-2xl font-500">
                        Lease History
                    </Label>
                    <p className="text-gray-500 font-300">
                        No lease history available.
                    </p>
                </div>


            </div>

            <div className="flex flex-wrap flex-row  gap-8 items-center w-fit">
                <div className="hidden xs:flex flex-row gap-7 border-2 h-fit border-gray-200 rounded-xl w-fit">
                    <div className="flex flex-col gap-1 border-gray-200 p-3">
                        <Label className="font-500 text-gray-500 text-md">
                            Bedroom
                        </Label>
                        <div className="flex flex-row gap-3 text-off-black font-600">
                            <BedIcon size={24} className="text-gray-500"/>
                            {numberToLiteral(data?.data?.numOfBedrooms)}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 p-3 border-l-2  ">
                        <Label className="font-500 text-gray-500 text-md">
                            Bathroom
                        </Label>
                        <div className="flex flex-row gap-3 text-off-black font-600">
                            <BathIcon size={24} className="text-gray-500"/>
                            {numberToLiteral(data?.data?.numOfBathrooms)}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 p-3 border-l-2">
                        <Label className="font-500 text-gray-500 text-md">
                            Unit Size
                        </Label>
                        <div className="flex flex-row gap-3 text-off-black font-600">
                            <LandPlot size={24} className="text-gray-500"/>
                            {!data?.data?.unitSize ? "N/A" : (data?.data?.unitSize + " sqm")}
                        </div>
                    </div>

                    <div className="hidden sm:flex flex-col gap-1 p-3 border-l-2">
                        <Label className="font-500 text-gray-500 text-md">
                            Garages
                        </Label>
                        <div className="flex flex-row gap-3 text-off-black font-600">
                            <CarFront size={24} className="text-gray-500"/>
                            {data?.data?.garages || "N/A"}
                        </div>
                    </div>


                    {/*<div className="hidden md:flex flex-col gap-1 p-3 pr-6 border-l-2">
                        <Label className="font-500 text-gray-500 text-md">
                            Floors
                        </Label>
                        <div className="flex flex-row gap-3 text-off-black font-600">
                            <FaStairs size={24} className="text-gray-500"/>
                            {data?.data?.numOfFloors || "N/A"}
                        </div>
                    </div>*/}
                </div>


            </div>





        </div>
    )



}

export default RentalDetail;