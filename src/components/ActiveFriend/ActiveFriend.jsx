import React from 'react';
import {Link} from "react-router-dom";
import Avatar from "src/components/Avatar/Avatar.jsx";

const ActiveFriend = ({handleStartChat, friends, auth}) => {

    function renderItem(user, friend){
        return (
            <div onClick={()=>handleStartChat({
                ...user,
                friendId: friend._id,
                _id: friend.senderId === auth._id ? friend.receiverId : friend.senderId
            })} key={user.id} className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-x-2 ">
                    <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" src={user?.avatar} username="ER SDF"/>
                    <label htmlFor="" className="text-sm">{user?.fullName}</label>
                </div>
                <span className="online"></span>
            </div>
        )
    }

    return (
        <div>
            <div className="card">
                <div className="card-meta">
                    <h4>Active Friends</h4>
                    <Link to="/friends">See all</Link>
                </div>

                {auth && friends?.map((friend)=> friend?.status === "accepted" && (
                    renderItem(friend.receiverId === auth._id ? friend.sender : friend.receiver, friend)
                ))}
            </div>
        </div>
    );
};

export default ActiveFriend;