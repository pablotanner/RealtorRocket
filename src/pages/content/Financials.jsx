import LeasesTable from "../../components/financials/LeasesTable.tsx";
import {useSelector} from "react-redux";
import {selectLeasesByPropertyId} from "../../services/slices/objectSlice.js";
import InfoCard from "../../components/home/InfoCard.js";
import {isAfter} from "date-fns";
import {moneyParser} from "../../utils/formatters.js";
import PaymentScheduleTable from "../../components/financials/PaymentScheduleTable.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";


const Financials = (props) => {
    const {propertySelection} = props;

    const leases = useSelector(state => selectLeasesByPropertyId(state, propertySelection));

    const rentDue = leases.reduce((acc, lease) => {
        return acc + lease?.rentalPrice || 0;
    }, 0);

    const rentPaid = leases.reduce((acc, lease) => {
        return acc + lease?.rentPaid || 0;
    }, 0);

    const activeLeases = leases.filter(lease =>{
        return  isAfter(new Date(lease.endDate), new Date()) || !lease.endDate;
    }).length;

    const paymentSchedules = leases.reduce((acc, lease) => {
        return acc.concat(lease.paymentSchedule);
    }, []);


    return (
        <>
            <h1>
                Financials
            </h1>

            <div className="flex flex-col gap-4">
                These are your leases.

                <div className="flex flex-row flex-wrap gap-4">
                    <InfoCard title="Rent Due (this month)" number={moneyParser(rentDue)}  />
                    <InfoCard title="Rent Paid (this month)" number={moneyParser(rentPaid)}  />
                    <InfoCard title="Active Leases" number={activeLeases}   />
                </div>
                
                <Tabs defaultValue="paymentSchedule">
                    <TabsList>
                        <TabsTrigger value="paymentSchedule">
                            Planned Payments
                        </TabsTrigger>
                        <TabsTrigger value="leases">
                            Leases
                        </TabsTrigger>
                        <TabsTrigger value="payments">
                            Payments
                        </TabsTrigger>
                        <TabsTrigger value="expenses">
                            Expenses
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="paymentSchedule">
                        <PaymentScheduleTable paymentSchedules={paymentSchedules} />
                    </TabsContent>

                    <TabsContent value="leases">
                        <LeasesTable leases={leases} />
                    </TabsContent>

                    <TabsContent value="payments">
                        This tab will keep track of your payments and user submitted payments waiting to be accepted
                    </TabsContent>

                    <TabsContent value="expenses">
                        This tab will show your expenses
                    </TabsContent>
                </Tabs>
                




            </div>
        </>

    )
}

export default Financials;