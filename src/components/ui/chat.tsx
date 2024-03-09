import {Avatar, AvatarFallback, AvatarImage} from "./avatar.tsx";
import {cn} from "../../utils.ts";
import {format, formatDistanceToNow} from "date-fns";
import {dateParser} from "../../utils/formatters.js";
import React from "react";
import {User} from "../../utils/classes.ts";


const ChatContainer = ({className, children, ...props}) => {
    return (
        <div className={cn("w-full border-2 border-border rounded-sm relative", className)}
             {...props}
        >
            {children}
        </div>
    )
}


const ChatHeader = ({className, children, ...props}) => {
    return (
        <div className={cn("w-full p-4 border-b-2 border-border", className)}
             {...props}
        >
            {children}
        </div>
    )
}

const MessageList = ({className, children, ...props}) => {
    return (
            <div
                className={cn("flex flex-col-reverse gap-8 p-6 overflow-auto max-h-[50vh]", className)}
                {...props}
            >
                {children}
            </div>
        )
}

const Message = ({className, children, message, isSender, ...props}) => {
    const MessageRenderer = ({message}) => {
        switch (message?.type?.toLowerCase()) {
            case "text":
                return <p>{message.content?.text}</p>
            case "image":
                return <img src={message.content?.imageUrl} alt="image" className="rounded-lg"/>
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
            <div className={cn("p-2 rounded-lg mb-1 text-sm md:text-md", isSender ? 'bg-blue-500 text-white' : 'bg-secondary text-foreground', message.type === "image" ? "p-0" : "", className)}>
                <MessageRenderer message={message}/>
            </div>
            <div className={cn("flex flex-row items-center gap-2", isSender ? "float-end" : "float-start flex-row-reverse")}>
                <p className="text-muted-foreground">
                    {getMessageTime(message)}
                </p>

                <Avatar className="w-7 h-7 rounded-full">
                    <AvatarFallback className="rounded-none text-sm text-muted-foreground" >
                        {message?.sender?.firstName?.charAt(0)}{message?.sender?.lastName?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}

const MessageInput = ({className, children, ...props}) => {
    return (
        <div className={cn("flex flex-row gap-2 p-2", className)} {...props}>
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


    let lastMessageTime: string, lastMessageText: string | undefined = undefined;

    if (lastMessage) {
        // if lastMessageTime is less than 1 minute, show "just now"
        lastMessageTime = formatDistanceToNow(new Date(lastMessage?.timestamp), {addSuffix: true})
        if (lastMessageTime === "less than a minute ago") {
            lastMessageTime = "now"
        }
        lastMessageText = lastMessage?.content?.text

        if (!lastMessageText) {
            lastMessageText = lastMessage?.type === "image" ? "Image" : "No messages"
        }

        if (lastMessageText?.length > 25) {
            lastMessageText = lastMessageText?.substring(0, 25) + "..."
        }
    }

    return (
        <div
            data-active={active}
            className={cn("flex flex-row justify-start items-center min-w-[275px] data-[active='true']:bg-secondary/80 whitespace-nowrap gap-2 cursor-pointer px-2 py-1 hover:bg-secondary rounded-md", className)}
             {...props}
        >
            <Avatar className="w-12 h-12 rounded-full">
                <AvatarFallback className="rounded-none text-xl" >
                    {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </AvatarFallback>
            </Avatar>
            <div className="w-full flex flex-col">
                <div className="flex items-center justify-between w-full">
                    <p className="font-500 text-sm text-foreground">{user?.firstName} {user?.lastName}</p>
                    {lastMessageTime && <p className="text-muted-foreground text-xs max-w-[50%] text-ellipsis text-wrap text-right">{lastMessageTime}</p>}
                </div>

                {lastMessageText && <p className="text-muted-foreground text-xs">{lastMessageText}</p>}

            </div>

        </div>
    )

}


export { ChatContainer, ChatHeader, MessageList, Message, MessageInput, ChatList, ChatListItem}
