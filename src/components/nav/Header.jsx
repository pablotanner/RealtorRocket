import {Select, SelectTrigger, SelectValue, SelectContent, SelectLabel, SelectGroup, SelectItem} from "../ui/select.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {MenuIcon} from "lucide-react";

const Header = ({title}) => {
    const userProfile = useSelector(state => state.authSlice.userInfo)

    return (
        <div className="border-b-gray-200 border-b-2 py-8">
        <div className="flex flex-row mb-4 justify-between items-center gap-x-2">
            <Select>
                <SelectTrigger className="w-[180px] bg-white">
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


            <div className="flex flex-row items-center cursor-pointer" onClick={() => toast.info("Open Profile")}>
                <Avatar>
                    <AvatarImage src={userProfile?.picture} alt="avatar" />
                    <AvatarFallback>
                        {(userProfile?.firstName?.[0] + userProfile?.lastName?.[0]) || "?"}
                    </AvatarFallback>
                </Avatar>
                <h className="hidden xs:flex items-center ml-2 font-500 whitespace-nowrap">
                    {userProfile?.firstName} {userProfile?.lastName}
                </h>
            </div>

            <MenuIcon className="hidden items-center w-6 h-6 cursor-pointer" onClick={() => toast.info("Open Menu")}/>

        </div>
            <h className="text-xl md:text-3xl font-500">
                {title}
            </h>
        </div>
    )
}

export default Header;