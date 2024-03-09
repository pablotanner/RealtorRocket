import * as React from "react"
import {Calendar as CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, Clock, Trash} from "lucide-react"

import {cn} from "../../utils.ts";
import { Button } from "./button.tsx"
import { Calendar } from "./calendar.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover.tsx"
import {dateParser, getDatePlaceholder} from "../../utils/formatters.js";
import {useNavigation} from "react-day-picker"

interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    dateFormat?: string;
    disabled?: boolean;
    className?: string;
    allowTime?: boolean;


}

export function DatePicker({value, onChange, disabled, className, allowTime, ...props}: DatePickerProps) {

    const [open, setOpen] = React.useState(false);

    const displayDate = value ? dateParser(value) : getDatePlaceholder();

    const Header = () => {
        const {currentMonth, previousMonth, nextMonth, goToMonth} = useNavigation();

        const year = currentMonth.getFullYear();

        const formattedDefaultValue = value ? value.toISOString().split("T")[0] : null;

        // Initialize the state with the provided or default formatted date
        const [input, setInput] = React.useState(formattedDefaultValue);
        const inputRef = React.useRef<HTMLInputElement>(null);


        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            // Just store the value temporarily, don't parse or send it upstream yet
            setInput(e.target.value);
        };

        // When the input loses focus, parse and handle the complete input
        const handleInputBlur = () => {
            if (!inputRef.current || !input) return;
            const date = new Date(input);

            if (!isNaN(date.getTime())) {
                onChange(date); // Update the parent component or external state
                goToMonth(date); // Adjust displayed month in the date picker if necessary
            }
        };

        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center px-2">
                    <button
                        type="button"
                        className="p-[2px] bg-background-light flex items-center border-2 border-transparent hover:border-border rounded-md"
                        onClick={() => goToMonth(previousMonth)}
                    >
                        <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                    </button>
                    <div className="text-muted-foreground font-500 text-md">
                        {currentMonth.toLocaleString("default", {month: "long"})} {year}
                    </div>
                    <button
                        type="button"
                        className="p-[2px] bg-background-light flex items-center border-2 border-transparent hover:border-border rounded-md"
                        onClick={() => goToMonth(nextMonth)}
                    >
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>

                <div className="flex gap-2 justify-between items-center">

                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background-light px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        ref={inputRef}
                        type="date"
                        value={input}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                    />

                    <Button
                        variant="outline"
                        onClick={() => {
                            onChange(new Date())
                        }}
                    >
                        Today
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <Popover open={open} onOpenChange={() => setOpen(!open)}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    aria-expanded={open}
                    className={cn(
                        "justify-start text-left font-500 w-full border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        !(value) && "text-muted-foreground", className
                    )}
                    disabled={disabled}
                    type="button"
                    onClick={() => setOpen(!open)}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {displayDate}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center p-3 pb-3" >

                <Calendar
                    initialFocus
                    mode="single"
                    onSelect={(date) => {
                        if (date) {
                            // Remember time
                            const time = value ? value.toLocaleTimeString().slice(0, 5) : null;
                            const timeDate = new Date(date as Date);
                            if (time) {
                                timeDate.setHours(parseInt(time.split(":")[0]));
                                timeDate.setMinutes(parseInt(time.split(":")[1]));
                            }
                            onChange(timeDate)
                        }
                        else {
                            onChange(null)
                        }
                    }}
                    selected={value}
                    fixedWeeks={true}
                    components={{
                        Caption: Header
                    }}
                    />
                <div className="flex flex-col w-full rounded-lg gap-1">
                    <div className="w-full h-[1px] bg-secondary mb-1" />
                    {
                        allowTime && (
                            <>
                                <div
                                    data-disabled={!value}
                                    className="flex flex-row items-center justify-between"
                                >
                                    <p className="text-md font-500">
                                        Time
                                    </p>

                                    <input
                                        type={"time"}
                                        className="flex h-10 w-fit rounded-md border border-input bg-background-light px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-20"

                                        value={value ? value.toLocaleTimeString().slice(0, 5) : ""}
                                        onChange={(e) => {
                                            const time = e.target.value;
                                            const timeDate = new Date(value as Date);

                                            timeDate.setHours(parseInt(time.split(":")[0]));
                                            timeDate.setMinutes(parseInt(time.split(":")[1]));
                                            onChange(timeDate);
                                        }}
                                        //disabled={!value}
                                        disabled
                                    />
                                </div>


                                <div className="w-full h-[1px] bg-border my-1" />
                            </>

                        )
                    }

                    <div className="flex justify-between gap-2">
                        <Button
                            onClick={() => {
                                onChange(null)
                                setOpen(false)
                            }}
                            variant="outline"
                            className="w-full"
                        >
                            Cancel
                        </Button>

                        <Button
                            disabled={!value}
                            onClick={() => {
                                setOpen(false)
                            }}
                            className="w-full"
                            variant="gradient"
                        >
                            Done
                        </Button>
                    </div>

                </div>
            </PopoverContent>
        </Popover>
    )
}
