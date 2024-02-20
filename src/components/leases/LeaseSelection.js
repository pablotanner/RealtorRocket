import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command,CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";


const LeaseSelection = ({onSelect, selected, leases, isLoading}) => {
    const [open, setOpen] = useState(false)
    const [leaseId, setLeaseId] = useState(selected)

    if (isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between capitalize"
                disabled
            >
                Loading Leases...
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        )
    }
    else if ((!leases || !leases?.length) && !isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between capitalize"
                disabled
            >
               No Leases Available
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
                    className="w-[200px] justify-between capitalize"
                >
                    {leaseId
                        ? "Lease " + leases?.find((lease) => lease.id === parseInt(leaseId))?.id
                        : "Select Lease..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command >
                    <CommandInput placeholder="Search Unit" />
                    <CommandEmpty>No Lease found.</CommandEmpty>
                    <CommandGroup className="overflow-auto max-h-[500px]">
                        {leases?.map((lease) => (
                            <CommandItem
                                key={lease.id}
                                value={lease.id}
                                onSelect={(currentValue) => {
                                    setLeaseId(currentValue === leaseId ? null : currentValue)
                                    onSelect(currentValue === leaseId ? null : currentValue)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        parseInt(lease) === lease.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {lease.id}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default LeaseSelection;