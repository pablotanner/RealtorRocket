//import {Progress} from "./progress.tsx";
import React from "react";
import {cn} from "../../utils.ts";
import {UserIcon} from "lucide-react";



 export const Progress = ({ currentStep, steps, onPageNumberClick }) => {
    // Construct the gridTemplateColumns string dynamically
    // For n steps, there are n-1 separators, leading to a pattern of "auto 1fr" repeated
    const gridTemplateColumns = `repeat(${steps.length}, 1fr) ${steps.length > 1 ? `repeat(${steps.length - 1}, 1fr)` : ''}`;

    return (
        <div className="flex flex-col w-full items-center">
            <div
                className="grid grid-flow-col items-start relative"
                style={{ gridTemplateColumns }}
            >
                {steps.flatMap((step, index) => {
                    const isCurrentStep = currentStep === index;
                    const isDisabled = index > 0 && steps[index - 1].status !== "complete";
                    const handleStepClick = () => !isDisabled && onPageNumberClick(index);

                    // Step with icon and title
                    const stepContent = (
                        <div
                            key={`step-${index}`}
                            onClick={handleStepClick}
                            className={cn("cursor-pointer flex flex-col gap-1 items-center justify-start", currentStep === index ? "text-primary-dark" : "text-gray-700", currentStep < index ? "text-gray-500" : "text-gray-700", isDisabled ? "cursor-not-allowed" : "cursor-pointer", isDisabled ? "text-gray-400" : "")}
                        >
                            <div
                                aria-selected={isCurrentStep}
                                className={cn("p-3 z-10 relative border border-border bg-white shadow-sm rounded-md w-fit", currentStep < index ? "text-gray-500" : "text-gray-700", "aria-selected:ring-2 aria-selected:ring-primary-dark/70")}                            >
                                {step.icon}
                            </div>
                            <p className="text-sm font-500">
                                {step.title}
                            </p>
                            <p className={cn("text-xs font-400 text-center", !isDisabled && "text-gray-500")}>
                                {step.description}
                            </p>
                        </div>
                    );

                    // Separator logic for between steps
                    const separator = index < steps.length - 1 ? (
                        <div
                            key={`separator-${index}`}
                            className={`bg-gray-200 h-[2px]  mt-8 ${currentStep > index ? "bg-primary-dark" : "bg-gray-200"}`}
                        />
                    ) : null;

                    return [stepContent, separator];
                })}
            </div>
        </div>
    );
};


