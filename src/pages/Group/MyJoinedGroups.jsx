import React, {useEffect} from 'react';
import apis from "src/apis/index.js";

import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import {Link} from "react-router-dom";

import "./group.scss"
import Button from "components/Shared/Button/Button.jsx";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";
import {FaEllipsisH} from "react-icons/fa";

const MyJoinedGroups = () => {

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
        <div className="group-container-full py-6">

            <div className="mb-4 flex items-center justify-between">
                <h2 className="color_h1 text-base font-medium">All groups you've joined ({state?.groups?.length})</h2>
                <Button>Sort</Button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {
                    state.groups.map(group => (
                        <div key={group._id} className="group-card card relative !p-3">


                            <div className="flex items-center gap-x-2">
                                <div className="w-16 h-16 overflow-hidden">
                                    <img className="aspect-square rounded-md object-cover" src={staticImage(group.coverPhoto)} alt=""/>
                                </div>
                                <div className="color_p">
                                    <h2 className="color_h2 font-medium text-base">{group.name}</h2>
                                    <p className="text-xs color_deep_mute">You last visited 17 hours ago</p>
                                </div>
                            </div>


                          <div className="flex items-center gap-x-2 mt-4">
                              <Link to={`/groups/${group._id}`} className="w-full">
                                  <Button className="btn btn-primary2 w-full  relative z-20">View Group</Button>
                              </Link>
                              <Button className="btn-transparent hover:bg-dark-600 py-2.5">
                                  <FaEllipsisH />
                              </Button>
                          </div>

                        </div>

                    ))
                }
            </div>

        </div>
    );
};

export default MyJoinedGroups;