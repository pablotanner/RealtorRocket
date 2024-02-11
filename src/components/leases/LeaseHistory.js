

const LeaseHistory = ({leases}) => {
return (
        <div>
            <h1>Lease History</h1>
            <div>
                {leases?.map((lease, index) => (
                    <div key={index}>
                        <p>Lease: {lease.id}</p>
                        <p>Start Date: {lease.startDate}</p>
                        <p>End Date: {lease.endDate}</p>
                        <p>Monthly Rent: {lease.monthlyRent}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LeaseHistory;