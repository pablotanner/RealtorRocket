import {Avatar, AvatarFallback, AvatarImage} from "./avatar.tsx";
import {cn} from "../../utils.ts";
import {format} from "date-fns";
import {dateParser} from "../../utils/formatters.js";


const ChatContainer = ({className, children, ...props}) => {
    return (
        <div className={cn("w-full h-screen border border-secondary relative", className)}
             {...props}
        >
            {children}
        </div>
    )
}


const ChatHeader = ({className, children, ...props}) => {
    return (
        <div className={cn("w-full p-4 border-b border-secondary", className)}
             {...props}
        >
            {children}
        </div>
    )
}

const MessageList = ({className, children, ...props}) => {
    return (
            <div
                className={cn("flex flex-col-reverse gap-8 p-4 overflow-auto", className)}
                {...props}
            >
                {children}
            </div>
        )
}

const Message = ({className, children, message, isSender, ...props}) => {
    const MessageRenderer = ({message}) => {
        switch (message?.type.toLowerCase()) {
            case "text":
                return <p>{message.content?.text}</p>
            case "image":
                return <img src={message.content?.imageUrl} alt="image"/>
            default:
                return <p>Unknown Content</p>
        }
    }

    // If message was today, show time, else show date
    const getMessageTime = ({timestamp}) => {
        const messageDate = new Date(timestamp)
        const today = new Date()
        if (messageDate.toDateString() === today.toDateString()) {
            return format(messageDate, "HH:mm")
        } else {
            return dateParser(messageDate)
        }
    }


    return (
        <div {...props} className={cn(isSender ? "ml-auto" : "mr-auto")}>
            <div className={cn("p-2 rounded-lg mb-1", isSender ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black', className)}>
                <MessageRenderer message={message}/>
            </div>
            <div className={cn("flex items-center gap-2", isSender ? "float-end" : "float-start")}>
                <p className="text-gray-500">
                    {getMessageTime(message)}
                </p>

                <Avatar className="w-6 h-6 rounded-full">
                    <AvatarFallback className="rounded-none text-sm text-gray-500" >
                        {message?.sender?.firstName?.charAt(0)}{message?.sender?.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

const MessageInput = ({className, children, ...props}) => {
    return (
        <div {...props}>
            {children}
        </div>
    )
}


const ChatList = ({className, children, ...props}) => {
    return (
        <div
            className={cn("flex flex-col gap-2 p-1", className)}
            {...props}
        >
            {children}
        </div>
    )
}

const ChatListItem = ({className, children, ...props}) => {
    const {user, active, lastMessage} = props

    return (
        <div
            data-active={active}
            className={cn("flex flex-row items-center min-w-[250px] data-[active='true']:bg-secondary/80 whitespace-nowrap gap-2 cursor-pointer px-2 py-1 hover:bg-secondary rounded-md", className)}
             {...props}
        >
            <Avatar className="w-10 h-10 rounded-full">
                <AvatarFallback className="rounded-none text-lg" >
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="font-500">{user?.firstName} {user?.lastName}</p>

                {lastMessage && <p className="text-gray-500 text-sm">{lastMessage}</p>}
            </div>

        </div>
    )

}


export { ChatContainer, ChatHeader, MessageList, Message, MessageInput, ChatList, ChatListItem}
