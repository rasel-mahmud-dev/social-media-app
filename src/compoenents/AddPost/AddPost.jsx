import React from 'react';
import {BiCamera, BiImage, BiPen, BiVideo} from "react-icons/bi";
import Avatar from "../Avatar/Avatar.jsx";
import {FaEllipsisH, FaEllipsisV} from "react-icons/fa";
import {createFeedAction} from "src/store/actions/feedAction.js";
import {useDispatch} from "react-redux";

const AddPost = () => {

    const dispatch = useDispatch()


    function handlePost(e){
        e.preventDefault()

        const content = e.target.content.value

        let payload = new FormData()
        payload.append("content", content)



        dispatch(createFeedAction(payload))


    }


    return (
        <div>
            <form onSubmit={handlePost}>
                <div className="flex items-center"> <div className="icon-box">
                    <BiPen />
                </div>
                    <label htmlFor="">Create Post</label>
                </div>

                <div className=" mt-3 ">
                    <div className=" flex items-center gap-x-2">
                        <Avatar  className="!h-9 !w-9" imgClass="!h-9 !w-9 !text-xs" username={"Rasel Mahmhd"} ></Avatar>
                        <h2>Rasel Mahmud</h2>
                    </div>

                    <div>
                        <textarea className="w-full" name="content" placeholder="Write you post content" id="" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-4">
                        <li className="list-none flex items-center gap-x-1">
                            <BiVideo/>
                            Live Video
                        </li>
                        <li className="list-none flex items-center gap-x-1">
                            <BiImage/>
                            Photos/Videos
                        </li>
                        <li className="list-none flex items-center gap-x-1">
                            <BiCamera/>
                            Feallings
                        </li>
                    </div>
                    <FaEllipsisH className="text-xs text-neutral-500" />
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-full">Submit Post</button>
                </div>

            </form>
        </div>
    );
};

export default AddPost;