import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import "./chat-with-friend.scss"


import {
    getChatRoomMessagesAction,
    sendPrivateMessageAction
} from "src/store/actions/chatAction.js";

import Chat from "components/ChatWithFriend/Chat.jsx";
import playSound from "src/notification/sound.js";

const ChatWithFriend = ({openChatUser, auth, friend}) => {

    const dispatch = useDispatch()

    const {messages} = useSelector(state => state.chatState)

    function handleSendMessage(message) {

        if (!(openChatUser && openChatUser?.roomId)) return

        dispatch(sendPrivateMessageAction({
            message,
            roomId: openChatUser.roomId
        })).unwrap().then(()=>{
            playSound("/send-messenger.mp3")
        })
    }

    useEffect(() => {
        if (openChatUser.roomId) {
            dispatch(getChatRoomMessagesAction({roomId: openChatUser.roomId}))
        }
    }, [openChatUser])

    return (
        <div className="card p-0 fixed bottom-3 right-3 quick-chat-popup">
            <div>
                {openChatUser && (
                    <Chat
                        openChatUser={openChatUser}
                        messages={messages}
                        auth={auth}
                        handleClose={() => dispatch(openChatUserAction(null))}
                        onSendMessage={handleSendMessage}
                    />
                )}
            </div>


        </div>
    );
};

export default ChatWithFriend;