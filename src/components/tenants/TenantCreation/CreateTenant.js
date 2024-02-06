import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "../../ui/dialog.tsx";
import RentalSelection from "../../rentals/RentalSelection.js";
import {useState} from "react";
import {useGetUnitsQuery} from "../../../services/api/unitApi.js";
import {Badge} from "../../ui/badge.tsx";
import {Button} from "../../ui/button.tsx";
import TenantForm from "./TenantForm.js";
import AddToLease from "./AddToLease.js";
import {useCreateTenantMutation} from "../../../services/api/tenantApi.js";

const CreateTenant = (props) => {
    const [selectedUnit, setSelectedUnit] = useState(null);

    const [leaseData, setLeaseData] = useState({
        decision: "new",
        leaseId: null, // If decision is existing, we send createTenant API call with this as query (to connect to existing)
        lease: {  // If decision is new, we send createTenant API call with this as body (to create new)
            startDate: null,
            endDate: null,
        }
    })

    const [page, setPage] = useState(0)

    const [tenantData, setTenantData] = useState({})

    const {data: units} = useGetUnitsQuery()

    const unit = units?.data?.find((unit) => unit.id === parseInt(selectedUnit))


    const [createTenant, {data, isLoading: isCreating}] = useCreateTenantMutation()


    const getLastLeased = (unit) => {
        if (unit?.leases.length > 0) {
            if (unit?.leases[0]?.endDate) return unit?.leases[0]?.endDate; else return "Current Lease hasn't ended yet"
        }
        return "Never"
    }

    const UnitStatus = () => {
        if (unit?.leases?.length > 0) {
            if (unit?.leases[0]?.endDate) {
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
        const body = {
            ...tenantData,
            ...(leaseData.decision === "new" ? {lease: {...leaseData.lease}, unitId: selectedUnit
            } : null)
        }

        const leaseId = leaseData.decision === "existing" ? leaseData.leaseId : null

        createTenant(body, leaseId).then(() => {
            // reload page
            window.location.reload()
        })

    }


    return (<Dialog>
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
                            <RentalSelection onSelect={setSelectedUnit} selected={selectedUnit}/>
                            <div className="flex flex-col gap-4">
                                <div className="bg-gray-50 border-2 border-gray-100 p-2 rounded-xl" hidden={!unit}>
                                    <h3 className="text-lg font-400">Unit {unit?.id}</h3>
                                    <p className="text-sm text-gray-500">Belongs to
                                        Property: {unit?.realEstateObject?.title}</p>
                                    <UnitStatus/>
                                    <p className="text-sm text-gray-500">Previous Lease Ended
                                        on: {getLastLeased(unit)}
                                    </p>
                                </div>

                                <p className="text-sm" hidden={unit}>
                                    To continue, please select a unit to assign the tenant to.
                                </p>

                                <Button onClick={() => setPage(1)} disabled={!unit} variant="gradient">
                                    Next
                                </Button>
                            </div>
                        </>)}


                    {page === 1 && (
                        <TenantForm onSubmit={(data) => {submitTenant(data)}}>
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
                            <AddToLease unitId={selectedUnit} setLeaseData={setLeaseData}/>

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
                            <p className="font-400">
                                {leaseData.decision === "new" ? "Creating new Lease" : "Assigning to existing lease: " + leaseData.leaseId }
                            </p>
                            <p className="font-400 text-lg text-primary">
                                Unit: {selectedUnit}
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