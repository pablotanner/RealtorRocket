import {Button} from "../ui/button.js";
import {LinkIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectObjectById} from "../../services/slices/objectSlice.js";
import {Tenant} from "../../utils/classes.ts";

function getTenantName(tenant: Tenant) {
    if (!tenant || !tenant.firstName || !tenant.lastName) return null;
    return `${tenant.firstName} ${tenant.lastName}`;
}

const Link = ({type, id, ...props}) => {
    const navigate = useNavigate();

    let label: string, link: string;
    // @ts-expect-error we are handling this input in slice
    const object = useSelector((state) => selectObjectById(state, id, type));


    switch (type) {
        case "unit":
            label = object?.unitIdentifier || `Unit ${id}`;
            link = `/rentals/${id}`;
            break;
        case "tenant":
            label = getTenantName(object) || `Tenant ${id}`;
            link = `/tenants/${id}`;
            break;
        case "lease":
            label = `Lease ${id}`;
            link = `/leases/${id}`;
            break;
        case "property":
            label = object?.title || `Property ${id}`;
            link = `/properties/${id}`;
            break;
        default:
            label = `#${id}`;
            link = "";
    }

    return (
        <Button
            className="pl-0 text-foreground group"
            variant="link"
            onClick={() => navigate(link)}
        >
            <LinkIcon className="w-4 h-4 mr-1 transform transition-transform duration-300 group-hover:rotate-[180deg]" />
            {label}
        </Button>
    )
}


export default Link;