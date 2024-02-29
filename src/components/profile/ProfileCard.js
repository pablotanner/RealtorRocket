import {Card,CardFooter,CardDescription,CardContent,CardTitle,CardHeader} from "../ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {Button} from "../ui/button.tsx";
import {SendIcon} from "lucide-react";

const ProfileCard = (props) => {

    return (
        <Card className="shadow-xl basis-[200px]">
            <CardHeader className="flex items-center">
                <Avatar className="w-32 h-32">
                    <AvatarImage src={props?.picture} alt="avatar" />
                    <AvatarFallback>
                        {((props?.firstName?.[0] || "") + ((props?.lastName?.[0]) || "")) || "?"}
                    </AvatarFallback>
                </Avatar>
                {props?.title}
                <CardTitle className="whitespace-nowrap w-[300px] text-center overflow-hidden overflow-ellipsis">
                    {props?.firstName} {props?.lastName}
                </CardTitle>
                {props?.company}
                <CardDescription className="text-blue-400 underline">
                    {props?.website}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="p-2 border-2 border-dotted border-gray-200 rounded-xl" hidden={!props?.bio || !props?.bio?.length}>
                    {props?.bio}
                </p>

            </CardContent>

            <CardFooter>
                <Button variant="gradient" size="md" className="pointer-events-none">
                    <SendIcon className="w-4 h-4 mr-2" />
                    Send a Message
                </Button>
            </CardFooter>
        </Card>
    )

}

export default ProfileCard;