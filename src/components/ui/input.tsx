import * as React from "react"

import {cn} from "../../utils.ts";
import {DatePicker} from "./date-picker.tsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

      if (type === "date") {
          const defaultValue = props.defaultValue ? new Date(props.defaultValue as string) as Date : null;

          return (
              <>
                  {/*@ts-expect-error using all props  */}
                  <DatePicker
                      {...props}
                      initialStartDate={defaultValue}
                      className={cn(
                          "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                          className
                      )}
                  />
              </>

          )
      }
      else if (type === "datetime-local") {
            return (
                <>
                    {/*@ts-expect-error using all props  */}
                    <DatePicker
                        includeTime
                        defaultTime={props.defaultValue as string}
                        className={cn(
                            "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                        {...props}
                    />
                </>

            )
      }

      return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
