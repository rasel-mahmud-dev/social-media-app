import React from 'react';
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {BiChevronLeft} from "react-icons/bi";
import "./chat.scss"
import {TiTimes} from "react-icons/ti";
import MessageList from "components/MessageList/MessageList.jsx";

const Chat = ({openChatUser, messages, className = "", auth, handleClose, onSendMessage}) => {

    function handleChange(e) {
        if (e.keyCode === 13) {
            onSendMessage(e.target.value.trim())
            e.target.value = ""
        }
    }

    function handleSendMessage(e) {
        e.preventDefault();
        const message = e.target.message.value
        onSendMessage(message)
        e.target.message.value = ""
    }

    return (
        <div className={className}>
            <div>

                <div className="flex chat-header p-4 relative">
                    <div className="flex md:hidden quit-chat-btn circle circle-hover" onClick={handleClose}>
                        <BiChevronLeft className="text-xl"/>
                    </div>

                    <div className="flex items-center gap-x-2 ">
                        <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" username={openChatUser?.fullName}
                                src={openChatUser?.avatar}/>
                        <div className="flex flex-col">
                            <label className="text-sm color_h1">{openChatUser.fullName}</label>
                            <span className="text-xs font-medium text-primary">Online</span>
                        </div>

                        <div className="absolute right-2 top-2 !h-8 !w-8 color_h1 circle circle-hover">
                            <TiTimes onClick={handleClose}/>
                        </div>


                    </div>
                </div>


                <MessageList
                    auth={auth}
                    openChatUser={openChatUser}
                    messages={messages[openChatUser?.roomId] && messages[openChatUser?.roomId] || []}
                />


                {/*<div className="message-list p-4">*/}
                {/*    {messages[openChatUser?.roomId] && messages[openChatUser?.roomId]?.map((msg) => (*/}
                {/*        <div className={`msg-item ${msg.senderId === auth?._id ? "your-msg" : ""}`} key={msg._id}>*/}
                {/*            <li>{msg.message}</li>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}


                <form onSubmit={handleSendMessage} className="mt-1 p-4">
                            <textarea onKeyDown={handleChange} className="input-elemtextarea"
                                      placeholder="Wrire mesasge"
                                      name="message"></textarea>
                    <button className="btn btn-primary" type={"submit"}>Send</button>
                </form>


            </div>
        </div>
    );
};

export default Chat;