import React from 'react';

import a from "src/assets/icon/rDn9lunE0kk.png"
import Button from "components/Shared/Button/Button.jsx";

const Rooms = ({group}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h4 className="color_h2 font-medium text-base">Create</h4>
                <a href="" className="text-blue text-sm">See more</a>
            </div>
            <img className="block mx-auto" src={a} alt=""/>

            <div className="color_p text-center">
                <div className="font-medium">Get the group together on video chat</div>
                Create a room to instantly connect to other members on video chat.
            </div>
            <Button className="btn-primary block mx-auto mt-3 mb-1">Create room</Button>
        </div>
    );
};

export default Rooms;