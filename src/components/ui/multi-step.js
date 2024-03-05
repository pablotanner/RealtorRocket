//import {Progress} from "./progress.tsx";
import React from "react";
import {cn} from "../../utils.ts";
import {UserIcon} from "lucide-react";

export const Progress = ({ currentStep, steps, onPageNumberClick, className }) => {

    return (
        <div className="w-[90%] flex flex-col md:flex-row md:pl-16 pr-4 items-center">
            {steps?.map((step, index) => {
                const disabled = index > 0 && steps[index - 1].status !== "complete";

                return (
                    <>
                        <div key={index} className="flex flex-row items-center">
                            <div
                                onClick={() => !disabled && onPageNumberClick(index)}
                                className={cn("cursor-pointer flex flex-col items-center justify-start", currentStep === index ? "text-primary-dark" : "text-gray-700", disabled ? "cursor-not-allowed" : "cursor-pointer")}
                            >
                                <div
                                    aria-selected={currentStep === index}
                                    className={cn("p-3 z-10 relative border border-secondary bg-white shadow-sm rounded-md w-fit", currentStep < index ? "text-gray-500" : "text-gray-700", disabled ? "text-gray-400" : "", "aria-selected:ring-2 aria-selected:ring-primary-dark/70")}
                                >
                                    {step?.icon}

                                    <div className={cn("absolute bottom-1 left-16 md:left-0 md:right-0 md:-bottom-7 lg:-bottom-12 leading-tight flex flex-col justify-center items-start md:items-center whitespace-pre", className)}>
                                        <p className={cn("text-sm lg:text-sm font-500 ")}>
                                            {step?.title}
                                        </p>
                                        <p  className={cn("flex md:hidden lg:flex text-xs md:text-sm font-300")}>
                                            {step?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            index < steps.length - 1 && (
                                <div className={cn("w-[2px] md:w-full h-16 md:h-[2px] z-0", currentStep <= index ? "bg-gray-200" : "bg-gray-700")}/>
                            )
                        }
                    </>
                )
            })}

        </div>

    );
};