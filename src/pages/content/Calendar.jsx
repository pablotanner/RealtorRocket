import {Calendar as CalendarComponent}  from '../../components/ui/calendar.tsx'
import {useState} from "react";
import {nextSaturday, previousSunday} from "date-fns";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../../components/ui/accordion.tsx";
import {useSelector} from "react-redux";
import {getAllEvents, getEventDates, getEventsForRange} from "../../services/slices/eventSlice.js";

const Calendar = () => {

    const getDatesToSelect = (date) => {
        if (date.getDay() === 0) {
            return {
                from: date,
                to: nextSaturday(date)
            }
        }
        else if (date.getDay() === 6) {
            return {
                from: previousSunday(date),
                to: date
            }
        }
        else {
            return {
                from: previousSunday(date),
                to: nextSaturday(date)
            }
        }
    }


    const [dayRange, setDayRange] = useState(() => {
        return getDatesToSelect(new Date());
    })

    const detailedEvents = useSelector(state => getAllEvents(state));

    const events = useSelector(state => getEventDates(state))


    const selectedEvents = useSelector(state => getEventsForRange(state, dayRange.from, dayRange.to));


    const UpcomingEvents = () => {
        const unpackedEvents = [];

        for (const key in detailedEvents) {
            const events = detailedEvents[key];
            for (const event of events) {
                // If the event is in the future, we want to display it
                if (event.date > new Date()) unpackedEvents.push(event);
            }
        }

        unpackedEvents.sort((a, b) => a.date - b.date);

        unpackedEvents.length = 3;

        return (
                <ul className="flex flex-col gap-1">
                    {unpackedEvents.map((event, index) => {
                        return (
                            <li key={index} className="flex flex-row gap-2 ml-5 ">
                                -<div className="font-500">{event.title}: </div>
                                <div>{event.date.toLocaleDateString()}</div>
                            </li>
                        )
                    })}
                </ul>
        )
    }

    const EventsInSelectedRange = () => {
        const unpackedEvents = [];

        for (const key in selectedEvents) {
            const events = selectedEvents[key];
            for (const event of events) {
                unpackedEvents.push(event);
            }
        }

        unpackedEvents.sort((a, b) => a.date - b.date);


        return (
            <div>
                <h className="text-xl">Events in selected range</h>
                <ul className="flex flex-col gap-1">
                    {unpackedEvents.map((event, index) => {
                        return (
                            <li key={index} className="flex flex-row gap-2 ">
                                <div className="font-500">{event.title}: </div>
                                <div>{event.date.toLocaleDateString()}</div>
                            </li>
                        )
                    })}

                    {unpackedEvents.length === 0 && <div>No events in selected range</div>}
                </ul>
                </div>
        )
    }


    const selectWeek = (day) => {
        setDayRange(getDatesToSelect(day));
    }

    return (
        <>
            <h1>
                Your Calendar
            </h1>
            <div className="flex flex-row gap-2 min-w-fit flex-wrap">

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
                        fixedWeeks
                        onDayClick={selectWeek}
                        modifiers={{ ...events }}
                    />

                    <Accordion type="multiple" collapsible={true}>
                        <AccordionItem value="upcoming">
                            <AccordionTrigger>Upcoming</AccordionTrigger>
                            <AccordionContent>
                                Your next three events are:
                                <UpcomingEvents/>
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

                <EventsInSelectedRange/>



            </div>
        </>
    )
}

export default Calendar;