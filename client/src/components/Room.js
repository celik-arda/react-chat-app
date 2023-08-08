import React, {useContext} from "react";
import MainContext from '../context/MainProvider'

const Room = () => {

    const {room, setRoom, username, setUsername} = useContext(MainContext);

    const sendRoomInfo = (e) => {
        e.preventDefault();
        console.log("sendRoomInfo çalıştı");
    }

    return (
        <div className="w-12/12 h-[600px] flex justify-center bg-indigo-600">
            <div className="w-10/10 h-full">
                <form className="flex flex-col items-center justify-center w-5/5 h-[540px] pb-24">
                    <label className="w-12/12 h-9 font-semibold">Room Id</label>
                    <input value={room} onChange={(e) => setRoom(e.target.value)} className="w-12/12 h-9 rounded-md mb-8" type="text" />
                    <label className="w-12/12 h-9 font-semibold">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-12/12 h-9 rounded-md mb-8" type="text" />
                    <button onClick={sendRoomInfo} className="w-9/12 h-9 bg-indigo-800 rounded-md">Login</button>
                </form>
            </div>
        </div>
    )
};

export default Room;
