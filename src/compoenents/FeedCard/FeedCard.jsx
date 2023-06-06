import React, {useEffect, useState} from 'react';
import {BiComment, BiLike} from "react-icons/bi";
import Avatar from "../Avatar/Avatar.jsx";

const FeedCard = ({feed}) => {

    const [isExpand, setExpand] = useState(false)

    useEffect(()=>{
        if(feed?.content.length > 300){
            setExpand(false)
        }
    }, [feed?.content])


    function handleExpand(isExpand){
        setExpand(isExpand)
    }

    return (
        <div className="">
            <div className="bg-white card w-full">
                <div className="p-4">
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
                        <div className="flex items-center">
                            <button className="flex items-center text-gray-600 text-sm">
                               <BiLike/>
                                42 Likes
                            </button>
                            <button className="flex items-center text-gray-600 text-sm ml-4">
                                <BiComment />
                                10 Comments
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedCard;