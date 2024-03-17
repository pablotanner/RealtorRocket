import LeasesTable from "../../components/financials/LeasesTable.tsx";
import {useSelector} from "react-redux";
import {
    selectExpensesByPropertyId,
    selectLeasesByPropertyId,
    selectPaymentsByPropertyId
} from "../../services/slices/objectSlice.js";
import InfoCard from "../../components/home/InfoCard.js";
import {isAfter} from "date-fns";
import {moneyParser} from "../../utils/formatters.js";
import PaymentScheduleTable from "../../components/financials/PaymentScheduleTable.tsx";
import PaymentTable from "../../components/financials/PaymentTable.tsx";
import {Button} from "../../components/ui/button.tsx";
import {FilePlus2} from "lucide-react";
import AddPayment from "../../components/payments/AddPayment.js";
import {useState} from "react";
import {Tabs, TabsContent, TabsItem, TabsList} from "../../components/ui/tabs-new.tsx";
import ExpensesTable from "../../components/financials/ExpensesTable.tsx";
import AddExpense from "../../components/expenses/AddExpense.js";


const Financials = (props) => {
    const {propertySelection} = props;


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

    const expenses = useSelector(state => selectExpensesByPropertyId(state, propertySelection));



    const rentDue = paymentSchedules.reduce((acc, scheduledPayment) => {
        if (scheduledPayment.status !== "PAID") {
            return acc + scheduledPayment?.amountDue || 0;
        } else {
            return acc;
        }
    }, 0) || 0;

    const rentPaid = payments.reduce((acc, payment) => {
        if (payment.status === "PAID") {
            return acc + payment?.amount || 0;
        }
        else {
            return acc;
        }
    }, 0) || 0;

    const activeLeases = leases.filter(lease =>{
        return  isAfter(new Date(lease.endDate), new Date()) || !lease.endDate;
    }).length;


    const tabs = [
        {
            title: "Payments",
            content: (
                <PaymentTable payments={payments}>
                    <AddPayment
                        open={showPaymentModal}
                        onOpenChange={() => setShowPaymentModal(!showPaymentModal)}
                    >
                        <FilePlus2 className="w-4 h-4 mr-2" />
                        Add Payment
                    </AddPayment>
                </PaymentTable>
            ),
            count: payments?.length
        },
        {
            title: "Rent Schedule",
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
            content: <ExpensesTable expenses={expenses}>
                <AddExpense/>
            </ExpensesTable>,
            count: expenses?.length
        }
    ]


    return (
        <>
            <h1>
                Financials
            </h1>

            <div className="flex flex-col gap-4">
                <p className={"text-gray-500"}>
                    This page offers an overview of the financials for either a single property or all properties, depending on your selection.
                </p>

                <div className="flex flex-row flex-wrap gap-4">
                    <InfoCard title="Rent Due" number={moneyParser(rentDue)}  />
                    <InfoCard title="Rent Paid" number={moneyParser(rentPaid)}  />
                    <InfoCard title="Active Leases" number={activeLeases}   />
                </div>

                <Tabs defaultValue={0}>
                    <TabsList>
                        {tabs.map((tab, index) => {
                            return (
                                <TabsItem value={index} key={index}>
                                    <div className="flex justify-start gap-2 items-center">
                                        {tab.title}
                                        <div className="p-1 rounded-lg shadow-sm text-xs bg-background-light w-7 h-7 flex items-center justify-center border border-border ">
                                            {tab.count}
                                        </div>
                                    </div>

                                </TabsItem>
                            )
                        })}
                    </TabsList>
                    {tabs.map((tab, index) => {
                        return (
                            <TabsContent value={index} key={index}>
                                {tab.content}
                            </TabsContent>
                        )
                    })}
                </Tabs>
            </div>
        </>

    )
}

export default Financials;