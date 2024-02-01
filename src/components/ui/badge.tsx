import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {cn} from "../../utils.ts";

const badgeVariants = cva(
    "inline-flex items-center rounded-md border cursor-pointer px-1 py-0 text-xs font-600 capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
                outline: "text-foreground",
                positive: "border-green-300 bg-green-50 text-emerald-600 hover:bg-green-100",
                blue: "border-indigo-300 bg-indigo-50 text-indigo-500 hover:bg-indigo-100/80",
                negative: "border-red-300 bg-red-50 text-red-500 hover:bg-red-100/80",
                purple: "border-purple-300 bg-purple-50 text-purple-500 hover:bg-purple-100/80",
                pink: "border-pink-300 bg-pink-50 text-pink-500 hover:bg-pink-100/80",
                neutral: "border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100/80",
                warning: "border-yellow-300 bg-yellow-50 text-yellow-500 hover:bg-yellow-100/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
