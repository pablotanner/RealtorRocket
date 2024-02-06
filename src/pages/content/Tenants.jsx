import DetailedTenantsTable from "../../components/tenants/DetailedTenantsTable.js";
import {Button} from "../../components/ui/button.tsx";
import CreateTenant from "../../components/tenants/TenantCreation/CreateTenant.js";
import {UserRoundPlus} from "lucide-react";


const Tenants = (props) => {
    const {data} = props;



    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4 flex-wrap sm:flex-nowrap justify-between">
                This page will display the tenants of the user's rental properties, will be possible to filter by property (dropdown in header)
                <CreateTenant trigger={<Button variant="gradient"><UserRoundPlus className="w-4 h-4 mr-3"/> Create Tenant</Button>} />
            </div>

            <DetailedTenantsTable tenants={data.data} />
        </div>
    )
}

export default Tenants;