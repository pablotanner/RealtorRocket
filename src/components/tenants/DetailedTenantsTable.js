import {Avatar, AvatarFallback} from "../ui/avatar.tsx";
import {Badge} from "../ui/badge.tsx";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../ui/tooltip.tsx";
import {Button} from "../ui/button.tsx";
import {Boxes, Building2, LinkIcon, MoreHorizontal, Pencil, Plus, Send, Trash2, UserRound} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {useNavigate} from "react-router-dom";
import {useDeleteTenantMutation} from "../../services/api/tenantApi.js";
import {dateParser} from "../../utils/formatters.js";
import {useSelector} from "react-redux";
import {selectUnitByLeaseId, selectUnitsByTenantId} from "../../services/api/objectSlice.js";

const DetailedTenantsTable = ({ tenants }) => {

    const navigate = useNavigate()

    const [deleteTenant, {isLoading: isDeletingTenant}] = useDeleteTenantMutation()

    const TenantOptions = ({tenant}) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <MoreHorizontal className="h-5 w-5"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[150px]">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex flex-row text-sm gap-2" onClick={() => navigate(`/tenants/${tenant?.id}`)}>
                                <UserRound className="w-4 h-4 "/>
                                View Tenant
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-row text-sm gap-2" disabled>
                                <Pencil className="w-4 h-4"/>
                                Edit
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />
                        <DropdownMenuSeparator />

                        <DropdownMenuGroup>
                            <DropdownMenuItem className="flex flex-row text-sm gap-2 text-red-500"
                                              onClick={() => deleteTenant(tenant?.id)}
                            >
                                <Trash2 className="w-4 h-4"/>
                                Delete Tenant
                            </DropdownMenuItem>
                        </DropdownMenuGroup>

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }

    const TenantRow = ({ tenant, key }) => {
        //const newestLease = tenant?.leases[0];

        //const mostRecentUnit = useSelector(state => selectUnitByLeaseId(state, newestLease?.id));


        return (
            <>
                <div key={key} className="flex flex-row gap-10 hover:bg-gray-100 rounded-xl p-1">

                    <div className="flex flex-row items-center gap-4 w-[15vw] min-w-[200px]">
                        <Avatar>
                            <AvatarFallback>{tenant?.firstName[0]?.toUpperCase()}{tenant?.lastName[0]?.toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <h className="font-500 text-md ">
                                {tenant?.firstName + " " + tenant?.lastName}
                            </h>
                            <p className="font-300 text-gray-500 text-sm">
                                {tenant?.email}
                            </p>
                        </div>
                    </div>


                    <div className="flex justify-center w-[15vw] min-w-[100px]">
                        <div className="flex flex-col justify-center">
                            <h className="font-500 text-md text-gray-800">
                                {tenant?.leases?.length ? "Unit " + tenant?.leases[0]?.unitId : "No Lease"}
                            </h>
                            <p className="font-300 text-gray-500 text-sm w-[150px]">
                                {tenant?.leases[0].endDate ? "Lease Ends on " + dateParser(tenant?.leases[0]?.endDate) : "No Lease End Date"}

                            </p>
                        </div>

                    </div>

                    <div className="flex justify-center w-fit">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button>
                                        <Badge itemType="button" variant="purple" className="h-fit whitespace-nowrap" >
                                            Verified Tenant
                                        </Badge>
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        This tenant has created an account and verified their email address.
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>



                    <div className="flex justify-end w-[15vw] items-center gap-5">
                        <TenantOptions tenant={tenant}/>
                        <Button variant="indigo" size="md">
                            <Send className="mr-2 w-3 h-3"/>
                            Contact
                        </Button>
                    </div>
                </div>
            </>

        )
    }


    return (
        <div className="flex flex-col gap-2  overflow-auto">
            {tenants?.map((tenant, index) => {
                return <TenantRow key={index} tenant={tenant} />
            })}
        </div>
    )

}

export default DetailedTenantsTable;