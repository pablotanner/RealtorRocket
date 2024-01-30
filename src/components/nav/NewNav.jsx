import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip.tsx";
import {Button} from "../ui/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {BiSolidRocket} from "react-icons/bi";
import {useGetUserQuery} from "../../services/api/userApi.js";
import Header from "./Header.jsx";
import {BellIcon, BuildingIcon, CircleDollarSignIcon, HomeIcon} from "lucide-react";
import {useDispatch} from "react-redux";
import {setUser} from "../../services/auth/authSlice.js";
import {logoutUser} from "../../services/auth/authActions.js";

const items = [
    {
        title: 'Home',
        url: '/',
        label: 'Home',
        icon: <HomeIcon/>
    },
    {
        title: 'Properties',
        url: '/properties',
        label: 'Properties',
        icon: <BuildingIcon/>
    },
    {
        title: 'Financials',
        url: '/financials',
        label: 'Financials',
        icon: <CircleDollarSignIcon/>
    },
    {
        title: 'Notifications',
        url: '/notifications',
        label: 'Notifications',
        icon: <BellIcon/>
    }
]

const NewNav = ({children}) => {
    const location = useLocation();


    const currentPage = items.find(item => item.url === location.pathname)?.title || "";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isMobile = window.innerWidth < 768;

    const {data, isLoading} = useGetUserQuery()

    if (data?.data) {
        dispatch(setUser(data?.data))
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
            </div>
        )
    }
    function getNavButtonVariant(url) {
        return location.pathname === url ? "nav-button-active" : "nav-button";
    }

    return (<div className="flex">
            <div
                data-collapsed={isMobile}
                className="min-h-screen flex flex-col justify-between z-50 border-r-2 border-gray-200 w-56"
            >
                <div>
                <h className="font-700 flex flex-row justify-start items-center gap-x-1 py-4 pl-2 mr-2 text-lg whitespace-nowrap ">
                    <BiSolidRocket/>
                    <p>Realtor Rocket</p>
                </h>
                    <nav
                        className="flex flex-col gap-1  group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                        {/* eslint-disable-next-line react/prop-types */}
                        {items.map((item, index) => isMobile ? (<Tooltip key={index}>
                                <TooltipTrigger>
                                    <Button variant={getNavButtonVariant(item.url)} size="icon"
                                            onClick={() => navigate(item.url)}>
                                        {item.icon}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="flex items-center gap-4">
                                    {item.title}
                                    {item.label && (<span className=" text-muted-foreground">
                                            {item.label}
                                        </span>)}
                                </TooltipContent>
                            </Tooltip>) : (
                            <Button variant={getNavButtonVariant(item.url)} className="mx-2 gap-x-2 px-1 pl-2" key={index}
                                    onClick={() => navigate(item.url)}>
                                {item.icon}
                                {item.title}
                            </Button>))}
                    </nav>
                </div>
                <Button variant="gradient" className="m-5" onClick={() => logoutUser()}>
                    Logout
                </Button>
            </div>
            <div className="w-full">
                <Header title={currentPage}/>
                <div className="py-4 px-8">
                    {children}
                </div>
            </div>
        </div>)
}

export default NewNav;