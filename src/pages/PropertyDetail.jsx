import {useGetPropertyQuery} from "../services/api/propertyApi.js";
import {useLocation} from "react-router-dom";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../components/ui/table.tsx";


const PropertyDetail = () => {
    const location = useLocation();

    const id = location.pathname.split("/")[2];

    const {data, error, isError, isLoading} = useGetPropertyQuery(id);


    if (isLoading) {
        return <div>Loading...</div>
    }
    else if(isError) {
        return <div>ERROR {error.message} </div>
    }

    
    return (
        <div>
            <h className="text-xl font-600">
                {data?.data?.title || "No Title"}
            </h>
            <Table>
                <TableCaption >Property Data from DB</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead key={0}>Key</TableHead>
                        <TableHead key={1}>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.keys(data.data).map((key) => {
                        return (
                            <TableRow key={key}>
                                <TableCell>{key}</TableCell>
                                <TableCell>{data.data[key]}</TableCell>
                            </TableRow>
                        )})}
                </TableBody>
            </Table>
        </div>

    )
}

export default PropertyDetail;