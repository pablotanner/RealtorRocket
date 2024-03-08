import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import {cn} from "../../utils.ts";

const badgeVariants = cva(
    "inline-flex items-center rounded-full border cursor-pointer px-2 py-[2px] text-xs font-500 capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-red-600 bg-red-100 text-red-600 hover:bg-red-200",
                outline: "text-foreground bg-white border-border",
                positive: "border-green-400/60 bg-green-50 text-emerald-700",
                blue: "border-indigo-300 bg-indigo-50 text-indigo-500 hover:bg-indigo-100/80",
                negative: "border-red-300 bg-red-50 text-red-700",
                purple: "border-purple-300 bg-purple-50 text-purple-500 hover:bg-purple-100/80",
                pink: "border-pink-300/60 bg-pink-50 text-pink-600",
                neutral: "border-gray-300 bg-gray-50 text-gray-600",
                warning: "border-amber-400/50 bg-yellow-50 text-orange-700",
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
