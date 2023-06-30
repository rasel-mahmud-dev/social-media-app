import React, {useEffect, useRef} from "react";
import InputGroup from "components/Shared/Input/InputGroup.jsx";
import Button from "components/Shared/Button/Button.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import {GiGears} from "react-icons/gi";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Reel from "components/Reel/Reel.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";
import chooseImage from "src/utils/chooseImage.js";

const CreateReel = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        author: auth,
        videoUrl: "public/video/Snapsave_774bf77d95afe78b6bfcd467fef64f6c_1080p.mp4",
        videoUrlBlob: null,
        caption: "হরতাল চলছে।",
        tags: ["#short", "#viral", "#new", "#funny"]
    })

    const videoref = useRef();


    function getRef(re) {
        if (re && re?.current) {
            videoref.current = re.current
        }
    }

    function handleChange(name, value) {
        setState({
            [name]: value
        })
    }

    async function handleCreateReel() {
        const payload = new FormData()
        payload.append("caption", state.caption)

        // if (state.members && state.members.length > 0) {
        //     payload.append("members", JSON.stringify(state.members.map(m => m._id)))
        // }
        // apis.post("/reels/create", payload)

        const URL = "https://upload.imagekit.io/api/v1/files/upload"
        const publicKey = "public_TDgAXBicsFrQWIQfkAygwf13Ku0="
        let signature = ""
        let expire = ""
        let token = ""

        const useUniqueFileName = true
        const folder = "social-app/reels"

        const video = state.videoUrlBlob
        if(!video) return alert("Please Choose video file")
        const fileName = video.name
        // payload.append("file", video)
        payload.append("publicKey", publicKey)

        payload.append("useUniqueFileName", "true")
        payload.append("folder", folder)
        payload.append("fileName", fileName)


        try{
            const {data, status}  = await apis.get("/auth/imagekit-authenticationEndpoint")
            if(status !== 200){
                return  alert("error")
            }

            signature = data.signature
            expire = data.expire
            token = data.token


            payload.append("signature", signature)
            payload.append("expire", expire)
            payload.append("token", token)


            // let response  = await axios.post(URL, payload, {
            //     onUploadProgress: function(progressEvent) {
            //
            //         console.log(progressEvent)
            //         var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            //         console.log(percentCompleted)
            //
            //     }
            // })

            let response = {data: {}}

            // if(response.status !== 200){
            //     return alert("fail upload video")
            // }

            const videoPath = response.data.url || "https://ik.imagekit.io/rwx12mtuk/social-app/reels/Tension_out_now_____browntok__browntiktok_5_JyZpz8jqM.mp4"
            const size = response.data?.size || 690831

            const newReel = {
                hashtags: [],
                meta: {duration: state.duration, size},
                mentions: [],
                thumbnailUrl: "",
                caption: state.caption,
                videoUrl: videoPath
            }

            response = apis.post("/reels/create",  newReel)

            if(response.status === 201){
                navigate("/watch/reels")
            }

        } catch(ex){
            console.log(ex)
        }


    }



    async function handleChooseGroupCoverPhoto() {
        let file = await chooseImage("video/*")
        if (!file || !file?.base64) return;
        setState({
            videoUrl: file.base64,
            videoUrlBlob: file.blob
        })
    }


    const {openSidebar} = useSelector(state => state.appState)

    return (
        <div>

            <div className="flex justify-between ">
                <Sidebar
                    className="white left-sidebar group-sidebar"
                    isOpen={openSidebar === "left-sidebar"}
                    onClose={() => dispatch(openSidebarAction(""))}>


                    <div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-x-2">
                                <div className="rounded_circle" onClick={()=>navigate("/watch/reels")} >
                                    <i className="png_filter_white icon_arrow-left "></i>
                                </div>
                                <h2 className="font-medium color_h2">Create Reel</h2>

                            </div>
                            <div className="rounded_circle color_p">
                                <GiGears/>
                            </div>
                        </div>

                        <form className="mt-4">
                            <InputGroup
                                onChange={(e) => handleChange("caption", e.target.value)}
                                as="textarea"
                                inputClass="w-full"
                                placeholder="Write caption"
                            />


                            <Button onClick={handleChooseGroupCoverPhoto}
                                    className="btn-dark2 w-full text-sm block">
                                Choose Media
                            </Button>

                            <Button onClick={handleCreateReel} className="btn-primary mt-4">Post Reel</Button>

                        </form>


                        <Link to="/watch" className="list-item mt-3 px-2">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_video  absolute z-30"/>
                                </div>
                                <span>Home</span>
                            </div>
                        </Link>


                        <Link to="/watch/reels" className="list-item mt-3 px-2">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_reels  absolute z-30"/>
                                </div>
                                <span>Reels</span>

                            </div>
                        </Link>

                        <Link to="/watch/saved" className="list-item mt-3 px-2">
                            <div className="flex items-center gap-x-2">
                                <div
                                    className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                    <i className="png_filter_white icon_bookmark  absolute z-30"/>
                                </div>
                                <span>Saves Videos</span>
                            </div>
                        </Link>

                    </div>
                </Sidebar>

                <div className="group-content w-full">

                    {/**** preview reel ****/}
                    <div className="flex items-center justify-center mt-4">
                        <Reel onRefReady={getRef} reel={state} auth={auth}/>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreateReel;