import React, {useEffect, useState} from 'react';
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getStoriesAction} from "src/store/actions/storyAction.js";
import moment from "moment";
import {BiChevronLeft, BiChevronRight, BiPause, BiPlay, BiPlus} from "react-icons/bi";
import staticImage from "src/utils/staticImage.js";
import {AiFillSound} from "react-icons/ai";
import {FaEllipsisH} from "react-icons/fa";
import "../../components/Story/story.scss"
import {TiTimes} from "react-icons/ti";
import CreateStory from "components/Story/CreateStory.jsx";
import useCustomReducer from "src/hooks/useReducer.jsx";

const intervalId = {
    current: 0
}

const Stories = () => {

    const {storyId} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {stories, auth} = useSelector(state => state.authState)

    const [state, setState] = useCustomReducer({
        showStoryIndex: -1,
        counter: 0,
        startCount: null,
        isPause: false,
        isCreateStoryModalOpen: false
    })


    const [progress, setProgress] = useState(0)

    // const intervalId = useRef()

    useEffect(() => {
        if (stories && stories.length > 0 && storyId) {
            const storyIndex = stories.findIndex(story => story._id === storyId)
            setState({showStoryIndex: storyIndex, isPaused: false, isCreateStoryModalOpen: false})
            clearInterval(intervalId.current)
            intervalId.current = 0
        }

        return () => clearInterval(intervalId.current)
    }, [storyId, stories])


    useEffect(() => {
        dispatch(getStoriesAction())
    }, [])

    function handleShowStory(storyId) {
        navigate("/stories/" + storyId)
    }

    function togglePlayPause(isPause) {
        if (isPause) {
            startCountDown()
            setState({
                isPause: false
            })
        } else {
            intervalId?.current && clearInterval(intervalId.current)
            setState({
                isPause: true
            })
        }
    }

    useEffect(() => {
        let storyDetail = stories[state.showStoryIndex]
        if (storyDetail) {
            console.log("count start")

            // first clear time interval if it's previously already running
            intervalId.current && clearInterval(intervalId.current)

            setProgress(0)
            setState({
                startCount: new Date()
            })
            startCountDown()
        } else {

            intervalId.current && clearInterval(intervalId.current)
            setProgress(0)
        }

        return () => intervalId.current && clearInterval(intervalId.current)
    }, [state.showStoryIndex])

    function startCountDown() {
        intervalId.current = setInterval(() => {
            setProgress(prev => {
                const value = prev + 1
                if (value > 99) {

                    clearInterval(intervalId.current)

                    // next item play
                    const story = stories[state.showStoryIndex + 1]
                    if (story) {
                        handleShowStory(story._id)
                    }

                    return 100
                } else {
                    return prev + 1
                }
            })
        }, 100)
    }

    function handleChangeStory(storyIndex) {
        if (storyIndex > stories.length - 1) {
            return;
        }
        let story = stories[storyIndex]
        if (story) {
            navigate("/stories/" + story._id)
        }
    }

    function handleCloseStory() {
        navigate("/")
    }


    function renderStoryDetail() {

        let storyDetail = stories[state.showStoryIndex]
        // let storyDetail = stories[0]
        if (storyDetail) {
            return (
                <div className="story-view-card-wrapper">

                    {state.showStoryIndex > 0 && (
                        <div className="prev-story-btn" onClick={() => handleChangeStory(state.showStoryIndex - 1)}>
                            <BiChevronLeft/>
                        </div>
                    )}
                    {state.showStoryIndex < stories.length && (
                        <div className="next-story-btn" onClick={() => handleChangeStory(state.showStoryIndex + 1)}>
                            <BiChevronRight/>
                        </div>
                    )}

                    <div className="story-view-card">

                        <div className="story-view-header w-full">
                            <div className="progressbar">
                                {storyDetail.media.map((media, i) => (
                                    <li key={i} style={{width: `${progress}%`}} className="progress-item"></li>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-3">
                                <div className="story-view-author flex items-center gap-x-2 ">
                                    <Avatar username={storyDetail?.author.fullName} src={storyDetail?.author.avatar}
                                            className="!w-8 !h-8  rounded-full " imgClass="!text-xs"/>
                                    <h4 className="font-medium">{storyDetail?.author.fullName}</h4>
                                </div>

                                <div className="flex items-center mr-3 gap-x-2   ">
                                    <span className="cursor-pointer" onClick={() => togglePlayPause(state.isPause)}>
                                        {state.isPause
                                            ? <BiPlay className="text-4xl text-white"/>
                                            : <BiPause className="text-4xl text-white"/>
                                        }
                                    </span>
                                    <AiFillSound className="text-2xl text-white"/>
                                    <FaEllipsisH className="text-xl text-white hidden lg:block"/>
                                    <TiTimes onClick={handleCloseStory} className="text-xl text-white block lg:hidden"/>
                                </div>
                            </div>
                        </div>

                        <img src={staticImage(storyDetail.media[0].url)} alt=""/>
                    </div>
                </div>
            )
        }
    }


    function handleToggleOpenCreateStory() {
        clearInterval(intervalId.current)
        navigate("/stories")
        setState(prev => ({
            isCreateStoryModalOpen: !prev.isCreateStoryModalOpen
        }))
    }

    return (
        <div>
            <div className="flex card !p-0 !m-0">
                <div className="my-stories-sidebar  p-4">
                    <h3 className="text-base font-medium color_h1">Your story</h3>
                    <div className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center gap-x-2 mt-3 ">
                            <Avatar username={auth?.fullName} src={auth?.avatar}
                                    imgClass="!w-14 !h-14 p-1 border-2 border-primary-400"
                                    className="!w-14 !h-14  rounded-full "/>
                            <h4 className="color_h2 font-medium">{auth?.fullName}</h4>
                        </div>
                        <div onClick={handleToggleOpenCreateStory}
                             className="w-12 h-12 bg-neutral-100 flex items-center justify-center rounded-full">
                            <BiPlus/></div>
                    </div>


                    <div className="mt-8">
                        <h3 className="text-base font-medium color_h1">All stories</h3>
                        <div>
                            {stories.map((story) => (
                                <div onClick={() => handleShowStory(story._id)} className="flex items-center my-4"
                                     key={story._id}>
                                    <Avatar
                                        imgClass="text-xs !w-14 !h-14 p-1 border-2 border-primary-400"
                                        className="!w-14 !h-14 rounded-full"
                                        src={story?.author?.avatar}
                                        username={story?.author.fullName}/>
                                    <div className="ml-3">
                                        <h3 className="text-base font-medium color_h2">{story?.author.fullName}</h3>
                                        <div className="flex items-center gap-x-2 color_h3">
                                            <p className=" text-sm ">2 New</p>
                                            <p className=" text-sm">{moment(new Date(story.createdAt)).fromNow()}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

                <div
                    className="create-story-type-card open-story-content  flex w-full items-center justify-center gap-x-4 relative ">
                    {/**** media preview window ****/}

                    {state.isCreateStoryModalOpen
                        ? <CreateStory/>
                        : renderStoryDetail()
                    }

                </div>
            </div>
        </div>
    );
};

export default Stories;