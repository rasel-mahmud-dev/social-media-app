import React from 'react';
import Avatar from "../Shared/Avatar/Avatar.jsx";
import {createFeedAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {BsGlobe, BsTrash} from "react-icons/bs";
import chooseImage from "src/utils/chooseImage.js";
import useCustomReducer from "src/hooks/useReducer.jsx";

import "./add-feed.scss"
import Loading from "components/Shared/Loading/Loading.jsx";
import {BiChevronLeft} from "react-icons/bi";

const AddPost = ({onClose}) => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        images: [],
        addFeedLoading: false
    })


    function handlePost(e) {
        e.preventDefault()

        const content = e.target.content.value

        let payload = new FormData()
        payload.append("content", content)
        if (state.images && state.images.length > 0) {
            state.images.forEach(image => {
                payload.append("image", image.blob, image.blob.name)
            })
        }
        setState({
            addFeedLoading: true
        })

        dispatch(createFeedAction(payload)).unwrap().then(() => {
            onClose()
            e.target.content.value = ""
            setState({
                images: []
            })
        }).catch(() => {
            alert("Post adding fail")
        }).finally(() => {
            setState({
                addFeedLoading: false
            })
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

    function handleRemoveImage(imageIndex) {
        setState(prevState => {
            return {
                ...prevState,
                images: prevState.images.filter((_, i) => i !== imageIndex)
            }
        })
    }


    return (
        <div className="">

            <form onSubmit={handlePost}>

                <div className="flex items-center gap-x-2">
                    <div onClick={onClose} className="icon-box !w-8 !h-8 rounded-full"><BiChevronLeft /></div>
                    <label className="font-semibold">Create post</label>
                </div>

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

                    <div className={`mt-2 add-feed-wrapper image-${state.images.length > 4 ? 4 : state.images.length}`}>
                        <textarea
                            className="w-full input-elemselect add-feed-input" name="content"
                            placeholder={`What's on your mind ` + auth?.firstName} id="" cols="30"
                            rows="10">
                        </textarea>

                        {/* post media */}
                        {state.images.length > 0 && <div className="media-preview">
                            {state.images.slice(0, state.images.length >= 4 ? 4 : undefined).map((image, index) => (
                                <div className="relative group " key={index}>
                                    <img src={image.base64} alt=""/>
                                    <div onClick={() => handleRemoveImage(index)}
                                         className="group-hover:!flex !hidden cursor-pointer icon-box bg-neutral-600/20 !w-8 !h-8 absolute right-1 top-1">
                                        <BsTrash className="text-white  text-xs"/>
                                    </div>

                                    <div onClick={() => handleRemoveImage(index)}
                                         className="position-center text-xs font-medium text-white">
                                        {state.images.length > 4 && index === 3 && <div>
                                            {state.images.length - 4} More items
                                        </div>}
                                    </div>
                                </div>
                            ))}

                            <div onClick={handleChoosePhoto}
                                 className="relative group flex items-center justify-center h-10 border border-neutral-600/10 rounded-lg">
                                <span className="text-whites font-medium text-sm">Add More</span>
                            </div>
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
                    <button type="submit"
                            className={`btn  w-full ${state.addFeedLoading ? "btn-light pointer-events-none flex justify-center" : "btn-primary"}`}>
                        {!state.addFeedLoading && "Submit Post"}

                        {state.addFeedLoading && (
                            <div className="flex items-center gap-x-2">
                                <Loading/>
                                <span>Adding</span>
                            </div>
                        )}

                    </button>
                </div>

            </form>
        </div>
    );
};

export default AddPost;