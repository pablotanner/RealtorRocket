import {Input} from "../../components/ui/input.tsx";
import {useContext, useEffect, useState} from "react";
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
import {ChevronLeft} from "lucide-react";


const Messages = () => {
    const socket = useContext(SocketContext)
    const {data: user} = useGetUserQuery();
    const dispatch = useDispatch();

    const messagesByChat = useSelector(state => selectGroupedMessages(state))

    const [receiver, setReceiver] = useState(null);

    const [content, setContent] = useState("");


    console.log(messagesByChat)

    const sendMessage = () => {
        try{
            const message = {
                type: "text",
                content: {
                    text: content,
                },
                receiverId: Number(41),
            }
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
            setContent("")
        }
        catch (e) {
            //pass
        }
    }



    return (
        <div className="h-[95vh]">
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
                    <ChatHeader className="flex items-center gap-4">
                        <div className="md:hidden p-1 border border-secondary rounded-full text-gray-500 hover:bg-secondary cursor-pointer"
                             onClick={() => setReceiver(null)}
                        >
                            <ChevronLeft className="w-5 h-5"/>
                        </div>

                        <p className="text-lg font-500">
                            {receiver?.firstName} {receiver?.lastName}
                        </p>
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
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <Button onClick={sendMessage}>Send</Button>
                    </MessageInput>
                </ChatContainer>
            </div>
        </div>
    )
}

export default Messages;