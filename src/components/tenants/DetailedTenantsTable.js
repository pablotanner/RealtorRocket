import {Avatar, AvatarFallback} from "../ui/avatar.tsx";

const DetailedTenantsTable = ({ tenants }) => {


    const TenantRow = ({ tenant, key }) => {
        return (
            <div key={key} className="flex flex-row items-center gap-8 ">
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

                <div className="flex flex-col">
                    <h className="font-500 text-md text-gray-800">
                        {tenant?.leases?.length ? "Unit " + tenant?.leases[0]?.unitId : "No Lease"}
                    </h>
                    <p className="font-300 text-gray-500 text-sm">
                        {tenant?.leases[0].endDate ? "Lease Ends on " + tenant?.leases[0]?.endDate : "No Lease End Date"}

                    </p>
                </div>

                <div>
                    <p className="text-gray-800 text-lg" hidden={!tenant?.phone}>
                        Phone: {tenant?.phone}
                    </p>
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-2 ">
            {tenants?.map((tenant, index) => {
                return <TenantRow key={index} tenant={tenant} />
            })}
        </div>
    )

}

export default DetailedTenantsTable;