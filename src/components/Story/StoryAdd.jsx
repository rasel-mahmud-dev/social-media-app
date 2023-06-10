import React from 'react';
import {BiPlus} from "react-icons/bi";

const StoryAdd = ({onClick, avatar}) => {
    return (
        <div>
            <div className="story card !p-0 m-0 shadow-none">
                <div className="story-thumb">
                    <img src={avatar} alt=""/>
                </div>

                <div className="story-btn " onClick={onClick}>
                    <BiPlus/>
                </div>

                <div className="create w-full color_p">
                    <p className="text-xs">Create Story</p>
                </div>

            </div>

        </div>
    );
};

export default StoryAdd;