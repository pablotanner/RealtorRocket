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


interface DatePickerProps {
    isRange?: boolean;
    //dates?: [Date, Date];
    initialStartDate: Date;
    initialEndDate: Date;
    onChange?: (startDate: Date, endDate: Date) => void;
    dateFormat?: string;
    placeholder?: string;
}

export function DatePicker({isRange, initialStartDate, initialEndDate, onChange, placeholder = getDatePlaceholder()}: DatePickerProps) {

    const initialState = isRange ? {
        from: initialStartDate,
        to: initialEndDate,
    } : initialStartDate;

    const [date, setDate] = React.useState<DateRange | Date | undefined>(initialState);


    const handleSelect = (dates) => {
        if (isRange) {
            setDate(dates);
            onChange?.(dates.from, dates.to);
        }
        else {
            setDate(dates);
            onChange?.(dates, dates);
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
                        !(date) && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {getDisplayValue()}
                </Button>
            </PopoverTrigger>
            <PopoverContent >
                {/* @ts-expect-error - TS doesn't understand that date is a DateRange */}
                <Calendar
                    initialFocus
                    mode={isRange ? "range" : "single"}
                    //selected={isRange ? [startDate, endDate] : startDate}
                    onSelect={handleSelect}
                    selected={isRange ? date as DateRange: date as Date}
                />
            </PopoverContent>
        </Popover>
    )
}
