import React from 'react';
import Avatar from "../Avatar/Avatar.jsx";
import {createFeedAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";

const AddPost = ({onClose}) => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state.authState)


    function handlePost(e){
        e.preventDefault()

        const content = e.target.content.value

        let payload = new FormData()
        payload.append("content", content)

        dispatch(createFeedAction(payload)).then(()=>{
            onClose()
            e.target.content.value = ""
        })

    }


    return (
        <div>
            <form onSubmit={handlePost}>

                    <label htmlFor="">Create post</label>


                <div className=" mt-3 ">
                    <div className=" flex items-center gap-x-2">
                        <Avatar  className="!h-9 !w-9" imgClass="!h-9 !w-9 !text-xs" src={auth?.avatar} username={auth?.fullName} ></Avatar>
                        <h2>{auth?.fullName}</h2>
                    </div>

                    <div className="mt-2">
                        <textarea className="w-full input-elemselect add-feed-input" name="content" placeholder={`What's on your mind `+ auth?.firstName} id="" cols="30" rows="10"></textarea>
                    </div>
                </div>

                <div className="flex items-center justify-around">
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 video-icon"></i>
                        <span>Videos</span>
                    </li>
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 photo-icon"></i>
                        <span>Photos</span>
                    </li>
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 emoji-icon"></i>
                        <span>Feelings</span>
                    </li>
                </div>

                <div className="mt-5">
                    <button type="submit" className="btn btn-primary w-full">Submit Post</button>
                </div>

            </form>
        </div>
    );
};

export default AddPost;