import {Calendar as CalendarComponent}  from '../../components/ui/calendar.tsx'
import {useState} from "react";
import {nextSaturday, previousSunday} from "date-fns";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../components/ui/accordion.tsx";

const Calendar = () => {
    const events = {
        maintenance: [new Date(2024, 1, 6), new Date(2024, 1, 7)],
        lease: [new Date(2024, 1, 6), new Date(2024, 1, 8)],
        rent: [new Date(2024, 1, 6)],
        other: [new Date(2024, 1, 6)]
    }


    const [dayRange, setDayRange] = useState({
        from: previousSunday(new Date()),
        to: nextSaturday(new Date())
    });

    const selectWeek = (day) => {
        // If selected day is a Sunday, we want to select the previous week
        if (day.getDay() === 0) {
            setDayRange({
                from: day,
                to: nextSaturday(day)
            })
            return;
        }
        else if (day.getDay() === 6) {
            setDayRange({
                from: previousSunday(day),
                to: day
            })
            return;
        }

        setDayRange({
            from: previousSunday(day),
            to: nextSaturday(day)
        })
    }

    return (
        <div className="flex flex-row gap-2 min-w-fit">
            <div className="flex flex-col gap-2 w-fit">
                <div className="text-xl">
                    Week
                    <p className="text-sm">
                        {dayRange.from.toLocaleDateString()} - {dayRange.to.toLocaleDateString()}
                    </p>
                </div>
                <CalendarComponent
                    selected={dayRange}
                    mode="range"
                    today={null}
                    fixedWeeks
                    onDayClick={selectWeek}
                    modifiers={{ ...events }}
                />

                <Accordion type="multiple" collapsible defaultValue="upcoming">
                    <AccordionItem value="upcoming">
                        <AccordionTrigger>Upcoming</AccordionTrigger>
                        <AccordionContent>
                            Your next events are:
                            <ul>
                                <li>Event 1</li>
                                <li>Event 2</li>
                                <li>Event 3</li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="categories" open>
                        <AccordionTrigger>Categories</AccordionTrigger>
                        <AccordionContent className="max-w-fit">
                            <div className="capitalize text-gray-800 font-300 flex flex-col">
                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-1 h-1 bg-red-500 rounded-full"/>
                                    Maintenance
                                </div>

                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-1 h-1 bg-blue-500 rounded-full"/>
                                    Lease
                                </div>

                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-1 h-1 bg-green-500 rounded-full"/>
                                    Rent
                                </div>

                                <div className="flex flex-row items-center gap-2">
                                    <div className="w-1 h-1 bg-gray-500 rounded-full"/>
                                    Other
                                </div>

                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>

            <div
                className="min-h-full w-[1px] bg-gray-100"
            />

            <div>

            </div>


        </div>
    )
}

export default Calendar;