import React, {useEffect, useRef} from 'react';
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {BiPause, BiPlay} from "react-icons/bi";
import {AiFillSound} from "react-icons/ai";
import {FaEllipsisH} from "react-icons/fa";
import {TiTimes} from "react-icons/ti";
import staticImage from "src/utils/staticImage.js";
import useCustomReducer from "src/hooks/useReducer.jsx";

import "./reel.scss"

const Reel = ({reel, onRefReady}) => {

    const [state, setState] = useCustomReducer({
        isPause: true,
        isMuted: false
    })


    const isPause = true

    const videoRef = useRef()

    useEffect(() => {
        if (videoRef.current) {
            onRefReady(videoRef)
        }
    }, [videoRef]);


    function handleChangeStory() {

    }


    function togglePlayPause() {
        handlePlayVideo()
    }

    function handleCloseStory() {

    }

    const showStoryIndex = 1

    function handlePlayVideo() {

        let isPause = videoRef.current?.paused
        if (isPause) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }

        setState({
            isPause: !isPause
        })


        // let target = e.currentTarget
        // let video = target.children[0]
        //
        // console.log(video)

    }

    return (
        <div>
            <div className="reel">


                {/*<div className="prev-story-btn" onClick={() => handleChangeStory(showStoryIndex - 1)}>*/}
                {/*    <BiChevronLeft/>*/}
                {/*</div>*/}


                {/*<div className="next-story-btn" onClick={() => handleChangeStory(showStoryIndex + 1)}>*/}
                {/*    <BiChevronRight/>*/}
                {/*</div>*/}


                <div className="">

                    <div className="reel-header">
                        <div className="progressbar">
                            {/*{storyDetail.media.map((media, i) => (*/}
                            {/*    <li key={i} style={{width: `${progress}%`}} className="progress-item"></li>*/}
                            {/*))}*/}
                        </div>

                        <div className="reel-author">
                            <div className=" flex items-center gap-x-2 ">
                                <Avatar username={reel?.author.fullName} src={reel?.author.avatar}
                                        className="!w-8 !h-8  rounded-full " imgClass="!w-8 !h-8 !text-xs"/>
                                <h4 className="text-white font-medium">{reel?.author.fullName}</h4>
                            </div>


                            <div className="flex items-center ">
                                            <span className="cursor-pointer" onClick={togglePlayPause}>
                                        {state.isPause
                                            ? <BiPlay className="text-4xl text-white"/>
                                            : <BiPause className="text-4xl text-white"/>
                                        }
                                    </span>
                                <AiFillSound className="text-2xl text-white"/>
                                <FaEllipsisH className="text-xl text-white hidden lg:block"/>
                                <TiTimes onClick={handleCloseStory}
                                         className="text-xl text-white block lg:hidden"/>
                            </div>


                        </div>
                    </div>

                    <div className="reel-video-root" onClick={handlePlayVideo}>
                        <video ref={videoRef} src={staticImage(reel.videoUrl)} data-id={reel._id}/>
                    </div>


                    <div className="bottom-meta">
                        <p className="caption">{reel.caption}</p>
                        <div className="tags">
                            {reel?.tags?.map((tag, i) => (
                                <a href="" key={i}>{tag}</a>
                            ))}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}


export default Reel;