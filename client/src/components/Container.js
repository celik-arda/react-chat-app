import React, {useContext} from "react";
import Room from './Room'
import Chat from './Chat'
import MainContext from "../context/MainProvider";

const Container = () => {

    const {setChatScreen, chatScreen} = useContext(MainContext);

    return (
        <div>
            {
                chatScreen === false ?
                <Room /> : <Chat />
            }
        </div>
    )
};

export default Container;
