import React, {useEffect, useState} from 'react';
import {BiComment, BiLike, BiShare} from "react-icons/bi";
import Avatar from "../Avatar/Avatar.jsx";
import {toggleLikeAction} from "src/store/actions/feedAction.js";
import {updateLocalFeedAction} from "src/store/slices/feedSlice.js";

const FeedCard = ({feed, dispatch}) => {

    const [isExpand, setExpand] = useState(false)

    const [isLikeActionLoading, setLikeActionLoading] = useState(false)


    useEffect(() => {
        if (feed?.content.length > 300) {
            setExpand(false)
        }
    }, [feed?.content])


    function handleExpand(isExpand) {
        setExpand(isExpand)
    }

    function toggleLikeHandler(feedId) {
        setLikeActionLoading(true)
        dispatch(toggleLikeAction({feedId})).unwrap().then((data)=>{

            if(!data) return;

            let likes = []
            if(feed.likes && Array.isArray(feed.likes)){
                likes = [...feed.likes]
            }
            if(data.isAdded){
                likes = [...likes, data.newLike]
            } else {
                likes = likes.filter(like=>like._id !== data.removeId)
            }

            dispatch(updateLocalFeedAction({
                feedId: feedId,
                updated: {
                    likes: likes
                }
            }))

        }).finally(() => {
            setLikeActionLoading(false)
        })
    }


    return (
        <div className="">
            <div className="bg-white card w-full">
                <div className="">
                    <div className="flex items-center">
                        <Avatar className="!w-9 !h-9" imgClass="!w-9 !h-9" username={feed.author?.fullName} src={feed.author?.avatar}/>

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
                        {feed?.content.slice(0, 300) && isExpand ?
                            <span onClick={() => handleExpand(false)}>show less</span> :
                            <span onClick={() => handleExpand(true)}>show more</span>}
                    </div>


                    <div className="flex items-center justify-between mt-4">
                        <li className="list-none flex items-center gap-x-1">
                            <img src="/icons/like.svg" className="w-5" alt=""/>
                            <span>{feed?.likes?.length > 0 ? feed?.likes?.length: "" }</span>
                        </li>
                        <li className="list-none flex items-center gap-x-1">
                            <BiComment/>
                            <span></span>
                        </li>

                    </div>

                    <div className="flex items-center justify-between border-t border-b mt-4 py-1 text-sm font-medium">
                        {isLikeActionLoading ? (
                            <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                                <div className="animate-spin h-5 w-5 block border-b-blue-700 border-2 rounded-full">

                                </div>
                            </li>
                        ) : <li onClick={() => toggleLikeHandler(feed._id)}
                                className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiLike/>
                            <span>Like</span>
                        </li>}
                        <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiComment/>
                            <span>Comment</span>
                        </li>
                        <li className="flex items-center gap-x-1 hover:bg-neutral-100 rounded-md cursor-pointer px-4 py-2 w-full justify-center">
                            <BiShare/>
                            <span>Share</span>
                        </li>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default FeedCard;