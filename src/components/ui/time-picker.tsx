import {useState} from "react";


const TimePicker = ({ value, onChange }) => {
    const [time, setTime] = useState(value);

    const handleTimeChange = (e) => {
        setTime(e.target.value);
        onChange(e.target.value);
    };

    return (
        <div className="flex flex-col">
            <p className="text-gray-700">
                Time
            </p>
            <input
                type="time"
                className="p-2 outline-none w-full h-10 border-2 border-secondary hover:border-gray-200 cursor-pointer rounded-lg"
                value={time}
                onChange={handleTimeChange}
            />
        </div>

    );
}

export default TimePicker;