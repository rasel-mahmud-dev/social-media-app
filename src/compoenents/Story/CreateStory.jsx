import React from 'react';
import "./story.scss"
import {BiPlus} from "react-icons/bi";


const CreateStory = ({fullName, avatar, storyAsset, onChange}) => {
    return (
        <div className="story">
            <div className="story-thumb">
                <img src={avatar} alt=""/>
                <div className="story-btn" onClick={onChange}>
                    <BiPlus />
                </div>
            </div>


            <div className="create">
                <p>Create Story</p>
            </div>

        </div>
    );
};

export default CreateStory;