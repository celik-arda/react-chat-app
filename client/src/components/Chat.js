import React, {useContext, useEffect} from "react";
import MainContext from "../context/MainProvider";

const Chat = () => {

    const {room, setRoom, username, setUsername, socket, chatScreen, setChatScreen, message, setMessage, allMessages, setAllMessages} = useContext(MainContext);

    useEffect(() => {
        socket.on("returnedMessage", data => {
            setAllMessages((prev) => [...prev, data]);
        })
    }, [socket])
    console.log("useEffect : ",allMessages);
    
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
        console.log("sendMessage Func : ",allMessages);
    }

    return (
        <div className="w-12/12 h-[600px] bg-indigo-300 flex flex-col justify-stretch">
            <div className="text-message-area w-12/12 h-[480px] outline-slate-300 rounded-md">
                {/* Display messages here! */}
                <h2>{message}</h2>
            </div>
            <div className="flex justify-center gap-x-4">
                <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className="w-8/12 h-9 rounded-md" />
                <button type="submit" onClick={sendMessage} className="w-2/12 bg-lime-400 rounded-md">Send</button>
            </div>
        </div>
    )
};

export default Chat;
