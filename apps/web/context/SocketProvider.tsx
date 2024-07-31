'use client'
import React, {useCallback, useEffect, useContext, useState} from "react";
import {io, Socket} from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface ISocketContext {
    sendMessage: (msg: string) => any;
    messages: string[]
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
    const state = useContext(SocketContext);
    if (!state) throw new Error(`el estado no esta definido`);
    
    return state;
};


export const SocketProvider: React.FC<SocketProviderProps> = ({children}) => {
    const [socket, setSocket] = useState<Socket>()
    const [messages, setMessage] = useState<string[]>([])

    // Funcion para enviar mensajes a traves del socket
    const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
        console.log("Enviar Mensaje", msg);
        if (socket) {
            // Envia el mensaje a traves del socket
            socket.emit('event:message', {message: msg})
        }
    }, 
    [socket]
);

    const onMessageRec = useCallback( (msg:string) => {
        console.log('Mensaje recibido desde el servidor', msg)
        const {message} = JSON.parse(msg) as {message: string}
        setMessage(prev => [...prev, message])
    }, [])

    useEffect(() => {
        const _socket = io("http://localhost:8000")
        _socket.on("message", onMessageRec)
        setSocket(_socket)

        return () => {
            _socket.off("message", onMessageRec)
            _socket.disconnect();
            setSocket(undefined)
        };
    }, []);

    return (
        <SocketContext.Provider value={{sendMessage, messages}}>
            {children}
        </SocketContext.Provider>
    );
};