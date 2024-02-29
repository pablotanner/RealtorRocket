
import io from "socket.io-client";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {addMessage} from "../slices/messageSlice.js";

const SOCKET_URL = import.meta.env.VITE_API_URL;


export function useSocket(token) {
    const [socket, setSocket] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
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
            dispatch(addMessage(newMessage));
        });


        return () => newSocket.disconnect();

    }, [token]);

    return socket;
}