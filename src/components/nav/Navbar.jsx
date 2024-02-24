import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip.tsx";
import {Button} from "../ui/button.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {BiSolidRocket} from "react-icons/bi";
import Header from "./Header.jsx";
import {
    BellIcon, Building2,
    BuildingIcon,
    CalendarIcon,
    CircleDollarSignIcon,
    DrillIcon,
    HomeIcon,
    UserIcon
} from "lucide-react";
import { useSelector} from "react-redux";
import {usePrefetch} from "../../services/api/authApi.js"

const items = [
    {
        title: 'Home',
        url: '/',
        label: 'Home Page',
        icon: <HomeIcon/>,
        section: "MENU"
    },
    {
        title: 'Properties',
        url: '/properties',
        label: 'Your Properties',
        icon: <Building2/>,
        section: "MENU"
    },
    {
        title: 'Rentals',
        url: '/rentals',
        label: 'Your Rental Properties',
        icon: <BuildingIcon/>,
        section: "MENU"
    },
    {
        title: 'Financials',
        url: '/financials',
        label: 'Your Financial Data',
        icon: <CircleDollarSignIcon/>,
        section: "MENU"
    },
    {
        title: 'Tenants',
        url: '/tenants',
        label: 'Your Tenants',
        icon: <UserIcon/>,
        section: "MENU"
    },
    {
        title: 'Maintenance',
        url: '/maintenance',
        label: 'Your Maintenance Reports',
        icon: <DrillIcon/>,
        section: "MENU"
    },
    {
        title: 'Notifications',
        url: '/notifications',
        label: 'Your Notifications',
        icon: <BellIcon/>,
        section: "PERSONAL"
    },
    {
        title: 'Calendar',
        url: '/calendar',
        label: 'Your Events and Appointments',
        icon: <CalendarIcon/>,
        section: "PERSONAL"
    }
]

// eslint-disable-next-line react/prop-types
const Navbar = ({children}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const authSlice = useSelector(state => state.authSlice);


    // use prefetch on user, properties API
    const prefetchProperties = usePrefetch("getProperties")
    const prefetchUser = usePrefetch("getUser")
    const prefetchUnits = usePrefetch("getUnits")
    const prefetchTenants = usePrefetch("getTenants")
    const prefetchLeases = usePrefetch("getLeases")
    const prefetchPayments = usePrefetch("getPayments")

    prefetchUser();
    prefetchProperties();
    prefetchUnits();
    prefetchTenants();
    prefetchLeases();
    prefetchPayments();

    function getNavItems(section) {
        return items.filter(item => item.section === section);
    }

    // If user is not logged in, but we are still waiting for the API (/user) to respond, show a loading spinner
    if (!authSlice.accessToken || !authSlice.userInfo) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin"></div>
            </div>
        )
    }
    // Different nav button variant depending on if the current page is active or not
    function getNavButtonVariant(url) {
        if (url === "/") {
            return location.pathname === url ? "nav-button-active" : "nav-button";
        }

        return location.pathname.includes(url) ? "nav-button-active" : "nav-button";
    }


    const NavBar = () => {
        return (
            <div
                className={"h-full flex flex-col justify-between z-10 border-r-2 border-secondary w-16 md:w-56 bg-white rounded-lg fixed "}
            >
                <div>
                    <h className="text-primary-dark font-700 flex flex-row justify-center md:justify-start items-center gap-x-1 pt-4 pb-2 ml-0 md:ml-4 md:pl-2 md:mr-2 text-lg whitespace-nowrap">
                        <BiSolidRocket className="w-6 h-6 flex justify-center"/>
                        <p className="hidden md:flex">Realtor Rocket</p>
                    </h>
                    <nav
                        className="hidden md:flex flex-col mt-5 gap-y-2">
                        <p className="text-muted-foreground font-500 mx-2 uppercase">
                            MENU
                        </p>
                        <div className="flex flex-col gap-2">
                            {getNavItems("MENU").map((item, index) => (<Tooltip key={index}>
                                    <TooltipTrigger className="flex items-center">
                                        <Button variant={getNavButtonVariant(item.url)} className="w-full justify-start mx-2 flex gap-2" key={index}
                                                onClick={() => navigate(item.url)}>
                                            {item.icon}
                                            {item.title}
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent  side="right" className="flex gap-5">
                                        <h className="font-500">{item.title}</h>
                                        {item.label}
                                    </TooltipContent>
                                </Tooltip>)
                            )}

                        </div>
                        <p className="text-muted-foreground font-500 mx-2 mt-2 uppercase">
                            PERSONAL
                        </p>
                        {getNavItems("PERSONAL").map((item, index) => (<Tooltip key={index}>
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
                    </nav>

                    <nav className="md:hidden flex flex-col justify-center items-center gap-y-1">
                        {items.map((item, index) => (
                            <Button key={index} variant={getNavButtonVariant(item.url)} size="icon"
                                    className="justify-center items-center"
                                    onClick={() => navigate(item.url)}>
                                {item.icon}
                            </Button>
                        ))}

                    </nav>
                </div>

            </div>
        )
    }

    return (
        <div className="flex min-w-[375px]">
            <NavBar/>
            <main className={"pl-[4.25rem] md:pl-[14.75rem] min-h-screen w-full"}>
                <Header/>
                <div className="p-4 bg-white rounded-lg border-secondary border-2">
                    {children}
                </div>
            </main>
        </div>)
}

export default Navbar;