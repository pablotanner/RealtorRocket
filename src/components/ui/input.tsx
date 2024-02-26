import * as React from "react"

import {cn} from "../../utils.ts";
import {DatePicker} from "./date-picker.tsx";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {

      if (type === "date" || type === "datetime-local") {
          const {value, onChange,  ...rest} = props;

          return (
              <>
                  {/* @ts-expect-error silence */}
                  <DatePicker value={value} onChange={onChange} allowTime={type === "datetime-local"} {...rest}  />

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
