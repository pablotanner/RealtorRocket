import CreateProperty from "../../components/properties/propertyCreation/CreateProperty.js";
import PropertyTable from "../../components/properties/PropertyTable.tsx";
import DetailedPropertyTable from "../../components/properties/DetailedPropertyTable.js";
import {Button} from "../../components/ui/button.tsx";
import {useState} from "react";

const Properties = (props) => {
    const {data} = props;

    const [view, setView] = useState("detailed") // ["detailed", "compact"]


    const ViewSelection = () => {
        return (
            <div className="flex flex-row items-center justify-between gap-4 mb-4">
                <div className="flex flex-row gap-1 bg-gray-100 w-fit p-[7px] rounded-xl">
                    <Button
                        data-active={view === "detailed"}
                        variant="tab"
                        onClick={() => setView("detailed")}
                    >
                        Detailed
                    </Button>
                    <Button
                        data-active={view === "compact"}
                        variant="tab"
                        onClick={() => setView("compact")}
                    >
                        Compact
                    </Button>
                </div>
                <CreateProperty trigger={<Button variant="gradient" className="w-fit">Add Property</Button>}/>

            </div>
        )
    }



    return (
        <div className="relative">
            <div className="text-lg mb-4">
                These are your properties. You can add new properties by clicking the plus button below. <br/>
                If you want to create a rental unit for an existing property, visit the Rentals page.
            </div>

            <ViewSelection />

            {view === "detailed" ? <DetailedPropertyTable properties={data?.data} /> : <PropertyTable properties={data?.data} />}


        </div>

    )
}


export default Properties;
