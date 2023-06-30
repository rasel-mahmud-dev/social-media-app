import React, {useEffect} from 'react';
import {BiCamera} from "react-icons/bi";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";
import {useNavigate, useParams} from "react-router-dom";
import useCustomReducer from "src/hooks/useReducer.jsx";
import MediaSection from "components/Profile/MediaSection.jsx";
import {useSelector} from "react-redux";
import apis from "src/apis/index.js";
import Button from "components/Shared/Button/Button.jsx";

import "../Profile/profile.scss"
import Intro from "components/Pages/Intro.jsx";
import Likes from "components/Pages/Likes.jsx";
import PageFollowers from "components/Pages/PageFollowers.jsx";


const PageDetail = (props) => {

    const {auth} = useSelector(state => state.authState)

    const {pageName} = useParams()

    function onSelectImageChooser() {
    }

    let isNotOpenFromProfile = false

    const navigate = useNavigate()

    const [state, setState] = useCustomReducer({
        feeds: [],
        friends: [],
        pageDetail: null,
        totalLikes: 0,
        totalFollowers: 0,
        isLoading: false,
        likes: [],
        showSectionName: "Posts",
        currentUserFollowing: null // {}
    })

    // const [updateProfile, setUpdateState] = useCustomReducer({
    //     openImageChooserModal: "", originalAvatar: null, originalCover: null, avatar: null, cover: null,
    // })

    const sectionNavs = {
        Posts: (params) => <Intro {...params} />,
        About: (params) => <Intro  {...params} />,
        Photos: (params) => <MediaSection  {...params} />,
        Videos: (params) => <MediaSection  {...params} />,
        Followers: (params) => <PageFollowers pageId={state.pageDetail._id}  />,
        Likes: (params) => <Likes likes={state.likes}  {...params} />
    }

    useEffect(() => {
        apis.get("/page/" + pageName).then(({data, status}) => {
            if (status === 200) {
                setState({
                    pageDetail: data.page,
                    totalLikes: data.totalLikes,
                    totalFollowers: data.totalFollowers,
                })

                apis.get("/page/likes?pageId=" + data.page._id).then(({data, status}) => {
                    if (status === 200) {
                        setState({
                            likes: data.likes
                        })
                    }
                })

            }
        })
    }, [pageName])

    function handleSelectSection(sectionName) {
        if (isNotOpenFromProfile) {
            navigate("/profile/" + user._id)
            return;
        }
        setState({
            showSectionName: sectionName
        })
    }

    function handleUploadAvatar() {
    }

    function handleAddLike(pageId) {
        apis.post("/page/toggle-like", {pageId}).then(({data, status}) => {
            if (status !== 201) return;
            if (data.removed) {
                setState(prev => ({
                    likes: prev.likes.filter(like => like.pageId !== pageId),
                    totalLikes: prev.totalLikes - 1
                }))
            } else {
                setState(prev => ({
                    likes: [...prev.likes, data.like],
                    totalLikes: prev.totalLikes + 1
                }))
            }
        })
    }

    function isLiked(pageId) {
        return state.likes.findIndex(like => like.pageId === pageId) !== -1
    }

    return (
        <div>
            <div className="profile-page">
                {state.pageDetail && (
                    <>
                        <div className="profile-header-bg">

                            <div className="container-1200">

                                <div className="cover-image relative"
                                     style={{backgroundImage: `url(${state.pageDetail.coverPhoto})`}}>

                                    {auth?._id === state.pageDetail._id && (
                                        <div className="circle rounded_circle choose-cover-btn"
                                             onClick={() => onSelectImageChooser("cover")}>
                                            <BiCamera className="color_p"/>
                                        </div>
                                    )}
                                </div>

                                {state.pageDetail.ownerId === auth._id && (
                                    <div className="mt-2">
                                        <Button onClick={handleUploadAvatar} className="btn text-xs font-medium">Change
                                            Photo
                                        </Button>
                                    </div>
                                )}

                                <div className="profile-content">

                                    <div className="flex items-end relative   ">
                                        <div>
                                            <Avatar
                                                className=" profile-image"
                                                src={state.pageDetail?.logo}
                                                imgClass=" !text-xs"
                                                username={state.pageDetail.name}
                                            />
                                        </div>

                                        {auth?._id === state.pageDetail._id &&
                                            <div
                                                onClick={() => onSelectImageChooser("avatar")}
                                                className="circle rounded_circle choose-avatar-btn">
                                                <BiCamera className="color_p" />
                                            </div>
                                        }

                                        <div className="ml-2 md:ml-4 flex w-full justify-between items-center">
                                            <div>
                                                <h4 className="text-2xl font-semibold color_h1">{state.pageDetail.name}</h4>
                                                <div className="flex gap-x-2">
                                                    <span className="text-md font-medium color_h3">{state.totalLikes} likes</span>
                                                    <span className="text-md font-medium color_h3">{state.totalFollowers} Followers</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between gap-x-2">

                                                <Button className="btn-primary">Learn More</Button>

                                                {
                                                    state?.pageDetail?.ownerId === auth._id
                                                        ? <Button className="btn-dark2">Likes</Button>
                                                        : <Button className="btn-dark2"
                                                                  onClick={() => handleAddLike(state?.pageDetail._id)}>
                                                            <img src="/icons/8ZPP99FZRAP.png" alt=""/>
                                                            {isLiked(state.pageDetail._id) ? "Liked" : "Like"}
                                                        </Button>
                                                }

                                                <Button
                                                    className="btn-dark2">Message</Button>

                                            </div>

                                        </div>
                                    </div>

                                    <div className="border-b border-dark-600 mt-7 mb-4"></div>

                                    <div
                                        className="flex items-enter justify-between ">
                                        <div className="profile-section-nav flex mt-2">
                                            {Object.keys(sectionNavs).map((name) => (
                                                <li key={name} onClick={() => handleSelectSection(name)}
                                                    className={["profile-section-item color_p", state.showSectionName === name ? "active" : ""].join(" ")}
                                                >{name}</li>))}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="container-1200">

                            <div className="">
                                {sectionNavs[state.showSectionName] && sectionNavs[state.showSectionName]({
                                    authId: auth._id,
                                    page: state.pageDetail,
                                })}
                            </div>
                        </div>
                    </>)}
            </div>
        </div>
    );
};

export default PageDetail;