import React, {useEffect} from 'react';
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

        if (!(openChatUser && openChatUser?.groupId)) return

        let message = e.target.message.value
        dispatch(sendPrivateMessageAction({
            message,
            groupId: openChatUser.groupId
        }))
    }

    useEffect(() => {
        if (openChatUser.groupId) {
            dispatch(fetchPrivateMessageAction({groupId: openChatUser.groupId}))
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
                        handleSendMessage={handleSendMessage}
                    />
                )}
            </div>


        </div>
    );
};

export default ChatWithFriend;