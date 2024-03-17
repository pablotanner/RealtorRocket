import * as React from "react"

import {cn} from "../../utils.ts";
import {useEffect} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger} from "./select.tsx";

const Tabs = ({ children, className, defaultValue, value, ...props }) => {
    const [selectedTabValue, setSelectedTabValue] = React.useState(defaultValue)

    useEffect(() => {
        if (value) setSelectedTabValue(value)
    },[value])


    const injectedChildren = React.Children.map(children, (child) => {
        // @ts-expect-error it does exist
        if (React.isValidElement(child) && child.type.displayName === "TabsList") {
            return React.cloneElement(child, {
                // @ts-expect-error no problem
                selectedTabValue,
                setSelectedTabValue,
                defaultValue
            })
        }
        // @ts-expect-error it does exist
        if (React.isValidElement(child) && child.type.displayName === "TabsContent" && child.props.value === selectedTabValue) {
            return child;
        }
    })

    return (
        <div className={cn("flex flex-col gap-4",className)} {...props}>
            {injectedChildren}
        </div>
    )
}

Tabs.displayName = "Tabs"


const TabsList = ({ children, className, disableSelect, ...props }) => {
    const { selectedTabValue, setSelectedTabValue, defaultValue } = props;

    const injectedChildren = React.Children.map(children, (child) => {
        // @ts-expect-error it does exist
        if (React.isValidElement(child) && child.type.displayName === "TabsItem") {
            return React.cloneElement(child, {
                // @ts-expect-error no problem
                isActive: selectedTabValue === child.props.value,
                // @ts-expect-error no problem
                handleClick: () => setSelectedTabValue(child.props.value),
            })
        }
    })

    if (disableSelect) return (
        <div className={cn("flex flex-row overflow-auto", className)} {...props}>
            {injectedChildren}
        </div>
    )

    else {

        return (
            <>
                <Select onValueChange={setSelectedTabValue} value={selectedTabValue ?? injectedChildren[0].props.value}>
                    <SelectTrigger className={cn("flex flex-row gap-2 sm:hidden", className)} {...props}>
                        {(injectedChildren.find((child) => child.props.isActive) || injectedChildren[0]).props.children}
                    </SelectTrigger>
                    <SelectContent>
                        {injectedChildren.map((child, index) => {
                            const {children, ...rest} = child.props;
                            return <SelectItem {...rest} key={index}>{children}</SelectItem>
                        })}
                    </SelectContent>
                </Select>

                <div className={cn("hidden sm:flex flex-row overflow-auto", className)} {...props}>
                    {injectedChildren}
                </div>
            </>

        )
    }

}


TabsList.displayName = "TabsList"


const TabsItem = ({children, className, value, onClick, ...props }) => {
    const { isActive, handleClick } = props;

    return (
        <div
            data-active={isActive}
            onClick={() => {
                handleClick();
                if (onClick) {
                    onClick();
                }
            }}
            className={cn("flex gap-2 items-center cursor-pointer rounded-t-md text-muted-foreground font-500 px-4 py-2 border-b-2 border-transparent hover:muted-foreground transition-colors data-[active='true']:border-primary data-[active='true']:text-primary hover:bg-secondary"
            , className)}
            {...props}
        >
            {children}
        </div>
    )
}

TabsItem.displayName = "TabsItem"

const TabsContent = ({ children, className, value, ...props }) => {
    return (
        <div
            className={className} {...props}>
            {children}
        </div>
    )
}

TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsItem, TabsContent }
