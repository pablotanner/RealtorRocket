import {Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectGroup, SelectItem} from "../ui/select.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {LogOutIcon, MenuIcon, SettingsIcon, UserRoundIcon} from "lucide-react";


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

const Header = () => {
    const userProfile = useSelector(state => state.authSlice.userInfo)
    const navigate = useNavigate();

    return (
        <div className="border-b-gray-100 border-b-2">
        <div className="flex flex-row mb-1 md:mb-3  justify-between items-center gap-x-2 p-2 md:p-4 bg-white rounded-lg">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Properties"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel className="font-600">Your Properties</SelectLabel>
                        <SelectItem value="All">
                            All Properties
                        </SelectItem>
                        <SelectItem value="Property 1">
                            Property 1
                            <span className="ml-2 text-xs bg-green-500 text-white w-5 h-5 rounded-lg p-1">
                                Rented
                            </span>
                        </SelectItem>
                        <SelectItem value="Property 2">
                            Property 2
                            <span className="ml-2 text-xs bg-red-500 text-white w-5 h-5 rounded-lg p-1">
                                Inactive
                            </span>
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>


            <DropdownMenu>
                <DropdownMenuTrigger className="flex flex-row items-center cursor-pointer bg-white hover:bg-gray-50 p-1 px-2 rounded-full">
                    <Avatar>
                        <AvatarImage src={userProfile?.picture} alt="avatar" />
                        <AvatarFallback>
                            {(userProfile?.firstName?.[0] + userProfile?.lastName?.[0]) || "?"}
                        </AvatarFallback>
                    </Avatar>
                    <h className="hidden xs:flex items-center ml-2 font-500 whitespace-nowrap">
                        {userProfile?.firstName} {userProfile?.lastName}
                    </h>
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

            <MenuIcon className="hidden items-center w-6 h-6 cursor-pointer" onClick={() => toast.info("Open Menu")}/>

        </div>
        </div>
    )
}

export default Header;