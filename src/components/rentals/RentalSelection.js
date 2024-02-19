import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command,CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";


const RentalSelection = ({onSelect, selected, units, ...props}) => {
    const [open, setOpen] = useState(false)
    const [unitId, setUnitId] = useState(selected?.id || selected)


    if (!units) {
        return null
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between capitalize", props.className)}

                >
                    {unitId
                        ? (units?.data?.find((unit) => unit.id === parseInt(unitId))?.unitIdentifier || "Unit " + unitId)
                        : "Select Unit..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command >
                    <CommandInput placeholder="Search Unit" />
                    <CommandEmpty>No Unit found.</CommandEmpty>
                    <CommandGroup>
                        {units?.data?.map((unit) => (
                            <CommandItem
                                key={unit.id}
                                value={unit.id}
                                onSelect={() => {
                                    setUnitId(unit.id === unitId ? null : unit.id)
                                    onSelect(unit.id === unitId ? null : unit.id)
                                    setOpen(false)
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
                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default RentalSelection;