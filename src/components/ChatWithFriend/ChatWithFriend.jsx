import React, {useEffect} from 'react';
import {TiTimes} from "react-icons/ti";
import {useDispatch, useSelector} from "react-redux";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import "./chat-with-friend.scss"


import {fetchPrivateMessageAction, sendPrivateMessageAction} from "src/store/actions/chatAction.js";
import Chat from "components/ChatWithFriend/Chat.jsx";

const ChatWithFriend = ({openChatUser, auth, friend}) => {

    const dispatch = useDispatch()

    const {messages} = useSelector(state => state.chatState)

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

    useEffect(() => {
        dispatch(fetchPrivateMessageAction({channelName: openChatUser.channelName}))
    }, [openChatUser])

    return (
        <div className="card fixed bottom-3 right-3 quick-chat-popup">

            <div className="fixed right-6">
                <TiTimes onClick={() => dispatch(openChatUserAction(null))}/>
            </div>

            <div>
                {openChatUser && (
                    <Chat
                        openChatUser={openChatUser}
                        messages={messages}
                        auth={auth}
                        handleSendMessage={handleSendMessage}
                    />
                )}
            </div>


        </div>
    );
};

export default ChatWithFriend;