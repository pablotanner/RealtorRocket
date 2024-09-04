import {Card, CardHeader, CardTitle,CardContent,CardDescription} from "../../components/ui/card.tsx";
import InfoCard from "../../components/home/InfoCard.js";
import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import {useGetUnitsQuery} from "../../services/api/unitApi.js";
import {useGetTenantsQuery} from "../../services/api/tenantApi.js";
import {useGetUserQuery} from "../../services/api/userApi.js";
import {useSelector} from "react-redux";
import {selectFutureEvents} from "../../services/slices/eventSlice.js";
import {
    Banknote,
    Bell,
    Building2,
    BuildingIcon,
    CalendarDays, CoinsIcon,
    DrillIcon, ExternalLink,
    Eye,
    LinkIcon,
    Scroll,
    UserIcon
} from "lucide-react";
import {Button} from "../../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useGetPaymentsQuery} from "../../services/api/financialsApi.js";
import {Avatar, AvatarFallback, AvatarImage} from "../../components/ui/avatar.tsx";
import {dateParser} from "../../utils/formatters.js";
import {PiHandCoins} from "react-icons/pi";
import DetailedPropertyTable from "../../components/properties/DetailedPropertyTable.js";

const Home = () => {
    const navigate = useNavigate();

    const {data: properties} = useGetPropertiesQuery();

    const {data: units} = useGetUnitsQuery();

    const {data: tenants} = useGetTenantsQuery();

    const {data: user} = useGetUserQuery();

    const {data: payments} = useGetPaymentsQuery();

    const name = user?.data?.firstName;

    const futureEvents = useSelector(state => selectFutureEvents(state))




    const Notifications = () => {

        return (
            <div className="bg-white px-4 py-4 border-2 border-border rounded-lg flex-grow">
                <div className="text-lg font-500 mb-2 text-off-black flex flex-row gap-2 items-center">
                    <span className="rounded-full bg-white border-2 border-border flex items-center justify-center p-2">
                        <Bell className="w-6 h-6 text-off-black"/>
                    </span>
                    Your Notifications
                </div>

                <div>
                    You have no new notifications
                </div>


                <Button
                    variant="outline"
                    onClick={() => navigate("/notifications")}
                    className="mt-4"
                    disabled
                >
                    <Eye className="mr-1 h-4 w-4"/>
                    View All
                </Button>
            </div>
        )
    }

    const UpcomingEvents = () => {

        const upcomingEvents = [...futureEvents];

        const icons = {
            "lease": <Scroll className="w-4 h-4"/>,
            "rent": <PiHandCoins className="w-4 h-4"/>,
            "payment": <Banknote className="w-4 h-4"/>
        }

        upcomingEvents.length = 3;

        return (
            <div className="flex flex-col justify-between gap-1">
                <p className="text-foreground font-400 text-sm">
                    Upcoming Events
                </p>
                {upcomingEvents?.map((event, index) => {
                    return (
                        <div key={index} className="flex flex-row items-center gap-2">
                            <div className="p-2 bg-muted text-muted-foreground rounded-full border-2 border-border flex items-center justify-center">
                                {icons[event?.category?.toLowerCase()]}
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground font-400">
                                    {event?.title}
                                </p>
                                <p  className="text-sm text-muted-foreground font-300">
                                    {dateParser(event?.date)}
                                </p>

                            </div>
                        </div>
                    )
                })}
                <Button size="sm" variant="outline"
                        onClick={() => navigate("/calendar")}
                >
                    <ExternalLink className="mr-1 h-4 w-4"/>
                    View All
                </Button>

            </div>
        )
    }


    const MostRecentTenants = () => {
        const mostRecentTenants = tenants?.data?.slice(0, 5);

        return (
            <div className="flex flex-col gap-2 whitespace-nowrap">
                <p className="text-foreground font-400 text-sm">
                    Newest Tenants
                </p>
                {
                    mostRecentTenants?.length === 0 && (
                        <div className="text-sm">
                            You have no tenants yet
                        </div>
                    )
                }
                {mostRecentTenants?.map((tenant, index) => {
                    return (
                        <div key={index} className="flex flex-row items-center gap-2 hover:bg-secondary/40 p-1 rounded-sm select-none cursor-pointer"
                             onClick={() => navigate(`/tenants/${tenant?.id}`)}
                        >
                            <Avatar className="w-8 h-8 rounded-full">
                                <AvatarImage src={tenant?.profileImageUrl} alt="Tenant" className="rounded-none" />
                                <AvatarFallback className=" text-sm" >
                                    {tenant?.firstName.charAt(0)}{tenant?.lastName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>

                            <div>
                                <p className="text-sm text-muted-foreground font-500">
                                    {tenant?.firstName} {tenant?.lastName}
                                </p>
                                <p  className="text-sm text-muted-foreground font-300">
                                    Created on {dateParser(tenant?.createdAt)}
                                </p>

                            </div>
                        </div>
                    )
                })}

            </div>
        )
    }


    return (
        <div className="flex flex-col">
            <h1>
                Welcome, {name}!
            </h1>

            <p className="text-gray-500">
                Track, manage and grow your real estate business.
            </p>


            <div className="flex flex-row justify-start gap-8 flex-wrap md:flex-nowrap mt-8">
                <div className="flex flex-col gap-4 w-full overflow-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                        <InfoCard
                            title="Total Properties"
                            number={properties?.data?.length}
                            link="/properties"
                        >
                            <div className="p-2 border border-border rounded-lg shadow-sm">
                                <Building2 className="w-5 h-5"/>
                            </div>
                        </InfoCard>
                        <InfoCard
                            title="Total Units"
                            number={units?.data?.length}
                            link="/rentals"
                        >
                            <div className="p-2 border border-border rounded-lg shadow-sm">
                                <BuildingIcon className="w-5 h-5"/>
                            </div>
                        </InfoCard>
                        <InfoCard
                            title="Total Tenants"
                            number={tenants?.data?.length}
                            link="/tenants"
                        >
                            <div className="p-2 border border-border rounded-lg shadow-sm">
                                <UserIcon className="w-5 h-5"/>
                            </div>
                        </InfoCard>
                        <InfoCard
                            title="Payments"
                            number={payments?.data?.length}
                            link="/financials"
                        >
                            <div className="p-2 border border-border rounded-lg shadow-sm">
                                <CoinsIcon className="w-5 h-5"/>
                            </div>
                        </InfoCard>

                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-muted-foreground font-500 text-lg md:text-md">
                                Quick Actions
                            </h3>
                            <div className="w-full h-[2px] bg-secondary"/>
                            <div className="flex flex-row flex-wrap gap-x-6 gap-y-2">
                                <div className="flex flex-row gap-2 items-center flex-grow bg-background-light border-2 border-border p-3 rounded-lg hover:bg-secondary select-none cursor-pointer"
                                     onClick={() => navigate(`/properties/create`)}

                                >
                                    <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                                        <Building2 className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <p className="font-500 text-foreground">
                                            Create new Property
                                        </p>
                                        <p  className="font-400 text-muted-foreground text-sm">
                                            Add a new property including units
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center flex-grow bg-background-light border-2 border-border p-3 rounded-lg hover:bg-secondary select-none cursor-pointer"
                                     onClick={() => navigate(`/tenants/create`)}

                                >
                                    <div className="p-2 rounded-lg bg-primary text-primary-foreground">
                                        <UserIcon className="w-5 h-5"/>
                                    </div>
                                    <div>
                                        <p className="font-500 text-foreground">
                                            Create new Tenant
                                        </p>
                                        <p  className="font-400 text-muted-foreground text-sm">
                                            Add a new tenant to a unit
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className="flex flex-col gap-3">
                            <h3 className="text-muted-foreground font-500 text-lg md:text-md">
                                Your Properties
                            </h3>
                            <div className="w-full h-[2px] bg-secondary"/>
                            <DetailedPropertyTable properties={properties?.data} />

                        </div>

                    </div>
                </div>

                <div className="w-full h-[2px] bg-border sm:hidden"/>


                <div className="h-full flex flex-row md:flex-col justify-between gap-4 flex-grow flex-wrap ">
                    <MostRecentTenants />
                    <div className="w-full h-[2px] bg-secondary hidden md:flex"/>
                    <UpcomingEvents/>
                </div>

            </div>




        </div>
    );
}

export default Home;