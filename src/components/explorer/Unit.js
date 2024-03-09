import {cn} from "../../utils.ts";
import PropertyStatus from "../properties/PropertyStatus.js";
import {selectTenantByUnitId} from "../../services/slices/objectSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useRef} from "react";


const Unit = ({ unit, selectedUnit, onSelectUnit }) => {
    const ref = useRef()

    const currentTenant = useSelector((state) => selectTenantByUnitId(state, unit?.id));


    useEffect(() => {
        if (selectedUnit?.id === unit?.id) {
            ref.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
    }, [selectedUnit]);


    const getRoomHeight = (numOfRooms) => {
        if (numOfRooms === 1) {
            return "h-[180px]";
        }
        if (numOfRooms === 2) {
            return "h-[80px]";
        }
        if (numOfRooms === 3) {
            return "h-[55px]";
        }
        if (numOfRooms === 4) {
            return "h-[40px]";
        }
        if (numOfRooms === 5) {
            return "h-[32px]";
        }
        if (numOfRooms === 6) {
            return "h-[26px]";
        }
        if (numOfRooms === 7) {
            return "h-[23px]";
        }
        else {
            return "h-[20px]";
        }
    }

    const getRoomSeparators = (numOfRooms) => {
        let separators = [];
        for (let i = 0; i < numOfRooms-1; i++) {
            separators.push(<div
                data-selected={selectedUnit?.id === unit?.id}
                key={i}
                className={cn("w-[1px] bg-gray-300 data-[selected='true']:bg-white", getRoomHeight(numOfRooms) ) }
            />
        )
        }
        return separators;
    }


    return (
        <div
            ref={ref}
            data-selected={selectedUnit?.id === unit?.id}
            className="bg-secondary h-[150px] w-full flex flex-col justify-evenly gap-1 items-center border-2 border-gray-200 cursor-pointer hover:bg-gray-200 transition-all duration-100 ease-in-out data-[selected='true']:bg-indigo-200  border-t-0 first:border-t-2 first:border-t-gray-200 data-[selected='true']:outline-indigo-500 data-[selected='true']:outline data-[selected='true']:outline-2"
            onClick={() => {
                selectedUnit?.id === unit?.id ? onSelectUnit(null) : onSelectUnit(unit)
            }

        }
        >
            <div className="flex flex-row gap-2  w-full px-2 items-center">
                <h2 className="select-none text-lg" >{unit?.unitIdentifier || "Unit " + unit?.id}</h2>
                <PropertyStatus status={unit?.status} />
            </div>

            <div
                data-selected={selectedUnit?.id === unit?.id}
                className={cn("w-full min-h-fit flex justify-evenly items-center border-y border-gray-300  data-[selected='true']:border-white ")  }
            >
                {getRoomSeparators(unit?.numOfRooms)}
            </div>

            {
                currentTenant &&
                (
                    <div className="text-md w-full h-full px-2 items-center justify-start flex flex-row font-500 text-foreground"
                    >
                        {currentTenant?.firstName + " " + currentTenant?.lastName}
                    </div>
                )
            }


        </div>

    )
}

export default Unit;