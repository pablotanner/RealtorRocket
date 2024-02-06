import CreateProperty from "../../components/properties/PropertyCreation/CreateProperty.js";
import PropertyTable from "../../components/properties/PropertyTable.tsx";
import DetailedPropertyTable from "../../components/properties/DetailedPropertyTable.js";
import {Button} from "../../components/ui/button.tsx";
import {useState} from "react";

const Properties = (props) => {
    const {data} = props;

    const [view, setView] = useState("detailed") // ["detailed", "compact"]


    const ViewSelection = () => {
        return (
            <div className="flex flex-wrap items-center justify-between flex-row gap-4 mb-4">
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
        <div>
            <div className="text-lg mb-4">
                These are your properties, for more information such as the units of each property, click on the property.
            </div>

            <ViewSelection />

            {view === "detailed" ? <DetailedPropertyTable properties={data?.data} /> : <PropertyTable properties={data?.data} />}


        </div>

    )
}


export default Properties;
