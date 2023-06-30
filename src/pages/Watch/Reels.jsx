import React, {useEffect, useRef} from 'react';
import WithPageSidebar from "components/Watch/WithPageSidebar.jsx";
import "./reels.scss"
import {BiChevronLeft, BiChevronRight, BiPause, BiPlay} from "react-icons/bi";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {AiFillSound} from "react-icons/ai";
import {FaEllipsisH} from "react-icons/fa";
import {TiTimes} from "react-icons/ti";
import staticImage from "src/utils/staticImage.js";
import {useSelector} from "react-redux";
import useCustomReducer from "src/hooks/useReducer.jsx";

import Reel from "components/Reel/Reel.jsx";
import {useInView} from "react-intersection-observer";
import ModalWithBackdrop from "components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import CreateReel from "pages/Watch/CreateReel.jsx";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {Link, useNavigate} from "react-router-dom";

const Reels = () => {

    const {auth} = useSelector(state => state.authState)

    const navigate = useNavigate()

    const reel = {
        author: auth,
        videoUrl: "public/video/Snapsave_774bf77d95afe78b6bfcd467fef64f6c_1080p.mp4",
        caption: "হরতাল চলছে।",
        tags: ["#short", "#viral", "#new", "#funny"]
    }


    const videoref = useRef();


    const {ref, inView} = useInView({
        threshold: 0
    });

    useEffect(() => {
        if (inView === true) {
            videoref.current.play();
        }
    });

    function getRef(re){
        if(re && re?.current){
            videoref.current = re.current
        }
    }


    return (

        <WithPageSidebar myPages={[]}>
            <div className="group-content w-full">
                <div className="reels" ref={ref}>

                    <Reel  onRefReady={getRef} reel={reel} auth={auth} />


                    <div className="new-reel-btn">
                        <MenuDropdown contentClass="absolute rounded-md min-h-[100px] !p-0 bottom-14 right-10" render={()=>(

                                <div onClick={()=>navigate("/watch/reels/create")} className="list-item whitespace-nowrap gap-x-2">
                                    <i className="icon_reels png_filter_white"></i>
                                    <span>Create Reel</span>
                                </div>

                        )}>
                        <div className="rounded_circle w-12 h-12">
                            <i className="icon_edit png_filter_white"></i>
                        </div>
                        </MenuDropdown>
                    </div>



                </div>
            </div>
        </WithPageSidebar>

    );
};

export default Reels;