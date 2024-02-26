import {Button} from "../../ui/button.tsx";
import {useState} from "react";
import LeaseSelection from "../../comboboxes/LeaseSelection.js";
import {useGetLeasesQuery} from "../../../services/api/leaseApi.js";
import LeaseForm from "../../leases/LeaseForm.js";

const AddToLease = ({unitId, setLeaseData, leaseData}) => {
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
                            leaseId: selectedLease,
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
                    <LeaseForm onChange={(data) => {
                        setLeaseData({
                            decision: "new",
                            leaseId: null,
                            lease: data
                        })
                    }} lease={leaseData?.lease || null} />
                </div>
                )}

            {decision === "existing" && (
                <div className="text-lg flex flex-col">
                    <LeaseSelection selected={selectedLease} onSelect={
                        (leaseId) => {
                            if (leaseId === selectedLease || leaseId === null) {
                                setSelectedLease(null)
                                setLeaseData(
                                    {
                                        decision: "new",
                                        leaseId: null,
                                    }
                                )
                            }
                            else {
                                setSelectedLease(leaseId)
                                setLeaseData(
                                    {
                                        decision: decision,
                                        leaseId: leaseId,
                                    }
                                )
                            }
                        }
                    } leases={leases?.data} isLoading={isLoading} />

                    {selectedLease && <p className="text-red-500 text-md">
                        {leases?.data?.find((lease) => lease?.id === parseInt(selectedLease))?.tenantId
                            ? "This lease already has a tenant assigned, if you decide to continue, the current tenant will be overwritten."
                            : null
                        }
                    </p>}
                </div>
                )}
        </div>
    )

}

export default AddToLease;