import useCustomReducer from "src/hooks/useReducer.jsx";
import PostSection from "components/Profile/PostSection.jsx";
import MediaSection from "components/Profile/MediaSection.jsx";
import {BiCamera} from "react-icons/bi";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";

import "./profile.scss"
import {useNavigate} from "react-router-dom";

function RenderProfile(props) {

    const {auth, user, onSelectImageChooser, isNotOpenFromProfile = false} = props

    const navigate = useNavigate()

    const [state, setState] = useCustomReducer({
        feeds: [], friends: [], user: null, isLoading: false, showSectionName: "Posts", currentUserFollowing: null // {}
    })

    // const [updateProfile, setUpdateState] = useCustomReducer({
    //     openImageChooserModal: "", originalAvatar: null, originalCover: null, avatar: null, cover: null,
    // })

    const sectionNavs = {
        Posts: (params) => <PostSection {...params} />,
        Friends: (params) => "Working",
        Timeline: (params) => "Working",
        Photos: (params) => <MediaSection  {...params} />,
        Follower: (params) => "Working"
    }

    function handleSelectSection(sectionName) {
        if (isNotOpenFromProfile) {

            navigate("/profile/" + user._id)
            return;
        }
        setState({
            showSectionName: sectionName
        })
    }


    return (
        <div className="profile-page">
            {user && (
                <>
                    <div className="profile-header-bg">

                        <div className="container-1200">

                            <div className="cover-image relative"
                                 style={{backgroundImage: `url(${user.cover})`}}>

                                {auth?._id === user._id && (
                                    <div className="circle rounded_circle choose-cover-btn"
                                         onClick={() => onSelectImageChooser("cover")}>
                                        <BiCamera className="color_p"/>
                                    </div>
                                )}
                            </div>

                            {/*{state.user._id === auth._id && (*/}
                            {/*    <div className="mt-2">*/}
                            {/*        <Button onClick={handleUploadAvatar} className="btn text-xs font-medium">Change Photo*/}
                            {/*        </Button>*/}
                            {/*    </div>*/}
                            {/*)}*/}

                            <div className="profile-content">

                                <div className="flex items-end relative">
                                    <Avatar
                                        className="profile-image"
                                        src={user?.avatar}
                                        imgClass=" !text-xs"
                                        username={user.fullName}
                                    />

                                    {auth?._id === user._id && <div onClick={() => onSelectImageChooser("avatar")}
                                                                    className="circle rounded_circle choose-avatar-btn">
                                        <BiCamera className="color_p"/>
                                    </div>}

                                    <div className="ml-2 md:ml-4">
                                        <h4 className="text-2xl font-semibold color_h1">{user.fullName}</h4>
                                        <span className="text-md font-medium color_h3">123 Friends</span>
                                        <AvatarGroup imgClass="!w-10 !h-10" className="!w-10 !h-10" data={[{
                                            avatar: auth.avatar,
                                            fullName: "Rasel mahmud"
                                        }, {avatar: auth.avatar, fullName: "Rasel mahmud"}, {
                                            avatar: auth.avatar,
                                            fullName: "Rasel mahmud"
                                        }, {avatar: auth.avatar, fullName: "Rasel mahmud"}, {
                                            avatar: auth.avatar,
                                            fullName: "Rasel mahmud"
                                        }, {avatar: auth.avatar, fullName: "Rasel mahmud"}, {
                                            avatar: auth.avatar,
                                            fullName: "Rasel mahmud"
                                        }, {avatar: auth.avatar, fullName: "Rasel mahmud"}, {
                                            avatar: auth.avatar,
                                            fullName: "Rasel mahmud"
                                        },]}/>
                                    </div>
                                </div>

                                <div className="flex items-enter justify-between ">
                                    <div className="profile-section-nav flex mt-2">
                                        {Object.keys(sectionNavs).map((name) => (
                                            <li key={name} onClick={() => handleSelectSection(name)}
                                                className={["profile-section-item color_p", state.showSectionName === name ? "active" : ""].join(" ")}
                                            >{name}</li>))}
                                    </div>
                                    <div className="flex items-center justify-between gap-x-2">
                                        {/*{isFriend(friends, state.user._id) ?*/}
                                        {/*    <Button onClick={() => handleToggleFriend()}*/}
                                        {/*            className="btn-primary">Unfriend</Button> :*/}
                                        {/*    <Button onClick={() => handleToggleFriend(true)}*/}
                                        {/*            className="btn-primary">Add Friend</Button>}*/}
                                        {/*<Button onClick={handleOpenChatForSendMessage}*/}
                                        {/*        className="btn-primary">Message</Button>*/}


                                        {/*<Button onClick={() => toggleFollowFriend(state.user._id)}*/}
                                        {/*        className="btn-primary">{state?.currentUserFollowing?.following ? "UnFollow" : "Follow"}</Button>*/}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="container-1200">

                        <div className="">
                            {sectionNavs[state.showSectionName] && sectionNavs[state.showSectionName]({
                                authId: auth._id, userId: user._id
                            })}
                        </div>
                    </div>

                </>)}
        </div>
    )
}

export default RenderProfile