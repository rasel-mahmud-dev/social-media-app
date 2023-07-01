import {useCallback, useEffect, useState} from 'react';
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
import Button from "components/Shared/Button/Button.jsx";
import findUserRoom from "src/store/utils/findUserRoom.js";
import handleStartChat from "src/store/utils/handleStartChat.js";
import {createRoomAction} from "src/store/actions/chatAction.js";
import RenderProfile from "pages/Profile/RenderProfile.jsx";



const Profile = () => {

    const {userId} = useParams()

    const dispatch = useDispatch()

    const {auth, friends} = useSelector(state => state.authState)
    const {groups} = useSelector(state => state.chatState)

    const [state, setState] = useCustomReducer({
        feeds: [],
        friends: [],
        totalFriends: 0,
        user: null,
        isLoading: false,
        showSectionName: "Posts",
        currentUserFollowing: null // {}
    })

    const [updateProfile, setUpdateState] = useCustomReducer({
        openImageChooserModal: "", originalAvatar: null, originalCover: null, avatar: null, cover: null,

    })

    // check the following status with current logged user.
    function fetchFollowerInfo(userId) {
        apis.get("/follow/status/?userId=" + userId).then(({status, data}) => {
            if (status === 200) {
                setState({
                    currentUserFollowing: data.following
                })
            }
        }).catch(() => {
        })
    }

    useEffect(() => {
        if (userId) {
            apis.get("/users/profile/" + userId).then(({status, data}) => {
                if (status === 200) {
                    setState({
                        feeds: data.feeds,
                        totalFriends: data.totalFriends,
                        friends: data.friends,
                        user: data.user,
                    })

                    // if view current logged user profile
                    if (auth._id === data.user._id) return;

                    // check the following status with current logged user.
                    fetchFollowerInfo(data.user._id)
                }
            }).catch(() => {
            })
        }
    }, [userId])


    const [errorMessage, setError] = useState("")
    const [isLoading, setLoading] = useState(false)



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
            const croppedImage = await getCroppedImg(updateProfile?.originalAvatar, croppedAreaPixels,)
            setUpdateState({
                avatar: croppedImage
            })
        }

        if (updateProfile?.originalCover) {
            const croppedImage = await getCroppedImg(updateProfile?.originalCover, croppedAreaPixels,)
            setUpdateState({
                cover: croppedImage
            })
        }
    }, [updateProfile?.originalAvatar, updateProfile?.originalCover])


    function handleCloseImageChoose() {
        setUpdateState({
            openImageChooserModal: "", originalAvatar: null, originalCover: null
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
                    ...prev, user: {
                        ...prev.user, ...user
                    }
                }
            })

        }).catch(ex => {
            setError(ex)
        }).finally(() => {
            setLoading(false)
        })
    }


    // send a message with friend and non friend.
    async function handleOpenChatForSendMessage() {

        if (!state?.user) return;

        // check a group if a group not found, then create new one.
        let group = findUserRoom(groups, state.user._id)

        if (!group) {
            const groupData = await dispatch(createRoomAction({
                name: "", type: "private", participants: [state.user._id]
            }))

            if (groupData.payload) {
                group = groupData.payload
            }
        }

        handleStartChat(state.user, group, dispatch, groups, function (err) {
            if (err) {
                alert(err)
            }
        })
    }

    function isFriend(friends, userId) {
        let result = false
        for (let i = 0; i < friends.length; i++) {
            if (friends[i].senderId === userId || friends[i].receiverId === userId) {
                result = true
                break
            }
        }
        return result;
    }

    function handleToggleFriend(isAddFriend = false) {
        console.log(isAddFriend)
        alert("Friend toggle not implemented  yet")
    }

    async function toggleFollowFriend(fiendId) {
        try {
            if (state?.currentUserFollowing?.following === fiendId) {
                // remove
                const {data, status} = await apis.post("/follow/remove", {following: fiendId})
                if (status === 201) {
                    fetchFollowerInfo(fiendId)
                }
            } else {
                //add
                const {data, status} = await apis.post("/follow/add", {following: fiendId})
                if (status === 201) {
                    fetchFollowerInfo(fiendId)
                }
            }

        } catch (ex) {
            console.log(ex)
        }
    }

    console.log(state?.currentUserFollowing)

    return (
        <>
        {auth?._id === userId && <ModalWithBackdrop
            modalClass={`${updateProfile.openImageChooserModal === "cover" ? "profile-cover-picker" : "profile-avatar-picker"} card`}
            onClose={handleCloseImageChoose}
            isOpen={updateProfile.openImageChooserModal}>
            <div>
                <div>
                    <h1 className="color_h1 text-sm">{updateProfile.openImageChooserModal === "avatar" ? "Resize Avatar" : "Resize Cover Image"}
                    </h1>

                    {isLoading && <MoonLoader size={20}/>}
                    <Info className="mt-2" status="error" message={errorMessage}/>

                </div>


                <div className="profile-image-editor relative mt-3">
                    {updateProfile.originalAvatar && <ImageEditor onCropComplete={onCropComplete} aspect={1}
                                                                  src={updateProfile.originalAvatar}/>}
                    {updateProfile.originalCover && <ImageEditor onCropComplete={onCropComplete} aspect={13 / 5}
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

        {state?.user && (
            <RenderProfile
               onSelectImageChooser={handleSelectImageChooser}
               auth={auth}
               totalFriends={state.totalFriends}
               friends={state.friends}
               user={state.user}
            />
        )}

    </>);
};

export default Profile;

