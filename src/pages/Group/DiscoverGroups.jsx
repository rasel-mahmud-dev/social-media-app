import React, {useEffect} from 'react';
import apis from "src/apis/index.js";

import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import {Link} from "react-router-dom";

import "./group.scss"
import Button from "components/Shared/Button/Button.jsx";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";
import WithGroupHomeSidebar from "pages/Group/WithGroupHomeSidebar.jsx";

const DiscoverGroups = () => {

    const [state, setState] = useCustomReducer({
        groups: []
    })

    useEffect(() => {
        apis.get("/groups/discover").then(({data, status}) => {
            if (status === 200) {
                setState({
                    groups: data.groups
                })
            }
        })

    }, []);


    return (

        <WithGroupHomeSidebar>
            <div className="group-content">

                <div className="mb-4">
                    <h2 className="color_h1 text-xl font-medium">Suggested for you</h2>
                    <p className="color_p text-sm">Groups you might be interested in.</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {
                        state.groups.map(group => (
                            <div key={group._id} className="group-card card relative">

                                <div className="img-cover">
                                    <img src={staticImage(group.coverPhoto)} alt=""/>
                                </div>

                                <div className="p-3">
                                    <h2 className="color_h2 font-semibold text-base">{group.name}</h2>

                                    <p>28K members • 10 posts a week</p>

                                    <div>
                                        <AvatarGroup data={[group?.members?.map(m => ({
                                            avatar: m.user?.avatar || "",
                                            fullName: "asd"
                                        }))]}/>
                                    </div>

                                    <Button className="btn btn-dark2 w-full mt-3 relative z-20">Join Group</Button>
                                </div>

                                <Link className="card-link" to={`/groups/${group.slug}`}></Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </WithGroupHomeSidebar>
    );
};

export default DiscoverGroups;