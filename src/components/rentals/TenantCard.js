import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {Avatar, AvatarFallback} from "../ui/avatar.tsx";
import {Button} from "../ui/button.tsx";
import {dateParser} from "../../utils/formatters.js";


const TenantCard = ({ tenant, lease }) => {

    if (!tenant) {
        return null;
    }

    return (
        <Card className="shadow-lg basis-[400px] flex-grow">
            <CardHeader className="flex flex-col items-center gap-2">
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
                Started on {dateParser(lease?.startDate) || "N/A"}
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
                <div className="flex flex-row gap-2">
                    <Button
                        variant="light"
                    >
                        View Profile
                    </Button>
                    <Button
                        variant="gradient"
                    >
                        Send Message
                    </Button>
                </div>

                <div>
                    Last Payment on: {dateParser(lease?.lastPaymentDate) || "N/A"}
                </div>



            </CardContent>

        </Card>
    )

}

export default TenantCard;