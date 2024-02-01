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
          light: "bg-secondary text-primary-darker hover:bg-secondary/70",
          dark: "bg-off-black text-white hover:bg-zinc-700",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline: "border border-secondary border-2 text-off-black bg-transparent hover:bg-secondary hover:text-accent-foreground",
          "outline-dark": "border border-off-black border-2 text-off-black bg-transparent hover:bg-gray-100 hover:text-accent-foreground",
          "outline-primary": "border border-primary-dark border-2 text-off-black bg-transparent hover:bg-white/80 hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          gradient: "bg-gradient-to-r from-primary to-primary-dark hover:from-primary/80 hover:to-primary-dark/80 text-white",
          link: "text-primary underline-offset-4 hover:underline",
          "nav-button": "text-muted-foreground bg-inherit justify-start hover:bg-[#EFEFEF] hover:text-[#000002] font-500",
          "nav-button-active": "text-[#000002] bg-[#EFEFEF] justify-start font-600 shadow-sm",
      },
      size: {
        default: "h-10 rounded-md px-5 py-2",
        sm: "h-9 rounded-md px-4",
        md: "h-8 rounded-md px-4 text-sm",
        lg: "h-9 md:h-11 rounded-md px-3 md:px-8 text-xs md:text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const svgFill = {
    default: "white",
    light: "lightgray",
    dark: "white",
    destructive: "white",
    outline: "black",
    "outline-dark": " ",
    "outline-primary": "",
    secondary: " ",
    ghost: "text-white",
    gradient: "white",
    link: " none",
}

const svgStroke = {
    default: "fill-primary-darkest stroke-primary-darkest",
    light: "fill-primary-darker stroke-primary-darker",
    dark: "fill-black stroke-black",
    destructive: "fill-rose-800 stroke-rose-800",
    outline: "fill-gray-100 stroke-gray-100",
    "outline-dark": "fill-off-black stroke-off-black",
    "outline-primary": "fill-primary-dark stroke-primary-dark",
    secondary: "fill-off-black stroke-off-black",
    ghost: "stroke-white",
    gradient: "fill-primary-darkest",
    link: " ",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
      if (isLoading ) {
          return (
              <button type="button"  className={cn(buttonVariants({ variant, size, className })) + " pointer-events-none"}>
                  <svg aria-hidden="true" role="status" className="inline mr-2 w-4 h-4 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill={svgFill[variant] || svgFill["default"]} d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"></path>
                      <path className={svgStroke[variant] || svgStroke["default"]} d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"></path>
                  </svg>
                  Loading...
              </button>

          )
      }

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
