import {Input} from "../../components/ui/input.tsx";
import React, {useContext, useEffect, useState} from "react";
import {Button} from "../../components/ui/button.tsx";
import SocketContext from "../../services/contexts/SocketContext.js";
import {useGetUserQuery} from "../../services/api/userApi.js";
import {useDispatch, useSelector} from "react-redux";
import {addMessage, selectAllMessages, selectGroupedMessages} from "../../services/slices/messageSlice.js";
import {
    ChatContainer,
    ChatHeader,
    ChatList,
    ChatListItem,
    Message,
    MessageInput,
    MessageList
} from "../../components/ui/chat.tsx";
import {ChevronLeft, Image, SendHorizonal} from "lucide-react";
import {Avatar, AvatarFallback} from "../../components/ui/avatar.tsx";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "../../components/ui/dialog.tsx";
import {FormDescription, FormLabel} from "../../components/ui/form.tsx";


const Messages = () => {
    const socket = useContext(SocketContext)
    const {data: user} = useGetUserQuery();
    const dispatch = useDispatch();

    const messagesByChat = useSelector(state => selectGroupedMessages(state))

    const [receiver, setReceiver] = useState(null);

    const [textContent, setTextContent] = useState("");

    const [imageUrl, setImageUrl] = useState("");


    const sendMessage = (type) => {
        if ((!textContent?.length && type === "text") || (!imageUrl && type === "image") || !receiver || !user.data?.id) {
            return;
        }
        try{
            let content;

            if (type === "text") {
                content = {
                    text: textContent,
                }
            } else if (type === "image") {
                content = {
                    imageUrl: imageUrl,
                }
            } else {
                console.error("Invalid message type")
                return;
            }
            const message = {
                type: type,
                content: content,
                receiverId: Number(receiver?.id),
            }
            console.log(message)
            if (socket) {
                socket.emit("send_message", message)

                const messageData = {
                    id: Math.random(),
                    type: message.type,
                    content: message.content,
                    senderId: user.data?.id,
                    receiverId: message.receiverId,
                    sender: user?.data,
                    timestamp: new Date().toISOString(),
                    receiver: receiver
                }


                dispatch(addMessage(messageData))
            } else {
                console.error("Socket not connected")
            }
            setTextContent("")
            setImageUrl("")
        }
        catch (e) {
            console.log(e)
        }
    }




    return (
        <div className="h-[95vh] flex flex-col gap-2">
            <h1>Messages</h1>

            <div className="flex gap-2">
                <ChatList
                    data-chatOpen={receiver ? "true" : "false"}
                    className="data-[chatOpen='true']:hidden md:data-[chatOpen='true']:flex w-full md:w-auto">
                    {Object.keys(messagesByChat).map((chatKey) => {
                        const chat = messagesByChat[chatKey];

                        const otherUser = chat[0].senderId === user.data?.id ? chat[0].receiver : chat[0].sender;
                        return (
                            <ChatListItem
                                key={chatKey}
                                user={otherUser}
                                active={receiver?.id === otherUser.id}
                                lastMessage={chat && chat?.length > 0 ? chat[0] : null}
                                onClick={() => {
                                    if (receiver?.id === otherUser.id) {
                                        setReceiver(null)
                                    }
                                    else {
                                        setReceiver(otherUser)
                                    }
                                }}
                            />
                        )
                    })}
                </ChatList>

                <ChatContainer hidden={!receiver}>
                    <ChatHeader className="flex items-center gap-2">
                        <div className="md:hidden p-1 border border-border rounded-full text-muted-foreground hover:bg-secondary cursor-pointer"
                             onClick={() => setReceiver(null)}
                        >
                            <ChevronLeft className="w-5 h-5"/>
                        </div>

                        <Avatar className="w-10 h-10 rounded-full">
                            <AvatarFallback className="rounded-none text-sm " >
                                {receiver?.firstName?.charAt(0)}{receiver?.lastName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex flex-col">
                            <p className="text-lg font-500 text-foreground" >
                                {receiver?.firstName} {receiver?.lastName}
                            </p>
                            <p hidden={user?.data?.id !== receiver?.id} className="text-muted-foreground text-sm">
                                You
                            </p>
                        </div>



                    </ChatHeader>
                    <MessageList>
                        {Object.keys(messagesByChat).map((chatKey) => {
                            const chat = messagesByChat[chatKey];
                            const otherUser = chat[0].senderId === user.data?.id ? chat[0]?.receiver : chat[0].sender;
                            if (receiver?.id === otherUser.id) {
                                return chat.map((message, index) => {
                                    return (
                                        <Message
                                            key={index}
                                            isSender={message.senderId === user.data?.id}
                                            message={message}
                                        />
                                    )
                                })
                            }
                        })}
                    </MessageList>
                    <MessageInput>
                        <Input
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            placeholder="Message"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage("text")
                                }
                            }}
                        />
                        <Button
                            variant="dark"
                            onClick={() => sendMessage("text")}
                        >
                            <SendHorizonal className="w-5 h-5"/>
                        </Button>

                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="p-4 ml-0"
                                >
                                    <Image className="w-5 h-5"/>
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Send Image
                                    </DialogTitle>
                                </DialogHeader>

                                <div className="flex flex-col gap-1">
                                    <Input
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        placeholder="Image URL"
                                    />
                                    <p className="text-muted-foreground text-sm">
                                        Enter the URL of the image you want to send
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => sendMessage("image")}
                                > Send Image
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </MessageInput>
                </ChatContainer>
            </div>
        </div>
    )
}

export default Messages;