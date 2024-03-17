import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {Avatar, AvatarFallback} from "../ui/avatar.tsx";
import {Button} from "../ui/button.tsx";
import {dateParser} from "../../utils/formatters.js";
import {useNavigate, useParams} from "react-router-dom";
import {Plus, UserIcon, UserRoundX, XIcon} from "lucide-react";
import TenantSelection from "../comboboxes/TenantSelection.js";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectAllTenants} from "../../services/slices/objectSlice.js";
import {Checkbox} from "../ui/checkbox.tsx";
import {useAssignTenantMutation} from "../../services/api/unitApi.js";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "../ui/alert-dialog.tsx";


const TenantCard = ({ tenant }) => {
    const navigate = useNavigate();

    const rentalId = useParams().id;

    const handleViewProfile = () => {
        navigate(`/tenants/${tenant.id}`);
    }

    const [assignTenant, {isLoading: isAssigningTenant}] = useAssignTenantMutation()

    const [selectedTenantId, setSelectedTenantId] = useState(null);

    const allTenants = useSelector(state => selectAllTenants(state))

    const unassignedTenants = allTenants.filter(tenant => {
        // If tenant has never been assigned to unit
        if (!tenant?.unit || !tenant?.unit.length) {
            return tenant
        }
        // If tenant has previously been assigned to a unit, which now has a different tenant
        if (tenant?.unit[0].tenantId !== tenant.id) {
            return tenant
        }
        return null
    })

    const handleAssignTenant = () => {
        if (!selectedTenantId ) return null;

        assignTenant({
            unitId: rentalId,
            tenantId: selectedTenantId
        })
    }


    const [onlyUnassignedTenants, setOnlyUnassignedTenants] = useState(true)
    if (!tenant) {
        return (
            <Card className="shadow-lg basis-[400px] flex-grow">
                <CardHeader className="flex flex-col items-center">
                    <div className="p-3 rounded-md border-2 border-border shadow-sm">
                        <UserRoundX className="w-6 h-6"/>
                    </div>
                    <CardTitle>
                        Assign Tenant
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 items-center">
                    <p className="text-md text-gray-800 text-center">
                        This unit is currently unoccupied. If you wish to assign a tenant to this unit, you can do so using the button below.
                    </p>
                    <div className="flex flex-col items-center text-center">
                            <p className="text-off-black text-md font-500 flex items-center gap-2 justify-center">
                                <Checkbox checked={onlyUnassignedTenants} onClick={() => {
                                    setOnlyUnassignedTenants(!onlyUnassignedTenants)
                                    setSelectedTenantId(null)
                                }}/>
                                Hide Assigned Tenants
                            </p>
                            <p className="text-sm text-gray-700">
                                Only show tenants who aren't currently assigned to a unit
                            </p>
                    </div>
                    <div className="flex gap-2 items-center justify-center w-full">
                        <TenantSelection selected={selectedTenantId} onSelect={(tenant) => {
                            setSelectedTenantId(tenant)
                        }}
                                         tenants={onlyUnassignedTenants ? unassignedTenants : allTenants}
                        />
                        <Button variant="gradient" disabled={!selectedTenantId} isLoading={isAssigningTenant} onClick={handleAssignTenant}>
                            <Plus className="w-4 h-4 mr-2"/> Assign
                        </Button>
                    </div>

                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="shadow-lg basis-[400px] flex-grow flex flex-col justify-center">
            <CardHeader className="flex flex-col items-center gap-2 ">
                <CardTitle>
                    Current Tenant
                </CardTitle>
                <Avatar className="w-32 h-32">
                    <img src={tenant?.profilePic} alt={tenant?.name}/>
                    <AvatarFallback className="text-2xl">
                        {tenant?.firstName[0] + tenant?.lastName[0]}
                    </AvatarFallback>
                </Avatar>
                <h1 className="font-500 text-xl">
                    {tenant?.firstName} {tenant?.lastName}
                </h1>
                {tenant?.leases?.length === 1 ? (
                    "1 Lease"
                ) : (
                    `${tenant?.leases?.length} Leases`
                )}
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
                <div className="flex flex-row gap-2">
                    <Button
                        variant="light"
                        onClick={handleViewProfile}
                    >
                        View Profile
                    </Button>
                    <Button
                        variant="gradient"
                    >
                        Send Message
                    </Button>
                </div>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="link" className="text-red-500">
                            <XIcon className="w-4 h-4 mr-1"/>
                            Remove from Unit
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you sure?
                            </AlertDialogTitle>
                            This will remove the tenant from the unit.
                        </AlertDialogHeader>

                        <div className="w-full flex flex-row gap-2 items-center">
                            <AlertDialogCancel className="w-full">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction className="w-full" onClick={() => {
                                assignTenant({
                                    unitId: rentalId,
                                    tenantId: null
                                })
                            }}>
                                Confirm
                            </AlertDialogAction>
                        </div>

                    </AlertDialogContent>
                </AlertDialog>

            </CardContent>


        </Card>
    )

}

export default TenantCard;