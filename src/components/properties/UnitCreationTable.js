import {Input} from "../ui/input.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "../ui/table.tsx";
import {BsThreeDots} from "react-icons/bs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../ui/dropdown-menu.tsx";
import {Copy, Plus, Trash} from "lucide-react";
import {Button} from "../ui/button.tsx";
import {FormControl} from "../ui/form.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "../ui/select.tsx";
import {ListingStatus, RentalStatus} from "../../utils/magicNumbers.js";


const UnitCreationTable = ({ units, onChange }) => {



    return (
        <Table>
            <TableHeader>
                <div>
                    <Button variant="outline"
                            type="button"
                            onClick={() => {
                                //Add a new unit
                                onChange([...units, {
                                    unitNumber: "",
                                    floor: "",
                                    unitSize: "",
                                    numOfFloors: "",
                                    numOfRooms: "",
                                    numOfBedrooms: "",
                                    numOfBathrooms: "",
                                    garages: "",
                                    status: "ACTIVE",
                                    rentalPrice: "",
                                    images: []
                                }]);
                            }}
                    >
                        <Plus className="w-4 h-4 mr-2"/>
                        Add Unit
                    </Button>
                </div>
                <TableRow>
                    <TableHead className="font-700 text-center">Unit</TableHead>
                    <TableHead>Unit Number</TableHead>
                    <TableHead>Floor</TableHead>
                    <TableHead>Unit Size</TableHead>
                    <TableHead>Number of Floors</TableHead>
                    <TableHead>Number of Rooms</TableHead>
                    <TableHead>Number of Bedrooms</TableHead>
                    <TableHead>Number of Bathrooms</TableHead>
                    <TableHead>Garages</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Rental Price</TableHead>
                    <TableHead></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {units?.map((unit, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="text"
                                    value={unit.unitNumber}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].unitNumber = e.target.value;
                                        onChange(newUnits);
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.floor}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].floor = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.unitSize}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].unitSize = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.numOfFloors}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].numOfFloors = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.numOfRooms}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].numOfRooms = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.numOfBedrooms}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].numOfBedrooms = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.numOfBathrooms}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].numOfBathrooms = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.garages}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].garages = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <Select onValueChange={(e) => {
                                    const newUnits = [...units];
                                    newUnits[index].status = e;
                                    onChange(newUnits);}}
                                        defaultValue={unit.status}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            Object.keys(ListingStatus).map((type, index) => {
                                                return (
                                                    <SelectItem key={index} value={type}>{ListingStatus[type]}</SelectItem>
                                                )
                                            })
                                        }
                                    </SelectContent>
                                </Select>


                            </TableCell>
                            <TableCell>
                                <Input
                                    type="number"
                                    value={unit.rentalPrice}
                                    onChange={(e) => {
                                        const newUnits = [...units];
                                        newUnits[index].rentalPrice = e.target.value;
                                        onChange(newUnits);
                                    }}
                                    className="w-20"
                                />
                            </TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <BsThreeDots />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    //Duplicate the unit
                                                    const newUnits = [...units];
                                                    newUnits.push({...unit});
                                                    onChange(newUnits);
                                                }}
                                            >
                                                <Copy className="w-4 h-4 mr-2 "/>
                                                Duplicate
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-500"
                                                disabled={units.length === 1}
                                                onClick={() => {
                                                    //Delete the unit
                                                    const newUnits = [...units];
                                                    newUnits.splice(index, 1);
                                                    onChange(newUnits);
                                                }}
                                            >
                                                <Trash className="w-4 h-4 mr-2"/>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </TableCell>
                        </TableRow>
                    )
                }
                )}
            </TableBody>
        </Table>
    )
}


export default UnitCreationTable;