import {useUsersQuery} from "../services/api/authApi.js";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow} from "../components/ui/table.tsx";

const Home = () => {

    const {data, isError, error, isLoading} = useUsersQuery();


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error?.message}</div>
    }


    return (
        <div>
                <Table>
                    <TableCaption >Current Users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User ID </TableHead>
                            <TableHead>Password (Encrypted)</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableHead>{user.password}</TableHead>
                                <TableCell>{user.role}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </div>
    );
}

export default Home;