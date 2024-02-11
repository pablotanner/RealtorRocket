import {Card, CardHeader, CardTitle,CardContent,CardDescription} from "../../components/ui/card.tsx";
import InfoCard from "../../components/home/InfoCard.js";
import {useGetPropertiesQuery} from "../../services/api/propertyApi.js";
import {useGetUnitsQuery} from "../../services/api/unitApi.js";
import {useGetTenantsQuery} from "../../services/api/tenantApi.js";
import {useGetUserQuery} from "../../services/api/userApi.js";

const Home = () => {

    const {data: properties} = useGetPropertiesQuery();

    const {data: units} = useGetUnitsQuery();

    const {data: tenants} = useGetTenantsQuery();

    const {data: user} = useGetUserQuery();

    const name = user?.data?.name;

    return (
        <div className="gap-8 flex flex-col">
            <h1>
                Welcome, {name}!
            </h1>
              <div className="flex flex-row gap-4 flex-wrap">
                  <InfoCard title="Total Properties" number={properties?.data?.length} link="/properties"/>
                  <InfoCard title="Total Rental Units" number={units?.data?.length} link="/rentals"/>
                  <InfoCard title="Total Tenants" number={tenants?.data?.length} link="/tenants"/>
                  <InfoCard title="Maintenance Reports" number="0" link="/maintenance"/>
              </div>

              <div>
                  mock data:
                  <div className="text-2xl font-500 mb-2">
                      Your Properties
                  </div>
                  <div className="flex flex-col md:flex-row w-full gap-8">
                      <Card className="w-full min-w-fit">
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
                      <Card className="w-full min-w-fit">
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
    );
}

export default Home;