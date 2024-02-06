import {Button} from "../../ui/button.tsx";
import {useState} from "react";
import LeaseSelection from "../../leases/LeaseSelection.js";
import {useGetLeasesQuery} from "../../../services/api/leaseApi.js";

const AddToLease = ({unitId, setLeaseData}) => {
    const [decision, setDecision] = useState("new");
    const [selectedLease, setSelectedLease] = useState(null);

    const query = unitId ? {unitId: unitId} : {}

    const {data: leases, isLoading} = useGetLeasesQuery(query)



    return (
        <div className="flex justify-between flex-col gap-4 mb-4">
            <div className="flex flex-row gap-1 bg-gray-100 p-[7px] rounded-xl w-full">
                <Button
                    data-active={decision === "new"}
                    variant="tab"
                    onClick={() => {
                        setDecision("new")
                        setLeaseData({
                            decision: "new",
                            leaseId: null,
                            lease: {
                                //unitId: parseInt(unitId),
                                // Add more lease data here such as start/end dates etc.
                            }
                        })
                    }}
                    className="w-full"
                >
                    New Lease
                </Button>
                <Button
                    data-active={decision === "existing"}
                    variant="tab"
                    onClick={() => setDecision("existing")}
                    className="w-full"
                >
                    Existing Lease
                </Button>
            </div>

            {decision === "new" && (
                <div className="text-md">
                    Lease Creation Form here (for now just creates empty lease)
                </div>
                )}

            {decision === "existing" && (
                <div className="text-lg">
                    <LeaseSelection selected={selectedLease} onSelect={
                        (leaseId) => {
                            setSelectedLease(leaseId)
                            setLeaseData(
                                {
                                    decision: decision,
                                    leaseId: leaseId,
                                }
                            )
                        }
                    } leases={leases?.data} isLoading={isLoading} />
                </div>
                )}

            {selectedLease}
        </div>
    )

}

export default AddToLease;