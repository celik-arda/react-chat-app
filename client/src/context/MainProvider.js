import React, { useState, createContext } from "react";
import io from 'socket.io-client'

const MainContext = createContext();

const socket = io.connect("http://localhost:5000");

export const MainProvider = ({children}) => {

    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [chatScreen, setChatScreen] = useState(false);
    
    const contextValues = {
        room,
        setRoom,
        username,
        setUsername,
        chatScreen,
        setChatScreen,
        socket
    }

    return <MainContext.Provider value={contextValues}>{children}</MainContext.Provider>;
};

export default MainContext;
