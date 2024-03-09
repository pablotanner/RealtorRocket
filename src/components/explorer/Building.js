import Unit from "./Unit.js";


const Building = ({ property,  selectedUnit, onSelectUnit }) => {



    // Units sorted by floor
    const sortedUnits = [...property?.units]?.sort((a, b) => b?.floor - a?.floor);


    return (
        <div className="bg-secondary p-2 flex flex-col justify-end pb-1 w-[200px] flex-shrink-0">
            <p className="text-lg font-500 text-foreground">{property?.title}</p>
            <p className="text-sm text-muted-foreground">
                {property?.street} {property?.city}
            </p>
            <div className="">
                {sortedUnits?.map((unit, index) => (
                    <Unit key={index} unit={unit} selectedUnit={selectedUnit} onSelectUnit={onSelectUnit} />
                ))}

            </div>



        </div>
    )

}

export default Building;