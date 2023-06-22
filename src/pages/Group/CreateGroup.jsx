import React, {useContext} from 'react';

import "./create-group.scss"
import {GroupLayoutContext} from "src/store/GroupLayoutContext.jsx";

const CreateGroup = () => {

    const [state, setState] = useContext(GroupLayoutContext)

    return (
        <div>
            <div className="card">
                <h2 className="color_h1">Desktop Preview</h2>

                <div className="group-image" style={{backgroundImage: `url(${state.groupCoverPhoto ? state.groupCoverPhoto?.base64 : ""})`}}>

                </div>

                <div className="mt-6">
                    <h1 className={`text-2xl font-medium ${state.name ? "color_h1" : "color_mute"}`}>{state.name ? state.name : "Group Name"}</h1>
                    <p className="mt-2 text-sm color_h3">Group Privacy 1 member</p>
                </div>

            </div>
        </div>
    );
};

export default CreateGroup;