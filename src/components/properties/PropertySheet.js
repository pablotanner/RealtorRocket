import {Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose, SheetDescription} from "../ui/sheet.tsx";
import {Button} from "../ui/button.tsx";
import {Label} from "../ui/label.tsx";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "../ui/carousel.tsx";
import {Image} from "../ui/image.tsx";
import {Tabs, TabsContent, TabsList, TabsItem} from "../ui/tabs-new.tsx";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {RealEstateType} from "../../utils/magicNumbers.js";
import RentalTable from "../rentals/RentalTable.tsx";
import {selectUnitsByPropertyId} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";
import {Building2} from "lucide-react";


const PropertySheet = ({property}) => {




    const units = useSelector(state => selectUnitsByPropertyId(state, property?.id))

    const Value = ({value}) => (
        <div className="text-md font-500 text-foreground text-right">
            {value ?? "N/A"}
        </div>
    )

    const Entry = ({label, value}) => (
        <div className="grid grid-cols-2 items-center">
            <Label htmlFor="username" className="text-left font-500">
                {label}
            </Label>
            <Value value={value}/>
        </div>
    )

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <Building2 className="w-4 h-4 mr-2"/>
                    View Property
                </Button>
            </SheetTrigger>

            <SheetContent >
                <SheetHeader>
                    <SheetTitle>{property.title}</SheetTitle>
                    <SheetDescription>
                        {property.description}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">

                    <h4 className="pb-2 border-b border-border">
                        Images
                    </h4>
                    <Carousel className="w-full">
                    {
                            property?.images?.length > 1 ? (
                                <div className="flex flex-row justify-between">
                                    <CarouselPrevious className="relative translate-x-0 translate-y-0 top-0 left-0"/>
                                    <CarouselNext className="relative translate-x-0 translate-y-0 top-0 left-0"/>
                                </div>
                            ) : null
                        }

                        <CarouselContent>
                            {property?.images?.map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <Image src={image?.imageUrl} alt={`Property Image ${index}`}
                                               className="w-full h-64 object-cover rounded-lg"/>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>

                    <Tabs defaultValue="information" className="w-full overflow-x-auto" >
                        <TabsList disableSelect className="border-b border-border">
                            <TabsItem value={"information"}>
                                Information
                            </TabsItem>
                            <TabsItem value={"location"}>
                                Location
                            </TabsItem>
                            <TabsItem value={"units"}>
                                Units
                            </TabsItem>
                        </TabsList>
                        <TabsContent value={"information"}>
                            <Entry label="Created" value={dateParser(property.createdAt)}/>
                            <Entry label="Lot Size" value={property.lotSize}/>
                            <Entry label="Market Price" value={moneyParser(property.marketPrice)}/>
                            <Entry label="Year Built" value={property.yearBuilt}/>
                            <Entry label="Type" value={RealEstateType[property.realEstateType]}/>
                        </TabsContent>
                        <TabsContent value={"location"}>
                            <Entry label="Country" value={property.country}/>
                            <Entry label="City" value={property.city}/>
                            <Entry label="State" value={property.state}/>
                            <Entry label="Zip Code" value={property.zip}/>
                            <Entry label="Street" value={property.street}/>
                        </TabsContent>
                        <TabsContent value={"units"} className="overflow-auto h-72">
                            <RentalTable units={units}/>
                        </TabsContent>
                    </Tabs>

                </div>
            </SheetContent>
        </Sheet>
    )
}

export default PropertySheet;