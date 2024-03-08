import MaintenanceTable from "../../components/maintenance/MaintenanceTable.tsx";
import AddMaintenanceReport from "../../components/maintenance/AddMaintenanceReport.js";
import {Drill} from "lucide-react";
import {selectMaintenanceReportsByPropertyId} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";


const MaintenanceReports = (props) => {
    const {propertySelection} = props;

    const maintenanceData = useSelector(state => selectMaintenanceReportsByPropertyId(state,propertySelection))

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <h1>
                    Maintenance
                </h1>
                <div className="flex -mt-2 justify-between gap-2 items-center flex-wrap md:flex-nowrap">
                    <p className="text-gray-500">
                        This is where you can view and add maintenance reports.
                    </p>

                    <AddMaintenanceReport>
                        <Drill className="w-5 h-5 mr-2"/>
                        Report Maintenance
                    </AddMaintenanceReport>
                </div>

            </div>


            <MaintenanceTable maintenanceReports={maintenanceData}/>

        </div>
    )
}

export default MaintenanceReports;