import React from 'react';
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {BiChevronLeft} from "react-icons/bi";
import "./chat.scss"

const Chat = ({openChatUser, messages, className = "", auth, handleClose, handleSendMessage}) => {
    return (
        <div className={className}>
            <div>

                <div className="flex chat-header">
                    <div className="quit-chat-btn circle circle-hover" onClick={handleClose}>
                        <BiChevronLeft className="text-xl"/>
                    </div>

                    <div className="flex items-center gap-x-2 ">
                        <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" username="ER SDF"
                                src={openChatUser?.avatar}/>
                        <div className="flex flex-col">
                            <label className="text-sm">{openChatUser.fullName}</label>
                            <span className="text-xs font-medium text-primary-400">Online</span>
                        </div>
                    </div>
                </div>


                <div className="message-list">
                    {messages[openChatUser?.channelName] && messages[openChatUser?.channelName]?.map((msg) => (
                        <div className={`msg-item ${msg.senderId === auth?._id ? "your-msg" : ""}`} key={msg._id}>
                            <li>{msg.message}</li>
                        </div>
                    ))}
                </div>


                <form onSubmit={handleSendMessage} className="mt-1">
                            <textarea className="input-elemtextarea" placeholder="Wrire mesasge"
                                      name="message"></textarea>
                    <button className="btn btn-primary" type={"submit"}>Send</button>
                </form>


            </div>
        </div>
    );
};

export default Chat;