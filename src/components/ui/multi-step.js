//import {Progress} from "./progress.tsx";
import React from "react";

const Progress = ({ value, steps, onPageNumberClick }) => {

    /*
    let stepPercentage = 0;
    if (value === 0) {
        stepPercentage = 16;
    } else if (value === 1) {
        stepPercentage = 49.5;
    } else if (value === 2) {
        stepPercentage = 82.5;
    } else if (value === 3) {
        stepPercentage = 100;
    } else {
        stepPercentage = 0;
    }
     */

    const stepPercentage = Math.min(((value / (steps - 1)) * 100) + 15,100);

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full relative">
            <div
                style={{ width: `${stepPercentage}%` }}
                className="h-2 bg-primary-dark rounded-full flex"
            />
            {Array.from({ length: steps }).map((_, i) => (
                <div
                    data-filled={i <= value}
                    key={i}
                    style={{ left: `${(((i) / (steps - 1)) * 100)-5}%` }} // Adjusted calculation here
                    className="absolute top-[-12px] h-[30px] text-gray-400 bg-white border-gray-200 border-2 data-[filled=true]:bg-primary-dark data-[filled=true]:text-white data-[filled=true]:border-primary-dark w-[30px] rounded-full items-center cursor-pointer justify-center flex text-sm"
                    onClick={() => onPageNumberClick(i)}
                >
                    {i+1}
                </div>
            ))}
        </div>
    );
};

const MultiStep = (props) => {
    const childrenArray = React.Children.toArray(props.children);

    return (
        <span className="w-full" {...props}>
            <div className="px-4 py-4">
                <Progress value={props.page} steps={childrenArray.length} onPageNumberClick={props.onPageNumberClick} />
            </div>
            {childrenArray[props.page]}
        </span>
    )

}

export default MultiStep;