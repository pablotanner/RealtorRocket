import {Button} from "../../components/ui/button.tsx";
import {Plus, UserRoundPlus} from "lucide-react";
import {selectTenantsByPropertyId} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";
import TenantTable from "../../components/tenants/TenantTable.tsx";
import {useNavigate} from "react-router-dom";


const Tenants = (props) => {
    const {propertySelection} = props;

    const navigate = useNavigate()

    const tenants = useSelector(state => selectTenantsByPropertyId(state,propertySelection))


    return (
        <div className="flex flex-col">
            <h1>
                Tenants
            </h1>

            <div className="flex flex-row items-center gap-4 flex-wrap sm:flex-nowrap justify-between sm:-mt-2">
                The table below shows all your tenants. To view a tenant's profile page, click on their profile picture.

                <Button variant="gradient" className="w-fit"
                        onClick={() => navigate("/tenants/create")}
                >
                    <Plus size={24} className="mr-2"/>
                    Create Tenant
                </Button>
            </div>

            <TenantTable tenants={tenants} />

        </div>
    )
}

export default Tenants;