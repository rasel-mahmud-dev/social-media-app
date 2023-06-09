import React from 'react';
import Avatar from "../Avatar/Avatar.jsx";
import {createFeedAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {BsGlobe} from "react-icons/bs";
import chooseImage from "src/utils/chooseImage.js";
import useCustomReducer from "src/hooks/useReducer.jsx";

import "./add-feed.scss"

const AddPost = ({onClose}) => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        images: []
    })


    function handlePost(e) {
        e.preventDefault()

        const content = e.target.content.value

        let payload = new FormData()
        payload.append("content", content)
       if(state.images &&  state.images.length > 0){
           state.images.forEach(image=>{
               payload.append("image", image.blob, image.blob.name)
           })
       }

        dispatch(createFeedAction(payload)).then(() => {
            onClose()
            e.target.content.value = ""
        })

    }

    async function handleChoosePhoto() {
        let file = await chooseImage()
        if (file.base64) {
            setState(prevState => {
                return {
                    ...prevState,
                    images: [...prevState.images, {blob: file.blob, base64: file.base64}]
                }
            })
        }
    }



    return (
        <div>
            <form onSubmit={handlePost}>

                <label className="font-semibold">Create post</label>

                <div className="mt-3 ">
                    <div className=" flex items-center gap-x-2">
                        <Avatar className="!h-9 !w-9" imgClass="!h-9 !w-9 !text-xs" src={auth?.avatar}
                                username={auth?.fullName}></Avatar>
                        <div className="text-sm">
                            <h2 className="text-neutral-700 font-semibold">{auth?.fullName}</h2>
                            <span className="text-xs text-neutral-500 flex items-center gap-x-1">
                                <BsGlobe className="text-xs"/>
                                <span className="font-medium">Public</span>
                            </span>
                        </div>
                    </div>

                    <div className={`mt-2 add-feed-wrapper image-${state.images.length}`}>
                        <textarea
                            className="w-full input-elemselect add-feed-input" name="content"
                            placeholder={`What's on your mind ` + auth?.firstName} id="" cols="30"
                            rows="10">
                        </textarea>

                        {/* post media */}
                        {state.images.length > 0 && <div className="media-preview">
                            {state.images.map((image, index) => (
                                <div className="" key={index}>
                                    <img src={image.base64} alt=""/>
                                </div>
                            ))}
                        </div>}

                    </div>
                </div>

                <div className="flex items-center justify-around text-sm font-medium text-gray-800">
                    <li className="list-none flex items-center gap-x-1">
                        <i className="icon2 video-icon"></i>
                        <span>Videos</span>
                    </li>
                    <li className="list-none flex items-center gap-x-1 cursor-pointer" onClick={handleChoosePhoto}>
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