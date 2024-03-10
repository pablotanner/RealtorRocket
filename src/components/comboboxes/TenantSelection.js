import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";


const TenantSelection = ({onSelect, selected, tenants, ...props}) => {
    const [open, setOpen] = useState(false)
    const [tenantId, setTenantId] = useState(selected?.id)
    const [tenant, setTenant] = useState(selected)

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

    useEffect(() => {
        setTenantId(selected?.id || selected)
        setTenant(tenants?.find((tenant) => tenant.id === parseInt(selected?.id || selected)))
    }, [selected])



    if (props?.isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] flex justify-between capitalize"
                disabled
            >
                Loading Tenants...
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        )
    }
    else if ((!tenants || !tenants?.length) && !props?.isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] flex justify-between capitalize"
                disabled
            >
                No Tenants Available
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
                    {tenantId
                        ? (getName(tenants?.find((tenant) => tenant.id === parseInt(tenantId))))
                        : "Select Tenant..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[350px]" noPortal side="top">
                <Command>
                    <CommandInput placeholder="Search Tenant" />

                    <div className="flex flex-row relative">
                        <CommandList className={"w-full"}>
                            <CommandEmpty>No Tenant found.</CommandEmpty>
                            <CommandGroup className="max-h-[300px] overflow-auto z-[100] min-w-fit">
                                {tenants?.map((tenant) => (
                                    <CommandItem
                                        key={tenant.id}
                                        value={tenant.id}
                                        onSelect={() => {
                                            setTenantId(tenant.id === tenantId ? null : tenant.id)
                                            setTenant(tenant.id === tenantId ? null : tenant)
                                            onSelect(tenant.id === tenantId ? null : tenant.id)
                                            //setOpen(false)
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

                        </CommandList>

                        <div
                            data-hidden={!tenantId}
                            className="p-2 w-full flex flex-col gap-2 data-[hidden='true']:hidden justify-start">
                            <Avatar className="w-14 h-14 rounded-md">
                                <AvatarImage src={tenant?.user?.image?.imageUrl} alt="Tenant" className="rounded-none" />
                                <AvatarFallback className="rounded-none text-lg" >
                                    {tenant?.firstName?.charAt(0)}{tenant?.lastName?.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-xs">
                                    Name
                                </p>
                                <p className="text-sm font-500">
                                    {getName(tenant)}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Email
                                </p>
                                <p className="text-sm font-500 overflow-hidden break-all">
                                    {tenant?.email || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Occupation
                                </p>
                                <p className="text-sm font-500 overflow-hidden break-all">
                                    {tenant?.occupation || "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Latest Unit
                                </p>
                                <p className="text-sm font-500 overflow-hidden break-all">
                                    {tenant?.unit?.length ? tenant?.unit[0]?.unitIdentifier : "-"}
                                </p>
                            </div>



                        </div>

                    </div>

                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default TenantSelection;