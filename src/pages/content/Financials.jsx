import LeasesTable from "../../components/financials/LeasesTable.tsx";
import {useSelector} from "react-redux";
import {selectLeasesByPropertyId, selectPaymentsByPropertyId} from "../../services/slices/objectSlice.js";
import InfoCard from "../../components/home/InfoCard.js";
import {isAfter} from "date-fns";
import {moneyParser} from "../../utils/formatters.js";
import PaymentScheduleTable from "../../components/financials/PaymentScheduleTable.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";
import PaymentTable from "../../components/financials/PaymentTable.tsx";
import {useGetPaymentsQuery} from "../../services/api/financialsApi.js";
import {Button} from "../../components/ui/button.tsx";
import {FilePlus2} from "lucide-react";
import AddPayment from "../../components/payments/AddPayment.js";
import {useState} from "react";


const Financials = (props) => {
    const {propertySelection} = props;

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const leases = useSelector(state => selectLeasesByPropertyId(state, propertySelection));

    const payments = useSelector(state => selectPaymentsByPropertyId(state, propertySelection))

    const paymentSchedules = leases.reduce((acc, lease) => {
        return acc.concat(lease.paymentSchedule);
    }, []);


    const rentDue = paymentSchedules.reduce((acc, scheduledPayment) => {
        if (scheduledPayment.status !== "PAID") {
            return acc + scheduledPayment?.amountDue || 0;
        }
    }, 0) || 0;

    const rentPaid = payments.reduce((acc, payment) => {
        if (payment.status === "PAID") {
            return acc + payment?.amount || 0;
        }
    }, 0) || 0;

    const activeLeases = leases.filter(lease =>{
        return  isAfter(new Date(lease.endDate), new Date()) || !lease.endDate;
    }).length;




    return (
        <>
            <h1>
                Financials
            </h1>

            <div className="flex flex-col gap-4">
                This page offers an overview of the financials for either a single property or all properties, depending on your selection.

                <div className="flex flex-row flex-wrap gap-4">
                    <InfoCard title="Rent Due (this month)" number={moneyParser(rentDue)}  />
                    <InfoCard title="Rent Paid" number={moneyParser(rentPaid)}  />
                    <InfoCard title="Active Leases" number={activeLeases}   />
                </div>
                
                <Tabs defaultValue="payments" className="overflow-auto">
                    <TabsList>
                        <TabsTrigger value="payments">
                        Payments
                        </TabsTrigger>

                        <TabsTrigger value="paymentSchedule">
                            Planned Payments
                        </TabsTrigger>

                        <TabsTrigger value="leases">
                            Leases
                        </TabsTrigger>

                        <TabsTrigger value="expenses">
                            Expenses
                        </TabsTrigger>

                    </TabsList>

                    <TabsContent value="payments">
                        <PaymentTable payments={payments}>
                            <AddPayment
                                open={showPaymentModal}
                                onOpenChange={() => setShowPaymentModal(!showPaymentModal)}

                            >
                                <Button className="self-end justify-end" variant="outline" type="button">
                                    <FilePlus2 className="w-4 h-4 mr-2" />
                                    Add Payment
                                </Button>
                            </AddPayment>
                        </PaymentTable>
                    </TabsContent>

                    <TabsContent value="paymentSchedule">
                        <PaymentScheduleTable paymentSchedules={paymentSchedules} />
                    </TabsContent>

                    <TabsContent value="leases">
                        <LeasesTable leases={leases} />
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