import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";
import {Image} from "../ui/image.tsx";


const RentalSelection = ({onSelect, selected, units, ...props}) => {
    const [open, setOpen] = useState(false)
    const [unitId, setUnitId] = useState(selected?.id || selected)
    const [unit, setUnit] = useState(null)

    useEffect(() => {
        setUnitId(selected?.id || selected)
        setUnit(units?.find((unit) => unit.id === parseInt(selected?.id || selected)))
    }, [selected])


    if (props?.isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn("w-[200px] flex pl-3 items-center justify-between capitalize ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ", props.className)}
                disabled
            >
                Loading Units...
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        )
    }
    else if ((!units || !units?.length) && !props?.isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn("w-[200px] flex pl-3 items-center justify-between capitalize ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ", props.className)}
                disabled
            >
                No Units Available
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        )
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] flex pl-3 items-center justify-between capitalize ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ", props.className)}

                >
                    {unitId
                        ? (units?.find((unit) => unit.id === parseInt(unitId))?.unitIdentifier || "Unit " + unitId)
                        : "Select Unit..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" noPortal side="top">
                <Command >
                    <CommandInput placeholder="Search Unit" />

                    <div className="flex flex-row relative">
                        <CommandList className={"w-full"}>
                            <CommandEmpty>No Unit found.</CommandEmpty>
                            <CommandGroup className="max-h-[300px] overflow-auto z-[100]">
                                {units?.map((unit) => (
                                    <CommandItem
                                        key={unit.id}
                                        value={unit.id}
                                        onSelect={() => {
                                            setUnitId(unit.id === unitId ? null : unit.id)
                                            setUnit(unit.id === unitId ? null : unit)
                                            onSelect(unit.id === unitId ? null : unit.id)
                                            //setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                parseInt(unitId) === unit.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {unit.unitIdentifier || "Unit " + unit.id}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>

                        <div
                            data-hidden={!unitId}
                            className="p-2 w-full flex flex-col gap-2 data-[hidden='true']:hidden justify-start">
                            <Image src={
                                unit?.images?.length ? unit?.images[0].imageUrl : "https://www.apartments.com/blog/sites/default/files/styles/x_large_hq/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg?itok=kQmw64UU"
                            } className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <p className="text-xs">
                                    Unit Identifier
                                </p>
                                <p className="text-sm font-500">
                                    {unit?.unitIdentifier || "Unit " + unit?.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Current Tenant
                                </p>
                                <p className="text-sm font-500">
                                    {unit?.tenantId ? `Tenant #${unit?.tenantId}` : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Property
                                </p>
                                <p className="text-sm font-500">
                                    {unit?.realEstateObject?.title}
                                </p>
                            </div>


                        </div>

                    </div>


                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default RentalSelection;