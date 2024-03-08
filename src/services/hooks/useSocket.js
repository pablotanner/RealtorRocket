
import io from "socket.io-client";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from "../slices/messageSlice.js";

const SOCKET_URL = import.meta.env.VITE_API_URL;

const FRONTEND_URL = import.meta.env.VITE_PUBLIC_URL;

export function useSocket(token) {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        // If running on localhost but API connected to production, don't connect to socket
        if (!SOCKET_URL.includes("localhost") && FRONTEND_URL.includes("localhost")) return;
        // Initialize the Socket.IO client with the token
        const newSocket = io(SOCKET_URL, {
            auth: {
                token: token,
            },
        });
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Connected to socket");
        });

        newSocket.on('receive_message', (newMessage) => {
            // If message is from the user to the user, don't add it to state (its handled in the chat component)
            if (newMessage.senderId === newMessage.receiverId) {
                return;
            }
            dispatch(addMessage(newMessage));
        });


        return () => newSocket.disconnect();

    }, [token]);

    return socket;
}