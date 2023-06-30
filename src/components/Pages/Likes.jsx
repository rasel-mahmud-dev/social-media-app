import React from 'react';
import staticImage from "src/utils/staticImage.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";

const Likes = ({likes = []}) => {
    return (
        <div className="card mt-5">
            {likes.map(like=>(
                <div key={like._id}>
                    <div className="flex items-center gap-x-2">
                        <Avatar className="!w-10 !h-10" imgClass="!w-10 !h-10" src={staticImage(like.user.avatar)} alt=""/>
                    <h4 className="color_h2 font-medium">{like?.user?.fullName}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Likes;