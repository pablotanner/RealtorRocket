import DetailedTenantsTable from "../../components/tenants/DetailedTenantsTable.js";
import {Button} from "../../components/ui/button.tsx";


const Tenants = (props) => {
    const {data} = props;



    return (
        <div>
            This page will display the tenants of the user's rental properties, will be possible to filter by property (dropdown in header)
            <Button>
                Add Tenant
            </Button>
            <DetailedTenantsTable tenants={data.data} />
        </div>
    )
}

export default Tenants;