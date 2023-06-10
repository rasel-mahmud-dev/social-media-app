import React from 'react';
import staticImage from "src/utils/staticImage.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import "./avatar.scss"


const AvatarGroup = ({data = [], imgClass = "", className = ""}) => {
    return (
        <div>
            <div
                className="flex flex-wrap items-center gap-x-0 users-avatar-list mt-1">
                {data && data.map((item, i) => (
                    <Avatar
                        key={i} src={staticImage(item.avatar)}
                        username={item.fullName}
                        className={className}
                        imgClass={imgClass}/>
                ))}

            </div>
        </div>
    );
};

export default AvatarGroup;