import React, {useEffect} from 'react';
import apis from "src/apis/index.js";

import useCustomReducer from "src/hooks/useReducer.jsx";
import staticImage from "src/utils/staticImage.js";
import {Link} from "react-router-dom";


import Button from "components/Shared/Button/Button.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";


const DiscoverPages = () => {
    const [state, setState] = useCustomReducer({
        pages: []
    })

    useEffect(() => {
        apis.get("/page/discover").then(({data, status}) => {
            if (status === 200) {
                setState({
                    pages: data.pages
                })
            }
        })
    }, []);

    function addLikePage(pageId){
        apis.post("/page/add-like", {pageId}).then(({data, status}) => {
            if (status === 201) {
                setState(prev => ({
                    pages: prev.pages.filter(page=>page._id !== pageId)
                }))
            }

            // if (data.removed) {
            //     setState(prev => ({
            //         likes: prev.likes.filter(like => like.pageId !== pageId),
            //         totalLikes: prev.totalLikes - 1
            //     }))
            // } else {
            //     setState(prev => ({
            //         likes: [...prev.likes, data.like],
            //         totalLikes: prev.totalLikes + 1
            //     }))
            // }
        })
    }


    return (

        <div className="">

            <div className="my-4">
                <h2 className="color_h1 text-xl font-medium">Discover Pages</h2>
                <p className="color_p text-sm">Suggested for you</p>
            </div>

            {state.pages && state.pages.length === 0 && <div>
                <h2 className="color_h1 text-xl font-medium">No new page found.</h2>
            </div> }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {
                    state.pages.map(page => (
                        <div key={page._id} className="group-card card relative">

                            <div className="img-cover">
                                <img src={staticImage(page.coverPhoto)} alt=""/>
                            </div>

                            <div className="p-3">

                                <div className="flex items-center gap-x-1">
                                    <Avatar src={page.logo} className="!w-7 !h-7"/>
                                    <div>
                                        <h2 className="color_h2 font-semibold text-base">{page.name}</h2>
                                        <h2 className="color_h2 font-semibold text-base">{page.category}</h2>

                                    </div>
                                </div>

                                {/*<p>28K members • 10 posts a week</p>*/}
                                <Button onClick={()=>addLikePage(page._id)} className="btn btn-dark2 w-full mt-3 relative z-20">Like Page</Button>
                            </div>

                            <Link className="card-link" to={`/pages/${page.name}`}></Link>
                        </div>
                    ))
                }
            </div>
        </div>

    );
};

export default DiscoverPages;