import React, {useEffect} from 'react';
import {TiTimes} from "react-icons/ti";
import {useDispatch, useSelector} from "react-redux";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import Avatar from "src/components/Avatar/Avatar.jsx";
import "./chat-with-friend.scss"


import {fetchPrivateMessageAction, sendPrivateMessageAction} from "src/store/actions/chatAction.js";

const ChatWithFriend = ({openChatUser, auth, friend}) => {

    const dispatch = useDispatch()

    const {messages} = useSelector(state=>state.chatState)

    function handleSendMessage(e) {
        e.preventDefault();

        let message = e.target.message.value
        dispatch(sendPrivateMessageAction({
            sender: auth._id,
            recipientId: friend._id,
            message,
            channelName: openChatUser.channelName
        }))
    }

    useEffect(()=>{
        dispatch(fetchPrivateMessageAction({channelName: openChatUser.channelName}))
    }, [openChatUser])

    return (
        <div className="card fixed bottom-3 right-3 quick-chat-popup">

            <div className="fixed right-6">
                <TiTimes onClick={() => dispatch(openChatUserAction(null))}/>
            </div>

            <div>
                {openChatUser && (
                    <div>
                        <div className="flex items-center gap-x-2 ">
                            <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" username="ER SDF"
                                    src={openChatUser?.avatar}/>
                            <label htmlFor="" className="text-sm">{openChatUser.fullName}</label>
                        </div>


                        <div className="message-list">
                            {messages[openChatUser.channelName] && messages[openChatUser.channelName].map((msg)=>(
                                <div className={`msg-item ${msg.senderId === auth?._id ? "your-msg": ""}`} key={msg._id}>
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
                )}
            </div>


        </div>
    );
};

export default ChatWithFriend;