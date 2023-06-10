import React from 'react';
import Avatar from "../Shared/Avatar/Avatar.jsx";
import {Link} from "react-router-dom";
import {confirmFriendRequestAction} from "src/store/actions/userAction.js";
import {useDispatch} from "react-redux";

const PendingFriendRequestCard = ({pendingFriends  = [], handleRemoveFriend,  auth, className = ""}) => {

    const dispatch = useDispatch()

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
                            <button onClick={()=>handleRemoveFriend(friend._id)} className="btn btn-primary">Cancel</button>
                        ): (
                            <button onClick={()=>dispatch(confirmFriendRequestAction({friendId: friend._id, userId: friend.receiverId}))} className="btn btn-primary">Confirm</button>
                        )
                    }
                    <button className="btn">Profile</button>
                </div>
            </div>
        )
    }


    return (
        <div className={`card ${className}`}>

            <div className="card-meta">
                <h4>Friend Request</h4>
                <Link to="/friend-request-received">See all</Link>
            </div>

            <div className="mt-6">{pendingFriends.map((item, i) => (
                item.receiverId === auth._id && renderPendingRequest(item.sender, item)
                // <div className="mb-5" key={i}>
                //
                //     <div className="flex items-center mb-2">
                //         <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                //         <div className="ml-3">
                //             <h3 className="text-base font-medium text-neutral-700">{item.fullName}</h3>
                //             <p className="text-gray-600 text-sm">3 hours ago</p>
                //         </div>
                //     </div>
                //
                //     <div className="flex items-center gap-x-2">
                //         <Button onClick={()=>handleAcceptFriendRequest(item.senderId)} className="btn btn-primary">Confirm</Button>
                //         <Button className="btn">Reject</Button>
                //     </div>
                // </div>
            ))}

            </div>
        </div>
    );
};

export default PendingFriendRequestCard;