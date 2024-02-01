import {Card,CardFooter,CardDescription,CardContent,CardTitle,CardHeader} from "../ui/card.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {Button} from "../ui/button.tsx";
import {SendIcon} from "lucide-react";

const ProfileCard = ({ user }) => {
    return (
        <Card className="shadow-xl basis-[200px]">
            <CardHeader className="flex items-center">
                <Avatar className="w-32 h-32">
                    <AvatarImage src={user?.picture} alt="avatar" />
                    <AvatarFallback>
                        {((user?.firstName?.[0] || "") + ((user?.lastName?.[0]) || "")) || "?"}
                    </AvatarFallback>
                </Avatar>
                {user?.title}
                <CardTitle className="whitespace-nowrap w-[300px] text-center overflow-hidden overflow-ellipsis">
                    {user?.firstName} {user?.lastName}
                </CardTitle>
                {user?.company}
                <CardDescription className="text-blue-400 underline">
                    {user?.website}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {user?.bio}
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