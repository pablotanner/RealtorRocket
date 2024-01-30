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
import NavBar from "../components/NavBar.jsx";

const Home = () => {

    const {data, isError, error, isLoading} = useUsersQuery();


    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error: {error?.message}</div>
    }

    function censorEmail(email) {
        const [name, domain] = email.split('@');
        const censoredName = name.slice(0, 1) + '*'.repeat(name.length - 1);
        return censoredName + '@' + domain;
    }

    return (
        <div >
                <Table>
                    <TableCaption >Current Users</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>E-Mail </TableHead>
                            <TableHead>Password (Encrypted)</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{censorEmail(user.email)}</TableCell>
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