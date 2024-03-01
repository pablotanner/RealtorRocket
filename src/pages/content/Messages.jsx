import {Input} from "../../components/ui/input.tsx";
import {useContext, useEffect, useState} from "react";
import {Button} from "../../components/ui/button.tsx";
import SocketContext from "../../services/contexts/SocketContext.js";
import {useGetUserQuery} from "../../services/api/userApi.js";
import {useSelector} from "react-redux";
import {selectAllMessages, selectGroupedMessages} from "../../services/slices/messageSlice.js";
import {
    ChatContainer,
    ChatHeader,
    ChatList,
    ChatListItem,
    Message,
    MessageInput,
    MessageList
} from "../../components/ui/chat.tsx";


const Messages = () => {
    const socket = useContext(SocketContext)
    const {data: user} = useGetUserQuery();

    const messagesByChat = useSelector(state => selectGroupedMessages(state))



    const [receiverId, setReceiverId] = useState(null);

    const [receiver, setReceiver] = useState(null);

    const [content, setContent] = useState('');



    const sendMessage = () => {
        try{
            const message = {
                type: "text",
                content: {
                    text: content,
                },
                receiverId: Number(receiverId),
            }
            if (socket) {
                socket.emit("send_message", message)
            } else {
                console.error("Socket not connected")
            }
        }
        catch (e) {
            //pass
        }
    }



    return (
        <div>
            <h1>Messages</h1>

            <div className="flex gap-2">
                <ChatList>
                    {Object.keys(messagesByChat).map((chatKey) => {
                        const chat = messagesByChat[chatKey];

                        const otherUser = chat[0].senderId === user.data?.id ? chat[0].receiver : chat[0].sender;
                        return (
                            <ChatListItem
                                key={chatKey}
                                user={otherUser}
                                active={receiverId === otherUser.id}
                                lastMessage={chat && chat?.length > 0 ? chat[0].content.text : null}
                                onClick={() => {
                                    if (receiverId === otherUser.id) {
                                        setReceiverId(null)
                                        setReceiver(null)
                                    }
                                    else {
                                        setReceiverId(otherUser.id)
                                        setReceiver(otherUser)
                                    }
                                }}
                            />
                        )
                    })}
                </ChatList>

                <ChatContainer hidden={!receiverId}>
                    <ChatHeader>
                        <p className="text-lg font-500">
                            {receiver?.firstName} {receiver?.lastName}
                        </p>
                    </ChatHeader>
                    <MessageList>
                        {Object.keys(messagesByChat).map((chatKey) => {
                            const chat = messagesByChat[chatKey];
                            const otherUser = chat[0].senderId === user.data?.id ? chat[0].receiver : chat[0].sender;
                            if (receiverId === otherUser.id) {
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