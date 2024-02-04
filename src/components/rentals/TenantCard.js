import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {Avatar, AvatarFallback} from "../ui/avatar.tsx";
import {Button} from "../ui/button.tsx";


const TenantCard = ({ tenant }) => {


    return (
        <Card className="shadow-lg basis-[400px]">
            <CardHeader className="flex flex-col items-center gap-2">
                <CardTitle>
                    Current Tenant
                </CardTitle>
                <Avatar className="w-32 h-32">
                    <img src={tenant?.profilePic} alt={tenant?.name}/>
                    <AvatarFallback className="text-2xl">
                        JD
                    </AvatarFallback>
                </Avatar>
                Started on 12nd of May 2021
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
                    Last Payment: 12nd of May 2021
                </div>



            </CardContent>

        </Card>
    )

}

export default TenantCard;