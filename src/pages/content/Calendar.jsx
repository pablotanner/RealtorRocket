import {Calendar as CalendarComponent}  from '../../components/ui/calendar.tsx'
import {useState} from "react";
import {addDays, nextSaturday, previousSunday} from "date-fns";

const Calendar = () => {



    const events = {
        maintenance: [new Date(2024, 1, 6), new Date(2024, 1, 7)],
        lease: [new Date(2024, 1, 6), new Date(2024, 1, 8)],
        rent: [],
        other: []
    }



    const [dayRange, setDayRange] = useState({
        from: previousSunday(new Date()),
        to: nextSaturday(new Date())
    });

    const selectWeek = (day) => {
        setDayRange({
            from: previousSunday(day),
            to: nextSaturday(day)
        })
    }

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
                <div className="text-xl">
                    Week <br/>
                    <p className="text-sm">
                        {dayRange.from.toLocaleDateString()} - {dayRange.to.toLocaleDateString()}
                    </p>
                </div>
                <CalendarComponent
                    selected={dayRange}
                    mode="range"
                    today={null}
                    onDayClick={selectWeek}
                    fixedWeeks
                    modifiers={{ ...events }}
                />

                <div className="text-xl">
                    Your Events and Appointments <br/>
                    <p className="text-sm">
                        None!
                    </p>
                </div>
            </div>

            <div
                className="min-h-full w-[1px] bg-gray-100"
            />

            <div>
                Show detailed view of selected week, and any events/appointments.
                Also option to create new events/appointments.
                Whenever possible, events should be generated automatically (lease start/end dates, maintenance dates, etc.)

            </div>


        </div>
    )
}

export default Calendar;