import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import {cn} from "../../utils.ts";
import {FaCheck} from "react-icons/fa6";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[19px] w-[19px] shrink-0 rounded-sm border-[1px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:border-input dark:data-[state=unchecked]:border-muted-foreground data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground disabled:text-muted-foreground disabled:data-[state=checked]:border-gray-400 disabled:data-[state=checked]:text-gray-400 disabled:bg-muted disabled:data-[state=unchecked]:border-gray-400  disabled:data-[state=checked]:bg-gray-100",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center text-center justify-center ")}
    >
      <FaCheck className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
