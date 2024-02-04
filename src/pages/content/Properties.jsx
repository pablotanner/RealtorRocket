import {useCreatePropertyMutation} from "../../services/api/propertyApi.js";
import PropertyCard from "../../components/properties/PropertyCard.js";
import {CardContent, CardFooter} from "../../components/ui/card.tsx";
import CreateProperty from "../../components/properties/propertyCreation/CreateProperty.js";
import PropertyTable from "../../components/properties/PropertyTable.tsx";

const Properties = (props) => {
    const {data} = props;


    const trigger = (
        <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Plus_symbol.svg/800px-Plus_symbol.svg.png"
            alt="Add New"
            className="border-2 border-gray-100 bg-white w-24 h-24 md:w-32 md:h-32 lg:w-64 lg:h-64 object-cover rounded-full hover:opacity-75 transition-opacity duration-150 ease-in-out cursor-pointer"
        />
    )

    return (
        <>
            <div className="text-lg mb-4">
                These are your properties. You can add new properties by clicking the plus button below. <br/>
                If you want to create a rental unit for an existing property, visit the Rentals page.
            </div>
            <div className="flex gap-4 max-w-full flex-wrap">
                {data?.data.map((property) => (<PropertyCard key={property.id} property={property} />))}
                <PropertyCard>
                    <CardContent className="p-2 pt-6 items-center justify-center flex">
                        <CreateProperty trigger={trigger} />
                    </CardContent>
                    <CardFooter className="flex flex-col p-4 justify-start items-center">
                        <h className="font-400 text-gray-600 text-md lg:text-lg">
                            Click to add new property
                        </h>
                    </CardFooter>
                </PropertyCard>
            </div>
            <PropertyTable properties={data?.data} />
        </>

    )
}


export default Properties;
