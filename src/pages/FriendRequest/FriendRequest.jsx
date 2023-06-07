import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFriendAction, confirmFriendRequestAction, fetchPeoplesAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";

const FriendRequest = () => {
const dispatch = useDispatch()

    const { pendingFriends } = useSelector(state=>state.authState)

    function handleAddFriend(_id) {
        console.log(_id)
        dispatch(addFriendAction(_id))
    }

    function handleAcceptFriendRequest(senderId){
        dispatch(confirmFriendRequestAction({senderId}))
    }

    return (
        <HomeLayout>
            <div className="card">

                <div className="card-meta">
                    <div className="flex items-center gap-x-2">
                        <h4>Friend Request</h4>
                        <Link to="/friends"><h4>My Friends</h4></Link>
                    </div>

                </div>

                <div className="mt-6">{
                    pendingFriends.map((friend, i) => (
                    <div className="mb-5" key={i}>

                        <div className="flex items-center mb-2">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" src={friend?.avatar} username={friend.fullName}/>
                            <div className="ml-3">
                                <h3 className="text-base font-medium text-neutral-700">{friend.fullName}</h3>
                                <p className="text-gray-600 text-sm">3 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <button onClick={()=>handleAcceptFriendRequest(friend.senderId)} className="btn btn-primary">Accept</button>
                            <button className="btn">Profile</button>
                        </div>
                    </div>
                ))}

                </div>
            </div>
        </HomeLayout>
    );
};

export default FriendRequest;