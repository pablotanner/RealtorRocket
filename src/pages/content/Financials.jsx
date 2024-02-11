import LeasesTable from "../../components/financials/LeasesTable.tsx";
import {useSelector} from "react-redux";
import {selectLeasesByPropertyId} from "../../services/slices/objectSlice.js";
import InfoCard from "../../components/home/InfoCard.js";
import {isAfter} from "date-fns";


const Financials = (props) => {
    const {propertySelection} = props;


    const leases = useSelector(state => selectLeasesByPropertyId(state, propertySelection));

    const rentDue = leases.reduce((acc, lease) => {
        return acc + lease?.totalRentDue || 0;
    }, 0);

    const rentPaid = leases.reduce((acc, lease) => {
        return acc + lease?.rentPaid || 0;
    }, 0);

    const activeLeases = leases.filter(lease =>{
        return  isAfter(new Date(lease.endDate), new Date()) || !lease.endDate;
    }).length;


    return (
        <>
            <h1>
                Financials
            </h1>

            <div className="flex flex-col gap-4">
                These are your leases.

                <div className="flex flex-row flex-wrap gap-4">
                    <InfoCard title="Rent Due (this month)" number={"$" + rentDue}  />
                    <InfoCard title="Rent Paid (this month)" number={"$" + rentPaid}  />
                    <InfoCard title="Active Leases" number={activeLeases}   />
                </div>

                <LeasesTable leases={leases} />
            </div>
        </>

    )
}

export default Financials;