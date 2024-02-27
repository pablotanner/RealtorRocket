import {Card, CardHeader, CardTitle,CardContent,CardDescription} from "../../components/ui/card.tsx";
import InfoCard from "../../components/home/InfoCard.js";
import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import {useGetUnitsQuery} from "../../services/api/unitApi.js";
import {useGetTenantsQuery} from "../../services/api/tenantApi.js";
import {useGetUserQuery} from "../../services/api/userApi.js";
import {useSelector} from "react-redux";
import {selectFutureEvents} from "../../services/slices/eventSlice.js";
import {Bell, CalendarDays, Eye} from "lucide-react";
import {Button} from "../../components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const {data: properties} = useGetPropertiesQuery();

    const {data: units} = useGetUnitsQuery();

    const {data: tenants} = useGetTenantsQuery();

    const {data: user} = useGetUserQuery();

    const name = user?.data?.name;

    const futureEvents = useSelector(state => selectFutureEvents(state))




    const Notifications = () => {

        return (
            <div className="bg-white px-4 py-4 border-2 border-secondary rounded-lg flex-grow">
                <div className="text-lg font-500 mb-2 text-off-black flex flex-row gap-2 items-center">
                    <span className="rounded-full bg-white border-2 border-secondary flex items-center justify-center p-2">
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

        upcomingEvents.length = 3;


        return (
            <div className="bg-white px-4 py-4 border-2 border-secondary rounded-lg flex-grow">
                <div className="text-lg font-500 mb-2 text-off-black flex flex-row gap-2 items-center">
                    <span className="rounded-full bg-white border-2 border-secondary flex items-center justify-center p-2">
                        <CalendarDays className="w-6 h-6 text-off-black"/>
                    </span>
                    Your Next Events are
                </div>
                <ul className="flex flex-col gap-1 whitespace-nowrap">
                    {upcomingEvents.map((event, index) => {
                        return (
                            <li key={index} className="flex flex-row gap-2 ml-1">
                                -<div className="font-500">{event.title}: </div>
                                <div>{new Date(event.date).toLocaleDateString()}</div>
                            </li>
                        )
                    })}
                </ul>

                <Button
                    variant="outline"
                    onClick={() => navigate("/calendar")}
                    className="mt-4"
                >
                    <Eye className="mr-1 h-4 w-4"/>
                    View All
                </Button>
            </div>
        )
    }

    /*
    const [date, setDate] = useState(new Date());
    <DatePicker initialStartDate={date} onChange={(startDate) => setDate(startDate)}

    />

     */


    return (
        <div className="gap-8 flex flex-col">
            <h1>
                Welcome, {name}!
            </h1>


            <div className="flex flex-row justify-start gap-8 flex-wrap md:flex-nowrap">
                <div className="flex flex-col gap-4 flex-grow-0">
                    <div className="flex flex-row gap-4 flex-wrap">
                        <InfoCard title="Total Properties" number={properties?.data?.length} link="/properties"/>
                        <InfoCard title="Total Rental Units" number={units?.data?.length} link="/rentals"/>
                        <InfoCard title="Total Tenants" number={tenants?.data?.length} link="/tenants"/>
                        <InfoCard title="Maintenance Reports" number="0" link="/maintenance"/>
                    </div>

                    <div>
                        <div className="text-2xl font-500 mb-2">
                            Your Properties
                        </div>
                        <div className="flex flex-col md:flex-row w-full gap-8 flex-wrap">
                            <Card className="basis-[300px] flex-shrink flex-grow">
                                <CardHeader>
                                    <CardTitle>
                                        Most Expensive
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <img
                                        src="https://img.onmanorama.com/content/dam/mm/en/lifestyle/decor/images/2023/6/1/house-middleclass.jpg"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />

                                    <div className="text-lg font-300">
                                    <span className="text-xl font-500 mr-1">
                                        $4'500
                                    </span>
                                        /month
                                    </div>
                                    <CardDescription>
                                        4 Bed, 3 Bath
                                    </CardDescription>
                                </CardContent>
                            </Card>
                            <Card className="basis-[300px] flex-shrink flex-grow ">
                                <CardHeader>
                                    <CardTitle>
                                        Most Recent
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <img
                                        src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg"
                                        className="w-full h-48 object-cover rounded-lg"
                                    />

                                    <div className="text-lg font-300">
                                    <span className="text-xl font-500 mr-1">
                                        $2'750
                                    </span>
                                        /month
                                    </div>
                                    <CardDescription>
                                        2 Bed, 1 Bath
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                </div>

                <div className="h-full flex flex-row md:flex-col gap-4 flex-grow flex-wrap">
                    <UpcomingEvents />
                    <Notifications />
                </div>

            </div>




        </div>
    );
}

export default Home;