import React, { useContext } from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext)


    // After login we want to clear all openned conversations so user after login has to choose 
    const OtherUser = () => {
        if (data.user.displayName === currentUser.displayName) {
            return ""
        }
        else {
            return (data.user.photoURL) ? <> <img className="chatImg" src={(data.user.photoURL)} alt="" /> < span className="chatUserDisplayName" > {data.user?.displayName}</span > </> : ""
        }
    }

    return (
        <div className="chat">
            <div className="chatInfo">
                <div className="chatUser">
                    <OtherUser />

                </div>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    );
};

export default Chat;