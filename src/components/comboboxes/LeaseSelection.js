import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";


const LeaseSelection = ({onSelect, selected, leases, isLoading, ...props}) => {
    const [open, setOpen] = useState(false)
    const [leaseId, setLeaseId] = useState(selected?.id || selected)
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
                    className={cn("w-[200px] justify-between capitalize", props.className)}
                    {...props}
                >
                    {leaseId
                        ? "Lease " + leases?.find((lease) => lease.id === parseInt(leaseId))?.id
                        : "Select Lease..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" noPortal>
                <Command>
                    <CommandInput placeholder="Search Lease" />
                    <CommandList>
                        <CommandEmpty>No Lease found.</CommandEmpty>
                        <CommandGroup>
                            {leases?.map((lease) => (
                                <CommandItem
                                    key={lease.id}
                                    value={lease.id}
                                    onSelect={() => {
                                        setLeaseId(lease.id === leaseId ? null : lease.id)
                                        onSelect(lease.id === leaseId ? null : lease.id)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            (parseInt(leaseId) === lease.id  || parseInt(leaseId) === lease)? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    Lease {lease.id}
                                </CommandItem>
                            ))}
                        </CommandGroup>

                    </CommandList>

                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default LeaseSelection;