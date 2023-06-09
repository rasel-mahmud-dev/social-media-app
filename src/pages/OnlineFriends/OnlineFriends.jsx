import React from 'react';
import ActiveFriend from "src/components/ActiveFriend/ActiveFriend.jsx";
import {useSelector} from "react-redux";
import PendingFriendRequestCard from "src/components/PendingFriendRequestCard/PendingFriendRequestCard.jsx";

const OnlineFriends = () => {


    const {friends, pendingFriends, auth } = useSelector(state=>state.authState)

    return (
        <div>
            <ActiveFriend friends={friends}/>
            <PendingFriendRequestCard   className="mt-4" auth={auth} pendingFriends={pendingFriends} />
        </div>
    );
};

export default OnlineFriends;