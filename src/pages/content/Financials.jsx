import LeasesTable from "../../components/financials/LeasesTable.tsx";


const Financials = (props) => {
    const {data} = props;


    return (
        <div>
            These are your leases.
            <LeasesTable leases={data?.data} />
        </div>
    )
}

export default Financials;