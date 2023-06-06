import React from 'react';
import Avatar from "../Avatar/Avatar.jsx";
import {Link} from "react-router-dom";

const PendingFriendRequestCard = () => {

    const data = [
        {fullName: "John Abham", avatar: "",},
        {fullName: "John Abham", avatar: "",},
        {fullName: "John Abham", avatar: "",},
        {fullName: "John Abham", avatar: "",},

    ]


    return (
        <div className="card w-[250px]">

            <div className="card-meta">
                <h4>Friend Request</h4>
                <Link to="/">See all</Link>
            </div>

            <div className="mt-6">{data.map((item, i) => (
                <div className="mb-5" key={i}>

                    <div className="flex items-center mb-2">
                        <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                        <div className="ml-3">
                            <h3 className="text-base font-medium text-neutral-700">{item.fullName}</h3>
                            <p className="text-gray-600 text-sm">3 hours ago</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <button className="btn btn-primary">asdlfkj</button>
                        <button className="btn">asdlfkj</button>
                    </div>
                </div>
            ))}

            </div>
        </div>
    );
};

export default PendingFriendRequestCard;