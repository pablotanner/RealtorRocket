import {useEffect, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "../ui/popover.tsx";
import {Button} from "../ui/button.tsx";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "../ui/command.tsx";
import {Check, ChevronDown} from "lucide-react";
import {cn} from "../../utils.ts";
import {dateParser, moneyParser} from "../../utils/formatters.js";
import {PaymentScheduleStatusBadge} from "../../utils/statusBadges.js";
import {getNextScheduledPayment} from "../../utils/financials.js";


const LeaseSelection = ({onSelect, selected, leases, isLoading, ...props}) => {
    const [open, setOpen] = useState(false)
    const [leaseId, setLeaseId] = useState(selected?.id || selected)
    const [lease, setLease] = useState(null)

    useEffect(() => {
        setLeaseId(selected?.id || selected)
        setLease(leases?.find((lease) => lease.id === parseInt(selected?.id || selected)))
    }, [selected])

    if (isLoading){
        return (
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn("w-[200px] flex pl-3 items-center justify-between capitalize ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ", props.className)}
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
                className={cn("w-[200px] flex pl-3 items-center justify-between capitalize ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ", props.className)}
                disabled
            >
               No Leases Available
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        )
    }
    const ScheduledPayment = ({payment}) => {

        if (!payment || !payment?.dueDate) return "-"


        return (
            <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between">
                    <p className="text-sm font-500 capitalize">
                        {dateParser(payment?.dueDate)}
                    </p>
                    <p className="text-sm font-500 text-indigo-600">
                        {moneyParser(payment?.amountDue)}
                    </p>
                </div>

                <div>
                    <PaymentScheduleStatusBadge status={payment?.status} />
                </div>

            </div>
        )
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    {...props}
                    className={cn("w-[200px] flex pl-3 items-center justify-between capitalize ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ", props.className)}
                >
                    {leaseId
                        ? "Lease " + leases?.find((lease) => lease.id === parseInt(leaseId))?.id
                        : "Select Lease..."}
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" noPortal side="top">
                <Command>
                    <CommandInput placeholder="Search Lease" />


                    <div className="flex flex-row relative">
                        <CommandList className="w-full">
                            <CommandEmpty>No Lease found.</CommandEmpty>
                            <CommandGroup>
                                {leases?.map((lease) => (
                                    <CommandItem
                                        key={lease.id}
                                        value={lease.id}
                                        onSelect={() => {
                                            setLeaseId(lease.id === leaseId ? null : lease.id)
                                            onSelect(lease.id === leaseId ? null : lease.id)
                                            //setOpen(false)
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


                        <div
                            data-hidden={!leaseId}
                            className="p-2 w-full flex flex-col gap-2 data-[hidden='true']:hidden justify-start">
                            <div>
                                <p className="text-xs">
                                    Lease ID
                                </p>
                                <p className="text-sm font-500">
                                    {lease?.id}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Current Tenant
                                </p>
                                <p className="text-sm font-500">
                                    {lease?.tenant ? (
                                        `${lease?.tenant?.firstName} ${lease?.tenant?.lastName}`
                                    ) : "No Tenant"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Lease Status
                                </p>
                                <p className="text-sm font-500 capitalize">
                                    {lease?.status ? lease?.status?.toLowerCase() :  "No Status"}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs">
                                    Next Payment
                                </p>
                                <ScheduledPayment payment={getNextScheduledPayment(lease)} />

                            </div>


                        </div>

                    </div>

                </Command>
            </PopoverContent>
        </Popover>
    )

}

export default LeaseSelection;