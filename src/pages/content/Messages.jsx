import {Input} from "../../components/ui/input.tsx";
import {useContext, useEffect, useState} from "react";
import {Button} from "../../components/ui/button.tsx";
import SocketContext from "../../services/contexts/SocketContext.js";
import {useGetUserQuery} from "../../services/api/userApi.js";
import {useSelector} from "react-redux";
import {selectAllMessages, selectGroupedMessages} from "../../services/slices/messageSlice.js";


const Messages = () => {
    const socket = useContext(SocketContext)
    const {data: user} = useGetUserQuery();
    const messages = useSelector(state => selectAllMessages(state))

    const messagesByChat = useSelector(state => selectGroupedMessages(state))


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




    const [receiverId, setReceiverId] = useState('');

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

            <div className="flex flex-col gap-2">
                Your ID is: {user?.data.id}
                <Input type="text" placeholder="ReceiverID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
                <Input type="text" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <Button onClick={sendMessage} variant="gradient">
                    Send
                </Button>
            </div>

            {messages.map((message, index) => {
                return (
                    <div key={index}>
                        <div className="flex flex-row justify-between">
                            <p>From: {message.senderId}</p>
                            <p>To: {message.receiverId}</p>
                        </div>
                        <MessageRenderer message={message}/>
                    </div>
                )
            })}

        </div>
    )
}

export default Messages;