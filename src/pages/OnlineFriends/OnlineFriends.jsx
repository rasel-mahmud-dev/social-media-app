import React, {useEffect} from 'react';
import ActiveFriend from "src/components/ActiveFriend/ActiveFriend.jsx";
import {useDispatch, useSelector} from "react-redux";
import PendingFriendRequestCard from "src/components/PendingFriendRequestCard/PendingFriendRequestCard.jsx";


import {fetchAuthFriendsAction, fetchPeoplesAction} from "src/store/actions/userAction.js";
import {openChatUserAction, closeChatUserAction} from "src/store/slices/chatSlice.js";
import channelName from "src/utils/channelName.js";
import Chat from "components/ChatWithFriend/Chat.jsx";
import {fetchPrivateMessageAction, sendPrivateMessageAction} from "src/store/actions/chatAction.js";

const OnlineFriends = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchPeoplesAction())
        dispatch(fetchAuthFriendsAction())
    }, [])

    const {openChatUser } = useSelector(state=>state.chatState)


    function handleStartChat(friend){
        if(!auth) return;
        dispatch(openChatUserAction({
            ...friend,
            channelName: channelName(auth._id, friend._id)
        }))
    }

    const {friends, pendingFriends, auth } = useSelector(state=>state.authState)
    const {messages} = useSelector(state => state.chatState)


    function handleSendMessage(message) {
        if(!openChatUser) return

        dispatch(sendPrivateMessageAction({
            sender: auth._id,
            recipientId: openChatUser._id,
            message,
            channelName: openChatUser.channelName
        }))
    }

    useEffect(() => {
        if(!openChatUser) return
        dispatch(fetchPrivateMessageAction({channelName: openChatUser?.channelName}))
    }, [openChatUser])


    function handleChat(){
        dispatch(closeChatUserAction())
    }

    return (
        <div>
            <ActiveFriend handleStartChat={handleStartChat} auth={auth} friends={friends}/>
            <PendingFriendRequestCard   className="mt-4" auth={auth} pendingFriends={pendingFriends} />


            {openChatUser &&  <Chat handleClose={handleChat} className="mobile-chat"
                openChatUser={openChatUser}
                messages={messages}
                auth={auth}
                onSendMessage={handleSendMessage}
            /> }

        </div>
    );
};

export default OnlineFriends;