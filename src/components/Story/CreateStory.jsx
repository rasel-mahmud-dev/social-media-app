import {useCallback, useReducer, useRef, useState} from 'react';
import "./story.scss"
import {BiPlus} from "react-icons/bi";
import ModalWithBackdrop from "src/components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {TiTimes} from "react-icons/ti";
import Avatar from "src/components/Avatar/Avatar.jsx";
import chooseImage from "src/utils/chooseImage.js";
import Cropper from 'react-easy-crop'
import getCroppedImg from "src/utils/getCroppedImg.js";



const CreateStory = ({fullName, avatar, storyAsset, onChange, onSubmit}) => {

    const [state, setState] = useReducer((prevState, action)=>({...prevState, ...action}), {
        isCreateStoryModalOpen: false,
        media: []
    })

    const previewRef = useRef()

    function handleClose(){
        setState({isCreateStoryModalOpen: false})
    }
    function handleOpenCreateStoryModal(){
        setState({isCreateStoryModalOpen: true})
    }

    async function handleChooseImage(){
        let file = await chooseImage()
        if(file){
            setState({media: [file]})
        }
    }

    function isShareable() {
        return state?.media?.length > 0
    }

    function handleShareStory(){
        onSubmit({media: state.media.map(m=>({type: "image", blob: m.blob, name: m?.name ?? "image.jpg"}))})
    }

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)

    const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
        if(state?.media[0]?.base64) {
            const croppedImage = await getCroppedImg(
                state?.media[0]?.base64,
                croppedAreaPixels,
            )
            setState({media: [
                {
                    ...state.media[0],
                    blob: croppedImage
                }
            ]})
        }
    }, [state?.media])


    return (
        <div>

            <div className="story">
                <div className="story-thumb">
                    <img src={avatar} alt=""/>
                    <div className="story-btn " onClick={handleOpenCreateStoryModal}>
                        <BiPlus />
                    </div>
                </div>


                <div className="create">
                    <p>Create Story</p>
                </div>

            </div>


            <ModalWithBackdrop root="modal-root" className="add-story-modal" isOpen={state.isCreateStoryModalOpen}>
                <div className="create-story-content">
                    <div className="close-button" onClick={handleClose}>
                        <TiTimes />
                    </div>
                    <div className="flex">
                        <div className="my-stories-sidebar p-4">
                            <h3 className="text-2xl font-bold">Your story</h3>
                            <div className="flex items-center gap-x-2 mt-3 border-b pb-4">
                                <Avatar username="rasel" />
                                <h4 className="font-medium">Rasel mahmud</h4>
                            </div>

                            <div className="action-button">
                                <div className="flex w-full items-center">
                                    <button onClick={()=>setState({isCreateStoryModalOpen: false})} className="w-full btn btn-primary">Discard</button>
                                    <button onClick={handleShareStory} className={`whitespace-nowrap w-full btn  ${isShareable() ? "btn-primary" : "btn-disable"}`}>Share to story</button>
                                </div>
                            </div>
                        </div>

                        <div className="create-story-type-card flex w-full items-center justify-center gap-x-4 relative ">
                            {/**** media preview window ****/}
                            { state.media && state.media.length > 0 && (

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
                            ) }





                            <div className="card story-card flex items-center justify-center " onClick={handleChooseImage}>
                                <div className="flex flex-col items-center justify-center ">
                                    <div className="w-10 h-10 flex items-center justify-center shadow-md bg-white rounded-full">
                                        <i className="bw-image-icon"></i></div>
                                    <p className="text-xs text-white mt-2">Create a photo story</p>
                                </div>
                            </div>
                            <div className="card story-card flex items-center justify-center ">
                                <div className="flex flex-col items-center justify-center ">
                                    <div className="w-10 h-10 flex items-center justify-center shadow-md bg-white rounded-full">
                                        <i className="bw-text-icon"></i></div>
                                    <p className="text-xs text-white mt-2">Create a text story</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </ModalWithBackdrop>


        </div>
    );
};

export default CreateStory;