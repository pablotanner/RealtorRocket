import * as React from "react"

import {cn} from "../../utils.ts";

const Tabs = ({ children, className, defaultValue, ...props }) => {
    const [selectedTabValue, setSelectedTabValue] = React.useState(defaultValue)

    const injectedChildren = React.Children.map(children, (child) => {
        // @ts-expect-error it does exist
        if (React.isValidElement(child) && child.type.displayName === "TabsList") {
            return React.cloneElement(child, {
                // @ts-expect-error no problem
                selectedTabValue,
                setSelectedTabValue,
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


const TabsList = ({ children, className, ...props }) => {
    const { selectedTabValue, setSelectedTabValue } = props;

    const injectedChildren = React.Children.map(children, (child) => {
        // @ts-expect-error it does exist
        if (React.isValidElement(child) && child.type.displayName === "TabsItem") {
            return React.cloneElement(child, {
                // @ts-expect-error no problem
                isActive: selectedTabValue === child.props.value,
                // @ts-expect-error no problem
                onClick: () => setSelectedTabValue(child.props.value),
            })
        }
    })

    return (
        <div className={cn("flex flex-row overflow-auto", className)} {...props}>
            {injectedChildren}
        </div>
    )
}


TabsList.displayName = "TabsList"


const TabsItem = ({ children, className, value, ...props }) => {
    const { isActive, onClick } = props;

    return (
        <div
            data-active={isActive}
            onClick={onClick}
            className={cn("flex gap-2 items-center cursor-pointer rounded-t-md text-gray-600 font-500 px-4 py-2 border-b-2 border-transparent hover:border-gray-700 transition-colors data-[active='true']:border-gray-700 data-[active='true']:text-gray-800 hover:bg-secondary"
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
