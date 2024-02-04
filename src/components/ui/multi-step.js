//import {Progress} from "./progress.tsx";
import React from "react";

const Progress = ({ value, steps, onPageNumberClick, blockedSteps }) => {

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
                    data-blocked={blockedSteps[i]}
                    style={{ left: `${(((i) / (steps - 1)) * 100)-5}%` }} // Adjusted calculation here
                    className="absolute top-[-12px] h-[30px] text-gray-400 bg-white border-gray-200 border-2 data-[filled=true]:bg-primary-dark data-[filled=true]:text-white data-[filled=true]:border-primary-dark w-[30px] rounded-full items-center cursor-pointer justify-center flex text-sm data-[blocked=true]:bg-gray-200 X data-[blocked=true]:text-gray-400 data-[blocked=true]:border-gray-200 data-[blocked=true]:cursor-not-allowed data-[blocked=true]:hover:bg-gray-200 data-[blocked=true]:hover:text-gray-400 data-[blocked=true]:hover:border-gray-200 data-[blocked=true]:hover:cursor-not-allowed data-[blocked=false]:hover:bg-primary-dark data-[blocked=false]:hover:text-white data-[blocked=false]:hover:border-primary-dark"
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

    // Extract the desired property from each child
    const blockedSteps = React.Children.map(props.children, child => {
        return child.props['data-blocked'] === true;
    });



    return (
        <span className="w-full" {...props}>
            <div className="px-4 py-4">
                <Progress value={props.page} blockedSteps={blockedSteps}  steps={childrenArray.length} onPageNumberClick={props.onPageNumberClick} />
            </div>
            {childrenArray[props.page]}
        </span>
    )

}

export default MultiStep;