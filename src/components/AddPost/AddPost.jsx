import React from 'react';
import Avatar from "../Shared/Avatar/Avatar.jsx";
import {createFeedAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {BsGlobe, BsTrash} from "react-icons/bs";
import chooseImage from "src/utils/chooseImage.js";
import useCustomReducer from "src/hooks/useReducer.jsx";

import "./add-feed.scss"
import Loading from "components/Shared/Loading/Loading.jsx";
import {BiChevronLeft, BiPlus} from "react-icons/bi";
import resizeImageByMaxWidth from "src/utils/resizeImage.js";
import {useParams} from "react-router-dom";
import {feedsApi, useAddFeedMutation} from "src/store/features/feedsApi.js";


const AddPost = ({onClose}) => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const {groupSlug} = useParams()

    const [state, setState] = useCustomReducer({
        images: [],
        addFeedLoading: false
    })

    const [addFeed, data] = useAddFeedMutation()


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

        // setState({
        //     addFeedLoading: true
        // })


        if (groupSlug) {
            // add group post
            payload.append("groupSlug", groupSlug)

        }

        dispatch(createFeedAction(payload)).unwrap().then((data) => {
            // onClose()
            // e.target.content.value = ""
            // setState({
            //     images: []
            // })

            console.log(data)

        }).catch((message) => {
            alert(message)
        }).finally(() => {
            setState({
                addFeedLoading: false
            })
        })


    }

    async function handleChoosePhoto() {
        let file = await chooseImage()
        if (file && file.base64) {
            const newFile = await resizeImageByMaxWidth(file.base64, 1000, 0.6)


            console.log(newFile)

            if (newFile && newFile.blob && newFile.base64) {
                setState(prevState => {
                    return {
                        ...prevState,
                        images: [...prevState.images, {blob: newFile.blob, base64: newFile.base64}]
                    }
                })
            }
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
                    <div onClick={onClose} className="flex md:hidden icon-box !w-8 !h-8 rounded-full"><BiChevronLeft/>
                    </div>
                    <label className="font-semibold color_h1">Create post</label>
                </div>

                <div className="mt-3 ">
                    <div className=" flex items-center gap-x-2">
                        <Avatar className="!h-9 !w-9" imgClass="!h-9 !w-9 !text-xs" src={auth?.avatar}
                                username={auth?.fullName}></Avatar>
                        <div className="text-sm">
                            <h2 className="color_h2 font-semibold">{auth?.fullName}</h2>
                            <span className="color_h3 text-xs  flex items-center gap-x-1">
                                <BsGlobe className="text-xs"/>
                                <span className="font-medium">Public</span>
                            </span>
                        </div>
                    </div>

                    <div className={`mt-2 add-feed-wrapper image-${state.images.length > 4 ? 4 : state.images.length}`}>
                        <textarea
                            className="w-full input-elemselect add-feed-input dark:bg-dark-650 color_p" name="content"
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
                                         className="position-center text-xs font-semibold text-primary">
                                        {state.images.length > 4 && index === 3 && <div>
                                            {state.images.length - 4} More items
                                        </div>}
                                    </div>
                                </div>
                            ))}

                            <div onClick={handleChoosePhoto}
                                 className="relative group !bg-transparent hover:!bg-primary !w-max px-4 py-3 !h-max flex items-center justify-center mt-2 border dark:border-neutral-700 border-neutral-600/10 rounded-lg">
                                <span className=" color_h3 font-medium text-sm">
                                    <BiPlus/>
                                </span>
                            </div>
                        </div>}

                    </div>
                </div>

                <div className="flex items-center justify-around text-sm font-medium color_h3">
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