import {Input} from "../../components/ui/input.tsx";
import {useContext, useEffect, useState} from "react";
import {Button} from "../../components/ui/button.tsx";
import SocketContext from "../../services/contexts/SocketContext.js";
import {useGetUserQuery} from "../../services/api/userApi.js";
import {useSelector} from "react-redux";
import {selectAllMessages, selectMessagesByUser} from "../../services/slices/messageSlice.js";


const Notifications = () => {
    const socket = useContext(SocketContext)
    const {data: user} = useGetUserQuery();
    const messages = useSelector(state => selectAllMessages(state))

    const messagesByReceiver = useSelector(state => selectMessagesByUser(state))

    const [receiverId, setReceiverId] = useState('');

    const [subject, setSubject] = useState('');

    const [content, setContent] = useState('');


    const [error, setError] = useState(null);


    const sendMessage = () => {
        try{
            const message = {
                subject: subject,
                content: content,
                receiverId: Number(receiverId),
            }
            if (socket) {
                socket.emit("send_message", message)
            } else {
                console.error("Socket not connected")
            }
            setError(null)
        }
        catch (e) {
            setError(error)
        }
    }


    return (
        <div>
            <h1>Notifications</h1>


            {
                error && (
                    <div className="p-2 bg-red-200 border border-red-800 rounded-xl text-red-800">
                        Something went wrong, make sure to use a valid receiver ID (number, try your own ID)
                    </div>
                )
            }

            <div className="flex flex-col gap-2">
                Your ID is: {user?.data.id}
                <Input type="text" placeholder="ReceiverID" value={receiverId} onChange={(e) => setReceiverId(e.target.value)} />
                <Input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
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
                        <h3>{message.subject}</h3>
                        <p>{message.content}</p>
                    </div>
                )
            })}

        </div>
    )
}

export default Notifications;