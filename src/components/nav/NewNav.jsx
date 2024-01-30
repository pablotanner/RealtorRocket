import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip.tsx";
import {Button} from "../ui/button.tsx";
import {useNavigate} from "react-router-dom";



const NewNav = ({items, isCollapsed}) => {

    const navigate = useNavigate();

    return (
        <div
            data-collapsed={isCollapsed}
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {/* eslint-disable-next-line react/prop-types */}
                {items.map((item, index) =>
                    isCollapsed ? (
                        <Tooltip key={index}>
                            <TooltipTrigger>
                                <Button size="icon" onClick={() => navigate(item.url)}>
                                    {item.icon}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="flex items-center gap-4">
                                {item.title}
                                {item.label && (
                                    <span className="ml-auto text-muted-foreground">
                                        {item.label}
                                    </span>
                                )}
                            </TooltipContent>
                        </Tooltip>
                    ) : (
                        <Button size="icon" key={index} onClick={() => navigate(item.url)}>
                            {item.icon}
                            {item.title}
                            {item.label && (
                                <span>
                                    {item.label}
                                </span>
                            )}
                        </Button>
                    ))
                }
            </nav>
        </div>
    )
}

export default NewNav;