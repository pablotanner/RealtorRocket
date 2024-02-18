import {useSelector} from "react-redux";
import {selectPropertyById, selectUnitByTenantId} from "../../services/slices/objectSlice.js";
import {Image} from "../../components/ui/image.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "../../components/ui/avatar.tsx";
import {Button} from "../../components/ui/button.tsx";
import {FilePlus2, PencilIcon, SendIcon} from "lucide-react";
import {Badge} from "../../components/ui/badge.tsx";
import {dateParser} from "../../utils/formatters.js";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";
import EditTenant from "../../components/tenants/EditTenant.js";
import LeaseHistory from "../../components/leases/LeaseHistory.tsx";
import AddLease from "../../components/leases/AddLease.js";
import {useState} from "react";


const TenantProfile = (props) => {

    const tenant = props?.data?.data;

    const currentUnit = useSelector((state) => selectUnitByTenantId(state, tenant?.id));

    const property = useSelector((state) => selectPropertyById(state, currentUnit?.realEstateObjectId));

    const [showLeaseModal, setShowLeaseModal] = useState(false);


    const displayTenantInformation = () => {
        const information = []

        if (tenant?.occupation) {
            information.push(tenant?.occupation)
        }
        if (tenant?.email) {
            information.push(tenant?.email)
        }

        return information.join(" | ")

    }


    return (
        <div className="">
            <div className="relative w-full h-[21rem] lg:h-36 ">
                <Image src={currentUnit?.images[0]?.imageUrl || property?.images[0]?.imageUrl} alt="House" className="w-full h-64 object-cover absolute z-10 rounded-sm"/>
                <div className="absolute min-w-fit z-20 left-0 right-0 top-36 lg:top-32 m-4 bg-white p-4 rounded-lg border-2 border-secondary flex flex-col items-center lg:items-start lg:flex-row gap-x-8 shadow-md ">
                    <Avatar className="w-36 h-36 -top-12 rounded-lg border-white border-[5px] shadow-md">
                        <AvatarImage src={tenant?.profileImageUrl} alt="Tenant" className="rounded-none" />
                        <AvatarFallback className="rounded-none text-2xl" >
                            {tenant?.firstName.charAt(0)}{tenant?.lastName.charAt(0)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="w-full -mt-12 lg:mt-0 flex flex-col justify-center items-center lg:items-start">
                        <Badge variant="purple" className="p-1">
                            Added: {dateParser(tenant?.createdAt)}
                        </Badge>
                        <h1 className="text-2xl font-600">
                            {tenant?.firstName} {tenant?.lastName}
                        </h1>
                        <p className="text-gray-500 text-center">
                            {displayTenantInformation()}
                        </p>
                    </div>

                    <div className="w-[3px] h-32 bg-secondary hidden lg:flex "/>

                    <div className="flex flex-col gap-2 ">
                        <div className="text-center">
                            This tenant has not created an account yet.
                            <Button variant="link" className="pl-2 text-primary-dark">
                                Send Invite
                            </Button>
                        </div>
                        <Button variant="dark"  title="User not registered.">
                            <SendIcon className="w-4 h-4 mr-2" />
                            Message
                        </Button>
                    </div>


                </div>
            </div>

            <div className="mt-[200px] bg-white border-t-2 pt-4 border-secondary">
                <Tabs defaultValue="information" className="p-2 border-secondary border-2 rounded-lg overflow-auto">
                    <TabsList className="mr-1">
                        <TabsTrigger value="information">Information</TabsTrigger>
                        <TabsTrigger value="leases">Lease History</TabsTrigger>
                        <TabsTrigger value="requests">Maintenance Requests</TabsTrigger>
                    </TabsList>
                    <TabsContent value="information" >
                        <h1>Tenant Information</h1>
                        <EditTenant tenant={tenant} />
                    </TabsContent>
                    <TabsContent value="leases">
                        <LeaseHistory leases={tenant?.leases} >
                            <AddLease
                                open={showLeaseModal}
                                onOpenChange={() => setShowLeaseModal(!showLeaseModal)}
                                tenant={tenant}
                            >
                                <Button className="self-end justify-end" variant="outline" type="button">
                                    <FilePlus2 className="w-4 h-4 mr-2" />
                                    Add Lease
                                </Button>
                            </AddLease>
                        </LeaseHistory>
                    </TabsContent>
                    <TabsContent value="requests">
                        <h1>
                            Maintenance Requests
                        </h1>
                        No maintenance requests
                    </TabsContent>
                </Tabs>
            </div>


        </div>
    )

}

export default TenantProfile;