import { CheckIcon, ChevronsUpDown } from "lucide-react";

import * as React from "react";

import * as RPNInput from "react-phone-number-input";

import flags from "react-phone-number-input/flags";

import { Button } from "./button.tsx"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./command.tsx"
import { Input, InputProps } from "./input.tsx"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover.tsx"

import {cn} from "../../utils.ts";

type PhoneInputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange: (value: RPNInput.Value) => void;
    value: RPNInput.Value;
};

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
        ({ className, onChange, ...props }, ref) => (
            <RPNInput.default
                ref={ref}
                className={cn("flex", className)}
                flagComponent={FlagComponent}
                countrySelectComponent={CountrySelect}
                inputComponent={InputComponent}
                /**
                 * Handles the onChange event.
                 *
                 * react-phone-number-input might trigger the onChange event as undefined
                 * when a valid phone number is not entered. To prevent this,
                 * the value is coerced to an empty string.
                 *
                 * @param {E164Number | undefined} value - The entered value
                 */
                onChange={(value) => onChange(value || "")}
                {...props}
            />
        ),
    );
PhoneInput.displayName = "PhoneInput";

const InputComponent = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => (
        <Input
            className={cn("rounded-s-none rounded-e-lg", className)}
            {...props}
            ref={ref}
        />
    ),
);
InputComponent.displayName = "InputComponent";

type CountrySelectOption = { label: string; value: RPNInput.Country };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    onChange: (value: RPNInput.Country) => void;
    options: CountrySelectOption[];
};

const CountrySelect = ({
                           disabled,
                           value,
                           onChange,
                           options,
                       }: CountrySelectProps) => {
    const handleSelect = React.useCallback(
        (country: RPNInput.Country) => {
            onChange(country);
        },
        [onChange],
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant={"outline"}
                    className={cn("flex gap-1 border border-input rounded-e-none rounded-s-lg pr-1 pl-3")}
                    disabled={disabled}>
                    <FlagComponent country={value} countryName={value} />
                    <ChevronsUpDown
                        className={cn(
                            "h-4 w-4 opacity-50",
                            disabled ? "hidden" : "opacity-100",
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px]">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search country..." />
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                            {options
                                .filter((x) => x.value)
                                .map((option) => (
                                    <CommandItem
                                        className="gap-2"
                                        key={option.value}
                                        onSelect={() => handleSelect(option.value)}>
                                        <FlagComponent
                                            country={option.value}
                                            countryName={option.label}
                                        />
                                        <span className="text-sm flex-1">{option.label}</span>
                                        {option.value && (
                                            <span className="text-sm text-foreground/50">
                        {`+${RPNInput.getCountryCallingCode(option.value)}`}
                      </span>
                                        )}
                                        <CheckIcon
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                option.value === value ? "opacity-100" : "opacity-0",
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return (
        <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20">
      {Flag && <Flag title={countryName} />}
    </span>
    );
};
FlagComponent.displayName = "FlagComponent";

export { PhoneInput };