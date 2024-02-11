

const LeaseHistory = ({leases}) => {
return (
            <div>
                {leases?.map((lease, index) => (
                    <div key={index} className={index > 0 && "border-t-2 border-gray-100 w-full"}>
                        <p>Lease: {lease.id}</p>
                        <p>Start Date: {lease.startDate}</p>
                        <p>End Date: {lease.endDate}</p>
                        <p>Monthly Rent: {lease.monthlyRent}</p>
                    </div>
                ))}
            </div>
    )
}

export default LeaseHistory;