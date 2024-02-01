
import {Badge} from "../ui/badge.tsx";

const PropertyStatus = (props) => {

    const statusVariant = () => {
        switch(props?.status) {
            case "ACTIVE":
                return "positive"
            case "INACTIVE":
                return "negative"
            case "RENTED":
                return "positive"
            case "SOLD":
                return "pink"
            case "PENDING":
                return "warning"
            case "OFFER":
                return "warning"
            case "MAINTENANCE":
                return "warning"
            default:
                return "neutral"
        }
    }

    const lowerCaseStatus = props?.status?.toLowerCase() || "unknown"


    return (
        <Badge variant={statusVariant().toString()} {...props}>
            {lowerCaseStatus}
        </Badge>
    )
}

export default PropertyStatus;