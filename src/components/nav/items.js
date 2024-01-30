import {BellIcon, BuildingIcon, CircleDollarSignIcon, HomeIcon} from "lucide-react";


export const items = [
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