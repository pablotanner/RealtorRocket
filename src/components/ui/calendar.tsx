import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import {cn} from "../../utils.ts";

import { buttonVariants } from "./button.tsx"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
                      className,
                      classNames,
                      showOutsideDays = true,
                      ...props
                  }: CalendarProps) {


    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn("p-1", className)}
            classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-2",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-600",
                nav: "space-x-1 flex items-center",
                nav_button: cn(
                    buttonVariants({ variant: "outline" }),
                    "h-7 w-7 bg-transparent text-primary p-0 opacity-75 hover:opacity-100"
                ),
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell:
                    "text-muted-foreground rounded-md w-9 font-500 text-gray-700 text-[0.85rem]",
                row: "flex w-full mt-[2px]",
                cell: cn("h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent  first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full  focus-within:relative focus-within:z-20", props?.mode==="single" ? "[&:has([aria-selected])]:rounded-full" : ""),
                day: cn(
                    buttonVariants({ variant: "ghost" }),
                    "h-9 w-9 p-0 font-400 aria-selected:opacity-100 rounded-full",
                ),
                day_range_end: "day-range-end",
                day_selected:
                    "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: " text-primary hover:text-primary focus:text-primary",
                day_outside:
                    "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle:
                    "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible",
                ...classNames,
            }}
            components={{
                IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
                IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
                DayContent: ({ date, ...props }) => {
                    return (
                        <div className="flex flex-col items-center justify-center h-full w-full">
                            {date.getDate()}
                            <div className="flex gap-[1px]">
                                {props?.activeModifiers?.maintenance && <div className="w-1 h-1 bg-red-500 rounded-full"/>}
                                {props?.activeModifiers?.rent && <div className="w-1 h-1 bg-green-500 rounded-full"/>}
                                {props?.activeModifiers?.lease && <div className="w-1 h-1 bg-indigo-500 rounded-full"/>}
                                {props?.activeModifiers?.other && <div className="w-1 h-1 bg-gray-500 rounded-full"/>}
                            </div>
                        </div>
                    )
                }
            }}
            {...props}
        />
    )
}
Calendar.displayName = "Calendar"

export { Calendar }
