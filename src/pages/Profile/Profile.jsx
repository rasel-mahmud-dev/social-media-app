import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import apis from "src/apis/index.js";
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import "./profile.scss"
import AvatarGroup from "components/Shared/Avatar/AvatarGroup";
import useCustomReducer from "src/hooks/useReducer.jsx";
import PostSection from "components/Profile/PostSection.jsx";
import MediaSection from "components/Profile/MediaSection.jsx";
import {BiCamera} from "react-icons/bi";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import getCroppedImg from "src/utils/getCroppedImg.js";
import chooseImage from "src/utils/chooseImage.js";
import ImageEditor from "components/ImageEditor/ImageEditor.jsx";
import {updateProfileAction} from "src/store/actions/userAction.js";
import {MoonLoader} from "react-spinners";
import Info from "components/Shared/Info/Info.jsx";


const Profile = () => {

    const {userId} = useParams()

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        profile: {
            feeds: [],
            friends: [],
            user: null
        },
        isLoading: false,
        showSectionName: "Posts"
    })

    const [updateProfile, setUpdateState] = useCustomReducer({
        openImageChooserModal: "",
        originalAvatar: null,
        originalCover: null,
        avatar: null,
        cover: null,

    })

    useEffect(() => {
        if (userId) {

            apis.get("/users/profile/" + userId).then(({status, data}) => {
                if (status === 200) {
                    setState(data)
                }

            }).catch(ex => {

            })

        }
    }, [userId])


    const [errorMessage, setError] = useState("")
    const [isLoading, setLoading] = useState(false)


    const sectionNavs = {
        Posts: (params) => <PostSection {...params} />,
        Friends: (params) => "Working",
        Timeline: (params) => "Working",
        Photos: (params) => <MediaSection  {...params} />,
        Follower: (params) => "Working"
    }

    function handleSelectSection(sectionName) {
        setState({
            showSectionName: sectionName
        })
    }

    async function handleSelectImageChooser(which) {
        let file = await chooseImage()
        if (!file) return;
        if (which === "avatar") {
            setUpdateState({
                openImageChooserModal: which,
                originalAvatar: file.base64,
                originalCover: null,
                avatar: null,
                cover: null
            })
        } else if (which === "cover") {
            setUpdateState({
                openImageChooserModal: which,
                originalAvatar: null,
                originalCover: file.base64,
                avatar: null,
                cover: null
            })
        }
    }


    const onCropComplete = useCallback(async (croppedArea, croppedAreaPixels) => {
        if (updateProfile?.originalAvatar) {
            const croppedImage = await getCroppedImg(
                updateProfile?.originalAvatar,
                croppedAreaPixels,
            )
            setUpdateState({
                avatar: croppedImage
            })
        }

        if (updateProfile?.originalCover) {
            const croppedImage = await getCroppedImg(
                updateProfile?.originalCover,
                croppedAreaPixels,
            )
            setUpdateState({
                cover: croppedImage
            })
        }
    }, [updateProfile?.originalAvatar, updateProfile?.originalCover])


    function handleCloseImageChoose() {
        setUpdateState({
            openImageChooserModal: "",
            originalAvatar: null,
            originalCover: null
        })
    }

    function handleUpload() {
        setError("")
        const payload = new FormData()

        if (updateProfile.avatar) {
            payload.append("avatar", updateProfile.avatar, "avatar")
        }

        if (updateProfile.cover) {
            payload.append("cover", updateProfile.cover, "cover")
        }

        setLoading(true)
        dispatch(updateProfileAction(payload)).unwrap().then((user) => {
            handleCloseImageChoose()
            if (!user) return;

            setState(prev => {
                return {
                    ...prev,
                    user: {
                        ...prev.user,
                        ...user
                    }
                }
            })

        }).catch(ex => {
            setError(ex)
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <>

            {auth?._id === userId && <ModalWithBackdrop
                modalClass={`${updateProfile.openImageChooserModal === "cover" ? "profile-cover-picker" : "profile-avatar-picker"} card`}
                onClose={handleCloseImageChoose}
                isOpen={updateProfile.openImageChooserModal}>
                <div>
                    <div>
                        <h1 className="color_h1 text-sm">{
                            updateProfile.openImageChooserModal === "avatar"
                                ? "Resize Avatar"
                                : "Resize Cover Image"}
                        </h1>

                        {isLoading && <MoonLoader size={20}/>}
                        <Info className="mt-2" status="error" message={errorMessage}/>

                    </div>


                    <div className="profile-image-editor relative mt-3">
                        {updateProfile.originalAvatar &&
                            <ImageEditor onCropComplete={onCropComplete} aspect={1}
                                         src={updateProfile.originalAvatar}/>}
                        {updateProfile.originalCover &&
                            <ImageEditor onCropComplete={onCropComplete} aspect={13 / 5}
                                         src={updateProfile.originalCover}/>}
                    </div>

                    <div>
                        <button onClick={handleUpload}
                                className={`btn mt-2 ${isLoading ? "btn-disable" : "btn-primary"}`}>Upload
                        </button>
                    </div>
                </div>
            </ModalWithBackdrop>

            }
            <div className="profile-page">
                {state.user && (
                    <>
                        <div className="profile-header-bg">

                            <div className="container-1200">

                                <div className="cover-image relative"
                                     style={{backgroundImage: `url(${state.user.cover})`}}>

                                    {auth?._id === userId && <div className="circle rounded_circle choose-cover-btn"
                                         onClick={() => handleSelectImageChooser("cover")}>
                                        <BiCamera className="color_p"/>
                                    </div> }
                                </div>

                                {/*{state.user._id === auth._id && (*/}
                                {/*    <div className="mt-2">*/}
                                {/*        <Button onClick={handleUploadAvatar} className="btn text-xs font-medium">Change Photo*/}
                                {/*        </Button>*/}
                                {/*    </div>*/}
                                {/*)}*/}

                                <div className="profile-content">

                                    <div className="flex items-center relative">
                                        <Avatar
                                            className="!h-40 !w-40 profile-image"
                                            src={state.user?.avatar}
                                            imgClass="!h-40 !w-40 !text-xs"
                                            username={state.user.fullName}
                                        />

                                        {auth?._id === userId && <div onClick={() => handleSelectImageChooser("avatar")}
                                             className="circle rounded_circle choose-avatar-btn">
                                            <BiCamera className="color_p"/>
                                        </div>}

                                        <div className="ml-2 md:ml-4">
                                            <h4 className="text-2xl font-semibold color_h1">{state.user.fullName}</h4>
                                            <span className="text-md font-medium color_h3">123 Friends</span>
                                            <AvatarGroup imgClass="!w-10 !h-10" className="!w-10 !h-10" data={[
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                                {avatar: auth.avatar, fullName: "Rasel mahmud"},
                                            ]}/>
                                        </div>
                                    </div>

                                    <div className="profile-section-nav flex mt-2">
                                        {Object.keys(sectionNavs).map((name) => (
                                            <li key={name} onClick={() => handleSelectSection(name)}
                                                className={["profile-section-item color_p", state.showSectionName === name ? "active" : ""].join(" ")}
                                            >{name}</li>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-1200">

                            <div className="">
                                {sectionNavs[state.showSectionName] && sectionNavs[state.showSectionName]({
                                    authId: auth._id,
                                    userId: state.user._id
                                })}
                            </div>
                        </div>

                    </>
                )}
            </div>
        </>
    );
};

export default Profile;