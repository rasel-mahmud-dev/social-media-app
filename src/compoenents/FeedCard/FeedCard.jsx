import React, {useEffect, useState} from 'react';
import {BiComment, BiLike, BiShare} from "react-icons/bi";
import Avatar from "../Avatar/Avatar.jsx";
import {toggleLikeAction} from "src/store/actions/feedAction.js";

const FeedCard = ({feed, dispatch}) => {

    const [isExpand, setExpand] = useState(false)


    useEffect(()=>{
        if(feed?.content.length > 300){
            setExpand(false)
        }
    }, [feed?.content])


    function handleExpand(isExpand){
        setExpand(isExpand)
    }

    function toggleLikeHandler(feedId){
        dispatch(toggleLikeAction({feedId}))
    }


    return (
        <div className="">
            <div className="bg-white card w-full">
                <div className="">
                    <div className="flex items-center">
                        <Avatar username={feed.author?.fullName} src={feed.author?.avatar} />

                            <div className="ml-3">
                                <h3 className="text-lg font-bold">{feed.author?.fullName}</h3>
                                <p className="text-gray-600 text-sm">3 hours ago</p>
                            </div>
                    </div>
                    <div className="mt-4">
                        <img src="story-image.jpg" alt="Story Image" className="w-full rounded-lg"/>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-800">{feed?.content.slice(0, isExpand ? undefined : 300)}</p>
                        { feed?.content.slice(0, 300) && isExpand ? <span onClick={()=>handleExpand(false)}>show less</span>: <span onClick={()=>handleExpand(true)}>show more</span>  }
                    </div>



                    <div className="flex items-center justify-between mt-4">
                        <li className="list-none flex items-center gap-x-1">
                            <img src="/icons/like.svg" className="w-5" alt=""/>
                            <span>23</span>
                        </li>
                        <li className="list-none flex items-center gap-x-1">
                            <BiComment />
                            <span>123</span>
                        </li>

                    </div>

                    <div className="flex items-center justify-between border-t border-b mt-4 py-1 text-sm font-medium">
                        <li onClick={()=>toggleLikeHandler(feed._id)} className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiLike />
                            <span>Like</span>
                        </li>
                        <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiComment />
                            <span>Comment</span>
                        </li>
                        <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiShare />
                            <span>Share</span>
                        </li>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeedCard;