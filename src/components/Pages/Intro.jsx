import React, {useEffect, useState} from 'react';
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import apis from "src/apis/index.js";
import {useParams} from "react-router-dom";
import FeedCard from "components/FeedCard/FeedCard.jsx";
import useTextSlice from "src/hooks/useTextSlice.jsx";

const Intro = ({page}) => {

    const {pageName} = useParams()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        apis.get("/page/posts/" + pageName).then(({data}) => {
            setPosts(data.posts)
        })
    }, []);

    const {render} = useTextSlice(page?.bio, {
        0: 100,
        1: 300,
        2: 600,
        3: undefined,
    })



    return (
        <div className="grid grid-cols-12 mt-4 ">

            <div className="col-span-4 card h-max">
                <h2 className="font-medium text-2xl color_h1">Intro</h2>
                <p className="color_h2 text-sm mt-2">{render()}</p>

                <h4 className="color_h3 text-sm mt-2">Page · {page?.category}</h4>

            </div>
            <div className="col-span-8">
                <AddPostDemo/>
                <div className="mt-4">
                    {posts?.map(post => (
                        <FeedCard key={post._id} type="page" feed={post}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Intro;