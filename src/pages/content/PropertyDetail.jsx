import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "../../components/ui/table.tsx";
import {Button} from "../../components/ui/button.tsx";
import {useDeletePropertyMutation} from "../../services/api/propertyApi.js";
import {useNavigate, useParams} from "react-router-dom";
import DetailedPropertyCard from "../../components/properties/DetailedPropertyCard.js";


const PropertyDetail = (props) => {
    const {data} = props;

    const { id } = useParams();
    const navigate = useNavigate();

    const [deleteProperty, {isLoading: isDeleting}] = useDeletePropertyMutation();


    return (
        <div className="flex flex-wrap gap-4">
            <DetailedPropertyCard property={data?.data} />
            <Button variant="destructive" isLoading={isDeleting} onClick={() => deleteProperty(id).then(()=> navigate('/properties')) }>
                Delete
            </Button>
            <div className="bg-white p-4 border-2 border-gray-200 shadow-xl w-[400px] h-[400px]">
                Rental Units
                <div>
                    dasdsaads
                </div>
            </div>
        </div>


    )



    return (
        <div>
            <div className="flex flex-row justify-between">
                <h className="text-xl font-600">
                    {data?.data?.title || "No Title"}
                </h>
                <Button variant="destructive" isLoading={isDeleting} onClick={() => deleteProperty(id).then(()=> navigate('/properties')) }>
                    Delete
                </Button>
            </div>

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