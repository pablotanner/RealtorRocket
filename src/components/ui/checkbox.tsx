import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import {cn} from "../../utils.ts";
import {FaCheck} from "react-icons/fa6";
import {BiCheck} from "react-icons/bi";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary-dark ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  data-[state=unchecked]:border-gray-200 data-[state=checked]:bg-primary-dark data-[state=checked]:text-white disabled:text-white disabled:data-[state=checked]:border-gray-400 disabled:data-[state=checked]:text-gray-400 disabled:bg-gray-100 disabled:border-gray-400 disabled:data-[state=checked]:bg-gray-100",
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
