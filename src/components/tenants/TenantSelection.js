import {useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command,CommandEmpty, CommandGroup, CommandInput, CommandItem} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";


const TenantSelection = ({onSelect, selected, tenants, ...props}) => {
    const [open, setOpen] = useState(false)
    const [tenantId, setTenantId] = useState(selected?.id)

    function getName(tenant) {
        if (!tenant) {
            return null
        }
        if (tenant.firstName && tenant.lastName) {
            return tenant.firstName + " " + tenant.lastName
        }
        if (tenant.firstName) {
            return tenant.firstName
        }
        if (tenant.lastName) {
            return tenant.lastName
        }
    }

    if (!tenants) {
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
                    {tenantId
                        ? (getName(tenants?.data?.find((tenant) => tenant.id === parseInt(tenantId))))
                        : "Select Tenant..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command >
                    <CommandInput placeholder="Search Unit" />
                    <CommandEmpty>No Unit found.</CommandEmpty>
                    <CommandGroup>
                        {tenants?.data?.map((tenant) => (
                            <CommandItem
                                key={tenant.id}
                                value={tenant.id}
                                onSelect={() => {
                                    setTenantId(tenant.id === tenantId ? null : tenant.id)
                                    onSelect(tenant.id === tenantId ? null : tenant.id)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        parseInt(tenantId) === tenant.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {(tenant.firstName + " " + tenant.lastName) || "Tenant " + tenant.id}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default TenantSelection;