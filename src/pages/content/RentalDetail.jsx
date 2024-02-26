import {useNavigate, useParams} from "react-router-dom";
import DetailedPropertyCard from "../../components/properties/DetailedPropertyCard.js";
import RentalKeyCard from "../../components/rentals/RentalKeyCard.js";
import {Label} from "../../components/ui/label.tsx";
import {BathIcon, BedIcon, CarFront, FilePlus2, LandPlot} from "lucide-react";
import {dateParser, numberToLiteral} from "../../utils/formatters.js";
import TenantCard from "../../components/rentals/TenantCard.js";
import {useSelector} from "react-redux";
import {selectPropertyByUnitId, selectTenantById} from "../../services/slices/objectSlice.js";
import LeaseHistory from "../../components/leases/LeaseHistory.tsx";
import {Button} from "../../components/ui/button.tsx";
import AddLease from "../../components/leases/AddLease.js";
import {useState} from "react";


const RentalDetail = (props) => {
    const {data} = props;

    const { id } = useParams();

   // const navigate = useNavigate();

    const property = useSelector(state => selectPropertyByUnitId(state, id));

    const tenant = useSelector(state => selectTenantById(state, data?.data?.tenantId))

    const [showLeaseModal, setShowLeaseModal] = useState(false);


    return (
        <>
            <h1>
                {data?.data.unitIdentifier || "Unit Details"}
            </h1>

            <div className="flex flex-row flex-wrap gap-x-6 gap-y-8">

                <div className="flex flex-row flex-wrap flex-shrink justify-start w-[100%] gap-x-8 gap-y-8">
                    <DetailedPropertyCard property={property}/>
                    <RentalKeyCard unit={data?.data} isSingleUnit={property?.units?.length === 1}/>

                    <TenantCard tenant={tenant}/>

                </div>


                <div className="flex flex-row gap-8 w-full">
                    <div className="hidden xs:flex flex-row border-2 h-fit border-secondary rounded-xl flex-grow justify-around">
                        <div className="flex flex-col gap-1 border-secondary p-3 ">
                            <Label className="font-500 text-gray-500 text-md">
                                Bedroom
                            </Label>
                            <div className="flex flex-row gap-3 text-off-black font-600">
                                <BedIcon size={24} className="text-gray-500"/>
                                {numberToLiteral(data?.data?.numOfBedrooms)}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 p-3 border-l-2 border-secondary ">
                            <Label className="font-500 text-gray-500 text-md">
                                Bathroom
                            </Label>
                            <div className="flex flex-row gap-3 text-off-black font-600 ">
                                <BathIcon size={24} className="text-gray-500"/>
                                {numberToLiteral(data?.data?.numOfBathrooms)}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 p-3 border-l-2 border-secondary">
                            <Label className="font-500 text-gray-500 text-md">
                                Unit Size
                            </Label>
                            <div className="flex flex-row gap-3 text-off-black font-600">
                                <LandPlot size={24} className="text-gray-500"/>
                                {!data?.data?.unitSize ? "N/A" : (data?.data?.unitSize + " sqm")}
                            </div>
                        </div>

                        <div className="hidden sm:flex flex-col gap-1 p-3 border-l-2 border-secondary">
                            <Label className="font-500 text-gray-500 text-md">
                                Garages
                            </Label>
                            <div className="flex flex-row gap-3 text-off-black font-600">
                                <CarFront size={24} className="text-gray-500"/>
                                {data?.data?.garages || "N/A"}
                            </div>
                        </div>

                    </div>

                </div>

                <div className="p-4 rounded-lg bg-white flex-grow w-fit flex-shrink shadow-lg border-secondary border-2 overflow-auto" >
                    <LeaseHistory leases={data?.data?.leases}>
                        <AddLease
                            open={showLeaseModal}
                            onOpenChange={() => setShowLeaseModal(!showLeaseModal)}
                            unit={data?.data}
                        >
                            <Button className="self-end justify-end" variant="outline" type="button">
                                <FilePlus2 className="w-4 h-4 mr-2" />
                                Add Lease
                            </Button>
                        </AddLease>
                    </LeaseHistory>
                </div>





            </div>
        </>
    )



}

export default RentalDetail;