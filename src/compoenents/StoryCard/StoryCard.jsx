import React from 'react';
import {BiComment, BiLike} from "react-icons/bi";
import Avatar from "../Avatar/Avatar.jsx";

const StoryCard = () => {
    return (
        <div className="">
            <div className="bg-white card w-full">
                <div className="p-4">
                    <div className="flex items-center">
                        <Avatar username="ER SDF" />

                            <div className="ml-3">
                                <h3 className="text-lg font-bold">John Doe</h3>
                                <p className="text-gray-600 text-sm">3 hours ago</p>
                            </div>
                    </div>
                    <div className="mt-4">
                        <img src="story-image.jpg" alt="Story Image" className="w-full rounded-lg"/>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-800">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                            auctor risus eu mi ultrices ultricies.</p>
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
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;