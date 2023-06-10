import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    confirmFriendRequestAction,
    removeFriendAction
} from "src/store/actions/userAction.js";


import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";
import HomeLayoutLink from "pages/HomeLayoutLink/HomeLayoutLink.jsx";

const RequestSend = () => {

const dispatch = useDispatch()

    const { pendingFriends, auth } = useSelector(state=>state.authState)

    function renderPendingRequest(people, friend){

        return (
            <div>
                <div className="flex items-center mb-2">
                    <Avatar imgClass="text-xs" className="!w-9 !h-9" src={people?.avatar} username={people.fullName}/>
                    <div className="ml-3">
                        <h3 className="text-base font-medium text-neutral-700">{people.fullName}</h3>
                        <p className="text-gray-600 text-sm">3 hours ago</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    {
                        friend.senderId === auth._id ? (
                            <button onClick={()=>dispatch(removeFriendAction({friendId: friend._id, user: friend.receiver}))} className="btn btn-primary">Cancel Request</button>
                        ): (
                            <button onClick={()=>dispatch(confirmFriendRequestAction({friendId: friend._id, userId: friend.senderId}))} className="btn btn-primary">Confirm Request</button>
                        )
                    }
                    <button className="btn">Profile</button>
                </div>
            </div>
        )
    }

    return (
        <HomeLayout>
            <HomeLayoutLink />
            <div className="card">

                <div className="card-meta">
                    <div className="flex items-center gap-x-2">
                        <h4>Friend Request Send</h4>
                    </div>

                </div>


                    <div className="mt-6">{
                        pendingFriends.map((friend) => (friend.receiverId !== auth._id) && (
                            <div className="mb-5" key={friend._id}>
                                {   renderPendingRequest(friend.receiver, friend)}
                            </div>
                        ))}
                    </div>



            </div>
        </HomeLayout>
    );
};

export default RequestSend;