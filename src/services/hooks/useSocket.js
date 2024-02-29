
import io from "socket.io-client";
import {useEffect} from "react";

const SOCKET_URL = import.meta.env.VITE_API_URL;


export function useSocket(token) {
    useEffect(() => {
        const socket = io(SOCKET_URL, {auth: {token}, withCredentials: true});

        socket.on('connect', () => {
            console.log('Connected to server');
        })

        return () => socket.disconnect();
    }, [token])

}