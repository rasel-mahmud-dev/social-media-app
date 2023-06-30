import React, {useEffect} from 'react';
import apis from "src/apis/index.js";

import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import {Link} from "react-router-dom";


import Button from "components/Shared/Button/Button.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {FaEllipsisH} from "react-icons/fa";


const DiscoverPages = () => {
    const [state, setState] = useCustomReducer({
        following: []
    })

    useEffect(() => {
        apis.get("/page/likes-and-following").then(({data, status}) => {
            if (status === 200) {
                setState({
                    following: data.following
                })
            }
        })
    }, []);

    function addLikePage(pageId) {
        apis.post("/page/add-like", {pageId}).then(({data, status}) => {
            if (status === 201) {
                setState(prev => ({
                    pages: prev.pages.filter(page => page._id !== pageId)
                }))
            }
        })
    }


    return (

        <div className="group-content w-full">

            <div className="my-4">
                <h2 className="color_h1 text-xl font-medium">All Pages You Like or Follow ({state?.following?.length})</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-3">
                {
                    state?.following?.map(follow => (
                        <div key={follow._id} className="group-card card relative p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-x-2">
                                    <Avatar src={follow?.page.logo} username={follow?.page?.name} className="!w-10 !h-10"/>
                                    <div className="color_p">
                                        <h3 className="color_h2 font-medium">{follow?.page.name}</h3>
                                        <p className="text-sm">Media</p>
                                    </div>
                                </div>
                                <div className="color_p circle-hover-btn">
                                    <FaEllipsisH/>
                                </div>
                            </div>

                            <Button
                                className="btn btn-primary2 w-full mt-5">Following</Button>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default DiscoverPages;