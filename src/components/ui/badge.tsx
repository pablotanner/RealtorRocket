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
                outline: "text-foreground border-border",
                positive: "border-green-400/60 bg-green-50 dark:bg-green-800/30 text-emerald-700 dark:text-emerald-200",
                blue: "border-indigo-300 bg-indigo-50 dark:bg-indigo-800/30 text-indigo-500 dark:text-indigo-200",
                negative: "border-red-300 bg-red-50 dark:bg-red-700/20 text-red-700 dark:text-red-600",
                purple: "border-purple-300 bg-purple-50 dark:bg-purple-800/30 text-purple-500 dark:text-purple-200",
                pink: "border-pink-300/60 bg-pink-50 dark:bg-pink-800/30 text-pink-600 dark:text-pink-300",
                neutral: "border-gray-300 bg-gray-50 dark:bg-gray-800/60 text-gray-600 dark:text-gray-200",
                warning: "border-amber-400/50 bg-yellow-50 dark:bg-yellow-800/30 text-orange-700 dark:text-orange-300",
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
