import {Calendar as CalendarItem}  from '../../components/ui/calendar.tsx'
import {useState} from "react";

const Calendar = () => {
    // Get the current date
    const now = new Date();

    // Get the day of the week for the current date
    const dayOfWeek = now.getDay();

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - dayOfWeek);

    // Calculate the end of the week (next Sunday)
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Set the initial selected date state to the start and end of the current week
    const [selectedDate, setSelectedDate] = useState([startOfWeek, endOfWeek]);
    const handleWeekSelection = (dates) => {
        const selected = new Date(dates.from);

        // Get the day of the week for the selected date
        const dayOfWeek = selected.getDay();

        // Calculate the start of the week (Sunday)
        const startOfWeek = new Date(selected);
        startOfWeek.setDate(selected.getDate() - dayOfWeek);

        // Calculate the end of the week (next Sunday)
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        // Set the selected date state to the start and end of the week
        setSelectedDate([startOfWeek, endOfWeek]);
    }

    return (
        <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-2">
                <div className="text-xl">
                    Week <br/>
                    <p className="text-sm">
                        {selectedDate[0].toLocaleDateString()} - {selectedDate[1].toLocaleDateString()}
                    </p>
                </div>
                <CalendarItem mode="range" selected={selectedDate} onSelect={handleWeekSelection}/>

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