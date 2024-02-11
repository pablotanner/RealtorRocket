import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {Button} from "../../components/ui/button.tsx";
import {useDeletePropertyMutation} from "../../services/api/propertyApi.js";
import {useNavigate, useParams} from "react-router-dom";


const PropertyDetail = (props) => {
    const {data} = props;

    const { id } = useParams();
    const navigate = useNavigate();

    const [deleteProperty, {isLoading: isDeleting}] = useDeletePropertyMutation();

    return (
        <div>
            <div className="flex flex-row justify-between">
                <h1>
                    {data?.data?.title}
                </h1>
                <Button variant="destructive" isLoading={isDeleting} onClick={() => deleteProperty(id).then(()=> navigate('/properties')) }>
                    Delete Property
                </Button>
            </div>

            The table below shows the data of the property from the database. <br/>

            <Table>
                <TableCaption >Property Data from DB</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead key={0}>Title</TableHead>
                        <TableHead key={1}>Value</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell key={0}>ID</TableCell>
                        <TableCell key={1}>{data?.data?.id}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Title</TableCell>
                        <TableCell key={1}>{data?.data?.title}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Description</TableCell>
                        <TableCell key={1}>{data?.data?.description}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Real Estate Type</TableCell>
                        <TableCell key={1}>{data?.data?.realEstateType}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Market Price</TableCell>
                        <TableCell key={1}>{data?.data?.marketPrice || "-"}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Lot Size </TableCell>
                        <TableCell key={1}>{data?.data?.lotSize || "-"}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Year Built</TableCell>
                        <TableCell key={1}>{data?.data?.yearBuilt || "-"}</TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell key={0}>Units</TableCell>
                        <TableCell key={1}>
                            {data?.data?.units?.map((unit, index) => (
                                <div key={index}>
                                    UNIT {unit.id}
                                </div>
                            ))}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>

    )
}

export default PropertyDetail;