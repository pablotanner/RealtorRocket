import {Button} from "../../components/ui/button.tsx";
import CreateTenant from "../../components/tenants/TenantCreation/CreateTenant.js";
import {UserRoundPlus} from "lucide-react";
import {selectTenantsByPropertyId} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";
import TenantTable from "../../components/tenants/TenantTable.tsx";


const Tenants = (props) => {
    const {propertySelection} = props;

    const tenants = useSelector(state => selectTenantsByPropertyId(state,propertySelection))


    return (
        <div className="flex flex-col">
            <h1>
                Tenants
            </h1>
            <div className="flex flex-row items-center gap-4 flex-wrap sm:flex-nowrap justify-between">
                The table below shows all your tenants. To view a tenant's profile page, click on their profile picture.
                <CreateTenant trigger={<Button variant="gradient"><UserRoundPlus className="w-4 h-4 mr-3"/> Create Tenant</Button>} />
            </div>

            <TenantTable tenants={tenants} />

        </div>
    )
}

export default Tenants;