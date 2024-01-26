import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import {cn} from "../../utils.ts";

const buttonVariants = cva(
  "inline-flex items-center font-600 justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/70",
          light: "bg-secondary text-primary hover:bg-secondary/70",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline: "border border-secondary border-2 text-secondary bg-transparent hover:bg-secondary hover:text-accent-foreground",
          "outline-dark": "border border-off-black border-2 text-off-black bg-transparent hover:bg-white/80 hover:text-accent-foreground",
          "outline-primary": "border border-primary-dark border-2 text-off-black bg-transparent hover:bg-white/80 hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 ",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          gradient: "bg-gradient-to-r from-primary to-primary-dark hover:from-primary/80 hover:to-primary-dark/80 text-white",
          link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 rounded-md px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-9 md:h-11 rounded-md px-3 md:px-8 text-xs md:text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
      return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
