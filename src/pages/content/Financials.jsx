import LeasesTable from "../../components/financials/LeasesTable.tsx";
import {useSelector} from "react-redux";
import {selectLeasesByPropertyId} from "../../services/slices/objectSlice.js";


const Financials = (props) => {
    const {propertySelection} = props;


    const leases = useSelector(state => selectLeasesByPropertyId(state, propertySelection));

    return (
        <div>
            These are your leases.
            <LeasesTable leases={leases} />
        </div>
    )
}

export default Financials;