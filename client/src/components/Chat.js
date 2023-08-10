import React, {useContext, useEffect} from "react";
import MainContext from "../context/MainProvider";

const Chat = () => {

    const {room, setRoom, username, setUsername, socket, chatScreen, setChatScreen, message, setMessage, allMessages, setAllMessages} = useContext(MainContext);

    useEffect(() => {
        socket.on("returnedMessage", data => {
            setAllMessages((prev) => [...prev, data]);
        })
    }, [socket])
    
    const sendMessage = async () => {
        
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        const messageTime = currentHour + " : " + currentMinute;
        
        const messageContent = {
            username: username,
            message: message,
            room: room,
            date: messageTime
        }

        await socket.emit("message", messageContent);
        await setAllMessages((prev) => [...prev, messageContent]);
        setMessage("");
    }

    return (
        <div className="flex flex-col h-screen  bg-indigo-300">
            <div className="flex-1 overflow-y-auto px-20 py-5">

            {
            allMessages && allMessages.map((message, index) => (
                <div
                key={index}
                className={`flex flex-col ${
                message.username === username ? "items-end" : "items-start"
                }`}
                >
                    <div
                    className={`rounded px-3 py-2 ${
                    message.username === username ? "bg-green-500" : "bg-blue-500"
                    } text-white`}
                    >
                    {message.message}
                    </div>
                    <div
                    className={`text-base ${
                    message.username === username
                        ? "text-right text-green-700"
                        : "text-left text-blue-700"
                    }`}
                    >
                    {message.username}
                    </div>
                </div>
            ))}

            </div>
            <div className="flex justify-center pb-5 px-20 gap-x-4">
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className="w-9/12 h-9 rounded-md" />
                <button type="submit" onClick={sendMessage} className="w-3/12 bg-lime-400 rounded-md">Send</button>
            </div>
        </div>
    )
};

export default Chat;
