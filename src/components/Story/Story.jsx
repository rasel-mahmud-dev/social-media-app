import React from 'react';
import "./story.scss"


const Story = ({fullName, avatar, storyAsset}) => {
    return (
        <div className="story story-card" style={{backgroundImage: `url(${storyAsset})`}}>
            <div className="story-image">
                <img src={avatar} alt=""/>
            </div>
            {/*<div>*/}
            {/*    <img src={storyAsset} alt=""/>*/}
            {/*</div>*/}

            <div className="story-username">
                <p>{fullName}</p>
            </div>

        </div>
    );
};

export default Story;