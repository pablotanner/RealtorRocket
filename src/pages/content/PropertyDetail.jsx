import {useGetPropertyQuery} from "../../services/api/propertyApi.js";
import {useLocation} from "react-router-dom";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";


const PropertyDetail = (props) => {


    const location = useLocation();


    const {data} = props;

    console.log(data)

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