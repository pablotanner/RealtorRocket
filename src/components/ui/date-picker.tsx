import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

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


interface DatePickerProps {
    isRange?: boolean;
    //dates?: [Date, Date];
    initialStartDate?: Date;
    initialEndDate?: Date;
    onChange?: (startDate: Date, endDate: Date) => void;
    dateFormat?: string;
    placeholder?: string;
    className?: string;
    includeTime?: boolean;
    defaultTime?: string;
    props?: any;
}

export function DatePicker({isRange, initialStartDate, initialEndDate, onChange, placeholder = getDatePlaceholder(), className, includeTime, defaultTime, ...props}: DatePickerProps) {

    const initialState = isRange ? {
        from: initialStartDate,
        to: initialEndDate,
    } : initialStartDate;

    const [date, setDate] = React.useState<DateRange | Date | undefined>(initialState);

    const [time, setTime] = React.useState(defaultTime);

    const handleSelect = (dates) => {
        if (isRange) {
            setDate(dates);
            onChange?.(dates.from, dates.to);
        }
        else {
            setDate(dates as Date);

            if (includeTime && time) {
                const timeDate = new Date(dates as Date);
                timeDate.setHours(parseInt(time.split(":")[0]));
                timeDate.setMinutes(parseInt(time.split(":")[1]));
                onChange?.(timeDate, timeDate);
            }
            else {
                onChange?.(dates, dates)
            }
        }
    }

    const handleTimeChange = (time) => {
        setTime(time);
        if (date) {
            const timeDate = new Date(date as Date);
            timeDate.setHours(parseInt(time.split(":")[0]));
            timeDate.setMinutes(parseInt(time.split(":")[1]));
            onChange?.(timeDate, timeDate);
        }
    }


    const getDisplayValue = () => {
        if (isRange) {
            // @ts-expect-error - TS doesn't understand that date is a DateRange
            return `${dateParser(date?.from) || placeholder} - ${dateParser(date?.to) || placeholder}`;
        }
        else if (date) {
            return dateParser(date);
        }
        return placeholder;
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !(date) && "text-muted-foreground", className
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getDisplayValue()}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center" >
                {/* @ts-expect-error - TS doesn't understand that date is a DateRange */}
                <Calendar
                    initialFocus
                    mode={isRange ? "range" : "single"}
                    //selected={isRange ? [startDate, endDate] : startDate}
                    onSelect={handleSelect}
                    selected={isRange ? date as DateRange: date as Date}
                />
                {
                    includeTime ? (
                        <div className="w-full">
                            <TimePicker value={time} onChange={handleTimeChange} />
                        </div>

                    ) : null
                }
            </PopoverContent>
        </Popover>
    )
}
