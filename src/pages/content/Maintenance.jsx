import MaintenanceTable from "../../components/maintenance/MaintenanceTable.tsx";
import AddMaintenanceReport from "../../components/maintenance/AddMaintenanceReport.js";
import {Drill, FilePlus2, Plus} from "lucide-react";
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

                </div>

            </div>


            <MaintenanceTable maintenanceReports={maintenanceData}>
                <AddMaintenanceReport>
                    <FilePlus2 size={18} className="mr-1"/>
                    Report Maintenance
                </AddMaintenanceReport>
            </MaintenanceTable>

        </div>
    )
}

export default MaintenanceReports;