import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {useSelector} from "react-redux";
import {Compass, LogOutIcon, MenuIcon, SettingsIcon, UserRoundIcon} from "lucide-react";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu.tsx";
import {logoutUser} from "../../services/auth/authActions.js";
import {useNavigate} from "react-router-dom";
import PropertySelection from "./PropertySelection.js";

const Header = () => {
    const userProfile = useSelector(state => state.authSlice.userInfo)
    const navigate = useNavigate();

    return (
        <div className="flex flex-row mb-1 md:mb-3  justify-between items-center gap-x-2 p-2 md:p-4 bg-background-light rounded-lg border-2 border-border border-t-0">
            <PropertySelection/>

            <div className="flex flex-row gap-2 items-center">

                <div className="flex flex-row items-center gap-2 p-2 h-fit rounded-lg border border-border cursor-pointer hover:border-gray-200 text-foreground font-500"
                     onClick={() => navigate("/explorer")}
                >
                    <Compass className="h-5 w-5"/>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger className="flex flex-row items-center cursor-pointer bg-background-light hover:bg-secondary p-1 px-2 rounded-full">
                        <Avatar>
                            <AvatarImage src={userProfile?.picture} alt="avatar" />
                            <AvatarFallback>
                                {(userProfile?.firstName?.[0] + userProfile?.lastName?.[0]) || "?"}
                            </AvatarFallback>
                        </Avatar>
                        <p className="hidden xs:flex items-center text-foreground ml-2 font-500 whitespace-nowrap">
                            {userProfile?.firstName} {userProfile?.lastName}
                        </p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 mr-2 sm:mr-0">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => navigate("/account")}>
                                <UserRoundIcon className="mr-2 h-4 w-4"/>
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate("/settings")}>
                                <SettingsIcon className="mr-2 h-4 w-4"/>
                                Settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => logoutUser()}>
                                <LogOutIcon className="mr-2 h-4 w-4"/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>



        </div>
    )
}

export default Header;