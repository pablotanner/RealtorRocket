import * as React from "react"
import {Calendar as CalendarIcon, ChevronDown, Clock, Trash, Trash2} from "lucide-react"

import {cn} from "../../utils.ts";
import { Button } from "./button.tsx"
import { Calendar } from "./calendar.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover.tsx"
import {DateRange} from "react-day-picker";
import {dateParser, getDatePlaceholder} from "../../utils/formatters.js";
import TimePicker from "./time-picker.tsx";
import {Input} from "./input.tsx";


interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    dateFormat?: string;
    disabled?: boolean;
    className?: string;
    allowTime?: boolean;


}

export function DatePicker({value, onChange, disabled, className, allowTime, ...props}: DatePickerProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal w-full",
                        !(value) && "text-muted-foreground", className
                    )}
                    disabled={disabled}
                    type="button"
                    {...props}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? dateParser(value) : getDatePlaceholder()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center" >

                <Calendar
                    initialFocus
                    mode={"single"}
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
                />

                <div className="flex flex-col w-full">
                    {
                        allowTime && (
                            <div
                                data-disabled={!value}
                                className="w-full border-y select-none border-secondary p-2 flex flex-row items-center gap-4 relative hover:bg-secondary/90 hover:text-primary-dark  data-[disabled='true']:hover:bg-gray-50 data-[disabled='true']:text-gray-500 data-[disabled='true']:hover:text-gray-500">
                                <Clock className="h-4 w-4 absolute" />
                                <input
                                    type={"time"}
                                    className="pl-6 outline-none bg-transparent w-full  select-none"
                                    value={value ? value.toLocaleTimeString().slice(0, 5) : ""}
                                    onChange={(e) => {
                                        const time = e.target.value;
                                        const timeDate = new Date(value as Date);
                                        timeDate.setHours(parseInt(time.split(":")[0]));
                                        timeDate.setMinutes(parseInt(time.split(":")[1]));
                                        onChange(timeDate);
                                    }}
                                    disabled={!value}
                                />
                                <ChevronDown className="h-4 w-4 absolute right-1 cursor-pointer pointer-events-none"/>
                            </div>
                        )
                    }


                    <div
                        data-disabled={!value}
                        onClick={() => {
                            onChange(null)
                        }}
                        className="w-full border-y border-secondary p-2 flex flex-row items-center gap-4 relative cursor-pointer hover:bg-secondary">
                        <Trash className="h-4 w-4" />
                        Reset

                    </div>

                </div>


            </PopoverContent>
        </Popover>
    )
}
