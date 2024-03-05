import * as React from "react"

import {cn} from "../../utils.ts";
import {DatePicker} from "./date-picker.tsx";
import {useSelector} from "react-redux";
import {CurrencySymbol} from "../../utils/magicNumbers.js";
import {getLang} from "../../utils/formatters.js";
import CurrencyInput  from "react-currency-input-field";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
      const currency = useSelector((state: any) => state.authSlice.userInfo.currencyCode) || "USD";

      const currencySymbol = CurrencySymbol[currency];

      const locale = getLang();


      if (type === "date" || type === "datetime-local") {
          const {value, onChange,  ...rest} = props;

          return (
              <>
                  {/* @ts-expect-error silence */}
                  <DatePicker value={value} onChange={onChange} allowTime={type === "datetime-local"} {...rest}  />

              </>
          )
      }

      else if (type === "currency") {

          const {value, onChange, name, onBlur, id, placeholder} = props;
          const onValueChange = (value: string, name: string, values: any) => {
              if (value === "" || value === null || value === undefined) {
                  // @ts-expect-error silence
                  onChange({target: {value: null, name: name, values: values}});
                  return
              }
              // @ts-expect-error silence
              onChange({target: {value: value, name: name, values: values}});

          }
          
          const getPadding = (currencySymbol: string) => {
                if (currencySymbol.length === 1) {
                    return "px-7"
                }
                if (currencySymbol.length === 2) {
                    return "px-8"
                }
                return "px-9"
          }

          return (
              <div className="relative">
                  <span className="absolute top-0 left-0 pl-3 pt-2 text-muted-foreground">{currencySymbol}</span>
                  <span className="absolute top-0 right-0 pr-3 pt-2 text-muted-foreground">{currency}</span>

                  <CurrencyInput
                      intlConfig={{locale}}
                      allowDecimals={false}
                      maxLength={10}
                      allowNegativeValue={false}
                      className={cn(getPadding(currencySymbol), "flex h-10 w-full rounded-md border border-input bg-white py-2 text-sm placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)}
                      name={name}
                      id={id}
                      placeholder={placeholder}
                      value={value}
                      onBlur={onBlur}
                      onValueChange={onValueChange}
                  />

              </div>

          )
      }

      return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
