import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip.tsx";
import {Button} from "../ui/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {BiSolidRocket} from "react-icons/bi";
import {useGetUserQuery} from "../../services/api/userApi.js";
import Header from "./Header.jsx";
import {BellIcon, BuildingIcon, CircleDollarSignIcon, DrillIcon, HomeIcon, LogOutIcon, UserIcon} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../services/auth/authSlice.js";
import {logoutUser} from "../../services/auth/authActions.js";

const items = [
    {
        title: 'Home',
        url: '/',
        label: 'Home Page',
        icon: <HomeIcon/>
    },
    {
        title: 'Properties',
        url: '/properties',
        label: 'Your Properties',
        icon: <BuildingIcon/>
    },
    {
        title: 'Financials',
        url: '/financials',
        label: 'Your Financial Data',
        icon: <CircleDollarSignIcon/>
    },
    {
        title: 'Tenants',
        url: '/tenants',
        label: 'Your Tenants',
        icon: <UserIcon/>
    },
    {
        title: 'Maintenance',
        url: '/maintenance',
        label: 'Your Maintenance Reports',
        icon: <DrillIcon/>
    },
    {
        title: 'Notifications',
        url: '/notifications',
        label: 'Your Notifications',
        icon: <BellIcon/>
    }
]

// eslint-disable-next-line react/prop-types
const Navbar = ({children}) => {
    const location = useLocation();

    const currentPage = items.find(item => item.url === location.pathname)?.title || "";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authSlice.accessToken);

    const isMobile = window.innerWidth < 768;

    //const background = "bg-gradient-to-br from-cyan-300 from-10% via-teal-500 via-20% to-violet-300 via-40% to-pink-500 via-60% to-fuchsia-500 via-70% to-sky-500 to-90%";

    //const interfaceBackground = " bg-white bg-opacity-80 backdrop-blur-3xl";


    const {data, isLoading} = useGetUserQuery();

    if (data?.data) {
        dispatch(setUser(data?.data))
    }

    if (isLoading || !isLoggedIn) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
            </div>
        )
    }
    function getNavButtonVariant(url) {
        return location.pathname === url ? "nav-button-active" : "nav-button";
    }

    return (<div className={"flex ml-1"}>
            <div
                data-collapsed={isMobile}
                className={"min-h-screen flex flex-col justify-between z-50 border-r-2 border-gray-100 w-14 sm:w-16 md:w-56 bg-white rounded-lg"}
            >
                <div>
                <h className="font-700 flex flex-row justify-center md:justify-start items-center gap-x-1 py-4 md:pl-2 md:mr-2 text-lg whitespace-nowrap">
                    <BiSolidRocket className="w-6 h-6 flex justify-center"/>
                    <p className="hidden md:flex">Realtor Rocket</p>
                </h>
                    <nav
                        className="hidden md:flex flex-col mt-5 gap-y-2">
                        <p className="text-muted-foreground font-500 mx-2 uppercase">
                            MENU
                        </p>
                        <div className="flex flex-col gap-2">
                            {items.map((item, index) => (<Tooltip key={index}>
                                    <TooltipTrigger className="flex items-center">
                                        <Button variant={getNavButtonVariant(item.url)} className="w-full justify-start mx-2 flex gap-2" key={index}
                                                onClick={() => navigate(item.url)}>
                                            {item.icon}
                                            {item.title}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" className="flex gap-5">
                                        <h className="font-500">{item.title}</h>
                                        {item.label}
                                    </TooltipContent>
                                </Tooltip>)
                            )}

                        </div>

                    </nav>

                    <nav className="md:hidden flex flex-col justify-center items-center">
                        {items.map((item, index) => (
                                <Button key={index} variant={getNavButtonVariant(item.url)} size="icon"
                                        className="justify-center items-center"
                                        onClick={() => navigate(item.url)}>
                                    {item.icon}
                                </Button>
                            ))}

                    </nav>
                </div>
                <Button variant="destructive" className="m-2 md:m-5" onClick={() => logoutUser()}>
                    <span className="hidden md:flex">
                        Logout
                    </span>
                    <span className="md:hidden justify-center">
                        <LogOutIcon/>
                    </span>
                </Button>
            </div>
            <div className={"w-full overflow-auto pr-2 ml-2 md:ml-5 xl:pr-14 flex flex-col gap-y-4"}>
                <Header/>
                <div className="p-4 bg-white rounded-lg">
                    <h className="text-xl md:text-3xl font-500">
                        {currentPage}
                    </h>
                    <div className="h-full">
                        {children}
                    </div>

                </div>

            </div>
        </div>)
}

export default Navbar;