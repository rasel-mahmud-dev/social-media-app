import React from 'react';
import WithPageSidebar from "components/Watch/WithPageSidebar.jsx";

const SavesVideos = () => {
    return (
        <WithPageSidebar>
            <div className="group-content w-full mt-6">
                <div className="color_h1 mb-4 px-2">
                    <h4>No Saves Video found</h4>
                </div>
            </div>
        </WithPageSidebar>
    );
};

export default SavesVideos;