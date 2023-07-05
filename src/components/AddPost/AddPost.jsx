import React, {useEffect, useRef} from 'react';
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
import apis from "src/apis/index.js";
import axios from "axios";
import Video from "components/Video/Video.jsx";


function uploadVideo(video) {
    return new Promise(async (resolve, reject) => {
        try {
            const URL = "https://upload.imagekit.io/api/v1/files/upload"
            const publicKey = "public_TDgAXBicsFrQWIQfkAygwf13Ku0="
            let signature = ""
            let expire = ""
            let token = ""

            const useUniqueFileName = true
            const folder = "social-app/reels"


            if (!video) return alert("Please Choose video file")

            if (video.size > (1024 * 6024)) {
                alert("please select video less than 6 mb")
                return;
            }

            const payload = new FormData()
            const fileName = video.name
            payload.append("file", video)
            payload.append("publicKey", publicKey)

            payload.append("useUniqueFileName", "true")
            payload.append("folder", folder)
            payload.append("fileName", fileName)


            const {data, status} = await apis.get("/auth/imagekit-authenticationEndpoint")
            if (status !== 200) {
                return alert("video file upload error")
            }

            signature = data.signature
            expire = data.expire
            token = data.token

            payload.append("signature", signature)
            payload.append("expire", expire)
            payload.append("token", token)

            let response = await axios.post(URL, payload, {
                onUploadProgress: function (progressEvent) {
                    // console.log(progressEvent)
                    // var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                }
            })

            // let response = {data: {}}

            if (response.status !== 200) {
                return alert("fail upload video")
            }

            resolve(response?.data)

        } catch (ex) {
            reject(ex)
        }

    })

}

const AddPost = ({onClose}) => {


    const videoref = useRef();


    useEffect(() => {
        videoref.current?.play();
    }, [videoref.current]);


    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const {groupSlug, pageName} = useParams()

    const [state, setState] = useCustomReducer({
        images: [],
        addFeedLoading: false,
        videoUrl: null,
        videoUrlBlob: null
    })

    const [addFeed, data] = useAddFeedMutation()


    async function handlePost(e) {

        try {

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


            if (groupSlug) {
                // add group post
                payload.append("groupSlug", groupSlug)

            } else if (pageName) {
                payload.append("pageName", pageName)
            }

            const video = state.videoUrlBlob
            if (video) {
                if (video.size > (1024 * 6024)) {
                    alert("please select video less than 6 mb")
                    return;
                }
                let a = await uploadVideo(state.videoUrlBlob)
                if (a) {
                    payload.videoUrl = a.url
                }
            }

            dispatch(createFeedAction(payload)).unwrap().then((data) => {
                onClose()
                e.target.content.value = ""
                setState({
                    images: [],
                    videoUrl: null,
                    videoUrlBlob: null
                })


            }).catch((message) => {
                alert(message)
            }).finally(() => {
                setState({
                    addFeedLoading: false
                })
            })
        } catch (ex) {
            console.log(ex)
            alert("Post adding fail")
            setState({
                addFeedLoading: false
            })

            videoref?.current?.pause();
        }


    }

    async function handleChoosePhoto() {
        let file = await chooseImage()
        if (file && file.base64) {
            const newFile = await resizeImageByMaxWidth(file.base64, 1000, 0.6)


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

    async function handleChooseVideo() {
        let file = await chooseImage("video/*")
        if (!file || !file?.base64) return;
        if (file.blob.size > (1024 * 6024)) {
            alert("please select video less than 6 mb")
            return;
        }
        setState({
            videoUrl: file.base64,
            videoUrlBlob: file.blob
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


                        {state.videoUrl && (
                            <div className="add-feed-video">
                                <Video src={state.videoUrl} videoRef={videoref}/>
                            </div>
                        )}


                        {/* post media */}
                        {!state.videoUrl && state.images.length > 0 && <div className="media-preview">
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
                    <li onClick={handleChooseVideo} className="list-none flex items-center gap-x-1">
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