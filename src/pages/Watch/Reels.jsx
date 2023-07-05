import React, {memo, useEffect, useRef, useState} from 'react';
import WithPageSidebar from "components/Watch/WithPageSidebar.jsx";
import "./reels.scss"
import {useSelector} from "react-redux";
import Reel from "components/Reel/Reel.jsx";
import {useInView} from "react-intersection-observer";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import {Link, useNavigate} from "react-router-dom";
import apis from "src/apis/index.js";


const Reels = () => {

    const {auth} = useSelector(state => state.authState)

    const navigate = useNavigate()
    const [reels, setReels] = useState([])


    useEffect(() => {
        apis.get("/reels").then(({data, status}) => {
            if (status === 200) {
                setReels(data.reels)
            }
        })
    }, [])


    return (

        <WithPageSidebar>
            <div className="group-content w-full">

                <div className="relative">
                    {reels?.map(reel => (
                        <ReelsParent key={reel._id} reel={reel} auth={auth}/>
                    ))}

                    <div className="new-reel-btn">
                        <MenuDropdown contentClass="absolute rounded-md min-h-[100px] !p-0 bottom-14 right-10"
                                      render={() => (

                                          <div onClick={() => navigate("/watch/reels/create")}
                                               className="list-item whitespace-nowrap gap-x-2">
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


const ReelsParent = memo(({auth, reel}) => {

    const videoref = useRef();
    const navigate = useNavigate()


    const {ref, inView, root} = useInView({
        threshold: 0
    });

    function getRef(re) {
        if (re && re?.current) {
            videoref.current = re.current
        }
    }

    useEffect(() => {
        if (inView === true) {
            videoref.current?.play();
            let reelId = videoref.current?.dataset?.id
            navigate("/watch/reels?reelId=" + reelId)
        } else {
            videoref.current?.pause()
        }

    }, [inView]);

    return (
        <div className="reels-parent">
            <div className="reels" ref={ref}>
                <Reel onRefReady={getRef} reel={reel} auth={auth}/>
            </div>
        </div>

    )
})

export default Reels;