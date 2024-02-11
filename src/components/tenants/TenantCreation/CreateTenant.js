import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog.tsx";
import RentalSelection from "../../rentals/RentalSelection.js";
import {useState} from "react";
import {useGetUnitsQuery} from "../../../services/api/unitApi.js";
import {Badge} from "../../ui/badge.tsx";
import {Button} from "../../ui/button.tsx";
import TenantForm from "./TenantForm.js";
import AddToLease from "./AddToLease.js";
import {useCreateTenantMutation} from "../../../services/api/tenantApi.js";

const CreateTenant = (props) => {
    const [modalOpen, setModalOpen] = useState(false)

    const [selectedUnitId, setSelectedUnitId] = useState(null);

    const [leaseData, setLeaseData] = useState({
        decision: "new",
        leaseId: null, // If decision is existing, we send createTenant API call with this as query (to connect to existing)
        lease: {  // If decision is new, we send createTenant API call with this as body (to create new)
            startDate: null,
            endDate: null,
        }
    })


    // Current page / step in tenant creation modal
    const [page, setPage] = useState(0)

    // Tenant data entered by user, so first name etc.
    const [tenantData, setTenantData] = useState({
        firstName: null,
        lastName: null,
        email: null,
        phone: null,
    })

    // Units from API
    const {data: units} = useGetUnitsQuery()

    const selectedUnit = units?.data?.find((unit) => unit.id === parseInt(selectedUnitId))


    console.log(selectedUnit)
    const [createTenant, {isLoading: isCreating}] = useCreateTenantMutation()


    const getLastLeased = () => {
        if (selectedUnit?.leases.length > 0) {
            if (selectedUnit?.leases[0]?.endDate) return selectedUnit?.leases[0]?.endDate; else return "Current Lease hasn't ended yet"
        }
        return "Never"
    }

    const UnitStatus = () => {
        if (selectedUnit?.leases?.length > 0) {
            if (selectedUnit?.leases[0]?.endDate) {
                return (<Badge variant="warning">Vacant</Badge>)
            }
            else {
                return (<Badge variant="pink">Occupied</Badge>)
            }

        }
        return (<Badge variant="negative">Never Leased</Badge>)
    }






    function getDescription() {
        if (page === 0) {
            return "Please select a unit to assign the tenant to."
        }
        else if (page === 1) {
            return "Enter some basic information about the tenant."
        }
        else if (page === 2) {
            return "Either select an existing lease or create a new one for the tenant."
        }
        else if (page === 3) {
            return "Review the tenant and lease information before creating the tenant."
        }
        return null
    }

    function submitTenant(data) {
        setTenantData(data)
        setPage(2)
    }

    function confirmTenantCreation() {
        const parsedLease = {
            ...leaseData.lease,
        }

        if (parsedLease.startDate) {
            parsedLease.startDate = new Date(parsedLease.startDate).toISOString()
        }

        if (parsedLease.endDate) {
            parsedLease.endDate = new Date(parsedLease.endDate).toISOString()
        }

        if (parsedLease.rentalPrice) {
            parsedLease.rentalPrice = parseFloat(parsedLease.rentalPrice)
        }

        if (parsedLease.leaseLength) {
            parsedLease.leaseLength = parseInt(parsedLease.leaseLength)
        }


        const body = {
            ...tenantData,
            ...(leaseData.decision === "new" ? {lease: {...parsedLease}, unitId: selectedUnitId
            } : null),
            unitId: selectedUnitId
        }

        const leaseId = leaseData.decision === "existing" ? leaseData.leaseId : null

        createTenant({bodyData:body, leaseId}).then((res) => {
            if (res.data) {
                setModalOpen(false)
            }
        })
    }


    return (<Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                {props.trigger}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Create Tenant
                    </DialogTitle>
                    <DialogDescription>
                        {getDescription()}
                    </DialogDescription>
                </DialogHeader>


                <div className="flex flex-col gap-4">
                    {page === 0 && (<>
                            <RentalSelection onSelect={setSelectedUnitId} selected={selectedUnitId} units={units}/>
                            <div className="flex flex-col gap-4">
                                <div className="bg-gray-50 border-2 border-gray-100 p-2 rounded-xl" hidden={!selectedUnit}>
                                    <h3 className="text-lg font-400">{selectedUnit?.unitIdentifier || "Unit " + selectedUnit?.id}</h3>
                                    <p className="text-sm text-gray-500">Belongs to
                                        Property: {selectedUnit?.realEstateObject?.title}</p>
                                    <UnitStatus/>
                                    <p className="text-sm text-gray-500">Previous Lease Ended
                                        on: {getLastLeased(selectedUnit)}
                                    </p>
                                </div>

                                <p className="text-sm" hidden={selectedUnit}>
                                    To continue, please select a unit to assign the tenant to.
                                </p>

                                <div className="w-full flex flex-row gap-4">
                                    <Button variant="secondary" className="w-full" onClick={() => setModalOpen(false)}>
                                        Cancel
                                    </Button>


                                    <Button onClick={() => setPage(1)} disabled={!selectedUnit} variant="gradient" className="w-full">
                                        Next
                                    </Button>
                                </div>

                            </div>
                        </>)}


                    {page === 1 && (
                        <TenantForm tenantData={tenantData} onSubmit={(data) => {submitTenant(data)}}>
                            <div className="w-full flex flex-row gap-4">
                                <Button onClick={() => setPage(0)} variant="secondary" className="w-full">
                                    Back
                                </Button>
                                <Button type="submit" variant="gradient" className="w-full">
                                    Next
                                </Button>
                            </div>

                        </TenantForm>
                    )}


                    {page === 2 && (
                        <div>
                            <AddToLease unitId={selectedUnitId} leaseData={leaseData} setLeaseData={setLeaseData}/>

                            <div className="w-full flex flex-row gap-4">
                                <Button onClick={() => setPage(1)} variant="secondary" className="w-full">
                                    Back
                                </Button>
                                <Button onClick={() => setPage(3)} type="submit" variant="gradient" className="w-full">
                                    Next
                                </Button>
                            </div>
                        </div>
                        )}

                    {page === 3 && (
                        <div>
                            <p className="text-lg font-500 text-primary-dark">
                                Tenant: {tenantData?.firstName + " " + tenantData?.lastName}
                            </p>
                            <p className="font-400" hidden={leaseData.decision === "existing"}>
                                Creating new lease:
                                <p hidden={!leaseData.lease?.startDate}>
                                    Start Date: {leaseData.lease?.startDate}
                                </p>
                                <p hidden={!leaseData.lease?.endDate}>
                                    End Date: {leaseData.lease?.endDate}
                                </p>
                                <p hidden={!leaseData.lease?.rentalPrice}>
                                    Rental Price: {leaseData.lease?.rentalPrice}
                                </p>

                            </p>
                            <p className="font-400" hidden={leaseData.decision === "new"}>
                                {"Assigning to existing lease: " + leaseData.leaseId }
                            </p>
                            <p className="font-400 text-lg text-primary">
                                {selectedUnit?.unitIdentifier || "Unit " + selectedUnit?.id}
                            </p>


                            <div className="w-full flex flex-row gap-4">
                                <Button onClick={() => setPage(2)} variant="secondary" className="w-full">
                                    Back
                                </Button>

                                <Button onClick={() => confirmTenantCreation()} type="submit" variant="gradient" className="w-full" isLoading={isCreating}>
                                    Create
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

            </DialogContent>
        </Dialog>)
}

export default CreateTenant;