
const DetailedTenantsTable = ({ tenants }) => {



    const renderTenants = tenants.map((tenant, index) => {
        return (
            <tr key={index}>
                <td>{tenant.id}</td>
                <td>{tenant.name}</td>
                <td>{tenant.email}</td>
                <td>{tenant.phone}</td>
                <td>{tenant.unit}</td>
                <td>{tenant.leaseStart}</td>
                <td>{tenant.leaseEnd}</td>
                <td>{tenant.rent}</td>
                <td>{tenant.status}</td>
                <td>{tenant.actions}</td>
            </tr>
        )
    })

    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Unit</th>
                    <th>Lease Start</th>
                    <th>Lease End</th>
                    <th>Rent</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {renderTenants}
                </tbody>
            </table>
        </div>
    )

}

export default DetailedTenantsTable;