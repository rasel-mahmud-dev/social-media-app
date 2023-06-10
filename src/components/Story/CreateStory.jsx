import {useCallback, useReducer, useState} from 'react';
import "./story.scss"
import chooseImage from "src/utils/chooseImage.js";
import Cropper from 'react-easy-crop'
import getCroppedImg from "src/utils/getCroppedImg.js";
import {useNavigate} from "react-router-dom";
import {createStoryAction} from "src/store/actions/storyAction.js";
import {useDispatch} from "react-redux";


const CreateStory = ({fullName, avatar, onSubmit}) => {

    const navigate = useNavigate()

    const dispatch = useDispatch()


    const [state, setState] = useReducer((prevState, action) => ({...prevState, ...action}), {
        isCreateStoryModalOpen: false,
        media: []
    })

    function handleClose() {
        setState({isCreateStoryModalOpen: false})
        navigate("/")
    }

    function handleOpenCreateStoryModal() {
        setState({isCreateStoryModalOpen: true})
    }

    async function handleChooseImage() {
        let file = await chooseImage()
        if (file) {
            setState({media: [file]})
        }
    }

    function isShareable() {
        return state?.media?.length > 0
    }

    function handleShareStory() {
        onSubmit({media: state.media.map(m => ({type: "image", blob: m.blob, name: m?.name ?? "image.jpg"}))})
    }

    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)

    const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
        if (state?.media[0]?.base64) {
            const croppedImage = await getCroppedImg(
                state?.media[0]?.base64,
                croppedAreaPixels,
            )
            setState({
                media: [
                    {
                        ...state.media[0],
                        blob: croppedImage
                    }
                ]
            })
        }
    }, [state?.media])


    function handleClearMedia() {
        setState({media: []})
    }


    function handleSubmitStory({media}) {
        let formData = new FormData()
        media.forEach((m) => {
            formData.append("image", m.blob, m.name)
        })
        dispatch(createStoryAction(formData)).unwrap().then((data) => {
            if (data.story) {
                navigate(`/stories/${data.story._id}`)
            }

        }).catch((_err) => {
            alert("Internal Error")
        })
    }


    return (

        <div
            className="create-story-type-card  flex w-full items-center justify-center gap-x-4 relative ">
            {/**** media preview window ****/}
            {state.media && state.media.length > 0 && (

                <div className="card preview-story-modal ">
                    <div className="card-meta">
                        <h4>Preview</h4>
                    </div>


                    <div className="preview-content">

                        <Cropper
                            showGrid={false}
                            image={state.media[0].base64}
                            crop={crop}
                            zoom={zoom}
                            aspect={3 / 4}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />

                        {/*<div className="preview-content-img">*/}
                        {/*    <img src={state.media[0].base64} alt=""/>*/}
                        {/*</div>*/}


                    </div>
                </div>
            )}
            {state.media && state.media.length > 0 && (
                <div className="mobile-add-story-btn">
                    <div className="flex items-center gap-x-2">
                        <button onClick={handleClearMedia} className=" btn btn-primary">Discard</button>
                        <button
                            className={`whitespace-nowrap btn  ${isShareable() ? "btn-primary" : "btn-disable"}`}
                            onClick={handleShareStory}>Add Story
                        </button>
                    </div>
                </div>)}


            <div className="card story-card flex items-center justify-center "
                 onClick={handleChooseImage}>
                <div className="flex flex-col items-center justify-center ">
                    <div
                        className="w-10 h-10 flex items-center justify-center shadow-md bg-white rounded-full">
                        <i className="bw-image-icon"></i></div>
                    <p className="text-xs text-white mt-2">Create a photo story</p>
                </div>
            </div>
            <div className="card story-card flex items-center justify-center ">
                <div className="flex flex-col items-center justify-center ">
                    <div
                        className="w-10 h-10 flex items-center justify-center shadow-md bg-white rounded-full">
                        <i className="bw-text-icon"></i></div>
                    <p className="text-xs text-white mt-2">Create a text story</p>
                </div>
            </div>
        </div>

    );
};

export default CreateStory;