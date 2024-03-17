import {cn} from "../../utils.ts";
import {createContext, useContext} from "react";

const ButtonGroupContext = createContext({
    selectedValue: '',
    setSelectedValue: (value: string) => {}
});


const ButtonGroup = ({value, onValueChange, children, ...props }) => {


    return (
        <ButtonGroupContext.Provider value={{ selectedValue: value, setSelectedValue: onValueChange }}>
            <div className={cn("flex font-500 text-sm whitespace-nowrap text-foreground ")} {...props}>
                {children}
            </div>
        </ButtonGroupContext.Provider>

    )
}

ButtonGroup.displayName = "ButtonGroup"

const ButtonGroupItem = ({ value, children, ...props }) => {
    const { selectedValue, setSelectedValue } = useContext(ButtonGroupContext);


    return (
        <div
            data-active={value === selectedValue}
            className={cn("p-2 h-10 border-input shadow-sm cursor-pointer select-none border border-r-0 data-[active='true']:bg-muted/50 hover:bg-muted/30  first:rounded-l-md last:rounded-r-md last:border-r")}
            onClick={() => setSelectedValue(value)}
            {...props}

        >
            {children}
        </div>
    )
}

ButtonGroupItem.displayName = "ButtonGroupItem"


export { ButtonGroup, ButtonGroupItem }