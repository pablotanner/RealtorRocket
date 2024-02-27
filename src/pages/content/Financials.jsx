import LeasesTable from "../../components/financials/LeasesTable.tsx";
import {useSelector} from "react-redux";
import {selectLeasesByPropertyId, selectPaymentsByPropertyId} from "../../services/slices/objectSlice.js";
import InfoCard from "../../components/home/InfoCard.js";
import {isAfter} from "date-fns";
import {moneyParser} from "../../utils/formatters.js";
import PaymentScheduleTable from "../../components/financials/PaymentScheduleTable.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs.tsx";
import PaymentTable from "../../components/financials/PaymentTable.tsx";
import {Button} from "../../components/ui/button.tsx";
import {FilePlus2} from "lucide-react";
import AddPayment from "../../components/payments/AddPayment.js";
import {useState} from "react";


const Financials = (props) => {
    const {propertySelection} = props;

    const [currentTab, setCurrentTab] = useState(0);

    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const leases = useSelector(state => selectLeasesByPropertyId(state, propertySelection));

    const payments = useSelector(state => selectPaymentsByPropertyId(state, propertySelection))
        .map((payment) => {
            return {
                ...payment,
                lease: leases.find(lease => lease.id === payment.leaseId)
            }
        })

    const paymentSchedules = leases.reduce((acc, lease) => {
        return acc.concat(lease.paymentSchedule);
    }, []).map(schedule => {
        return {
            ...schedule,
            lease: leases.find(lease => lease.id === schedule.leaseId)
        }
    })



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


    const Tabs = [
        {
            title: "Payments",
            content: (
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
            ),
            count: payments?.length
        },
        {
            title: "Payment Schedule",
            content: <PaymentScheduleTable paymentSchedules={paymentSchedules} />,
            count: paymentSchedules?.length
        },
        {
            title: "Leases",
            content: <LeasesTable leases={leases} />,
            count: leases?.length
        },
        {
            title: "Expenses",
            content: "This tab will show your expenses",
            count: 0
        }
    ]


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

                <div className="flex flex-row overflow-auto">
                    {Tabs.map((tab, index) => {
                        return (
                            <div
                                data-active={currentTab === index}
                                className="flex gap-2 items-center cursor-pointer rounded-t-md text-gray-600 font-500 px-4 py-2 border-b-2 border-transparent
                                hover:border-gray-700
                                transition-colors data-[active='true']:border-gray-700 data-[active='true']:text-gray-800
                                hover:bg-secondary

                                "
                                key={index}
                                onClick={() => setCurrentTab(index)}
                            >
                                {tab.title}
                                <div className="p-1 rounded-lg shadow-sm text-xs bg-white w-7 h-7 flex items-center justify-center border border-secondary ">
                                    {tab.count}
                                </div>
                            </div>
                        )
                    })}
                </div>


                {Tabs[currentTab].content}




            </div>
        </>

    )
}

export default Financials;