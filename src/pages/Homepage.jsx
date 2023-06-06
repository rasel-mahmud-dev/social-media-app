import Sidebar from "../compoenents/Sidebar/Sidebar.jsx";
import FeedCard from "../compoenents/FeedCard/FeedCard.jsx";
import PendingFriendRequestCard from "../compoenents/FindFriendCard/PendingFriendRequestCard.jsx";
import Avatar from "../compoenents/Avatar/Avatar.jsx";
import React, {useEffect, useState} from "react";
import AddPost from "../compoenents/AddPost/AddPost.jsx";
import ModalWithBackdrop from "../compoenents/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {BiCamera, BiImage, BiPen, BiVideo} from "react-icons/bi";
import {FaEllipsisH} from "react-icons/fa";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import HomeLayout from "layout/HomeLayout.jsx";

const Homepage = () => {

    const dispatch = useDispatch()


    const feedState = useSelector(state=>state.feedState)


    useEffect(()=>{
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
    }, [])



    const [isOpenAddPostModal, setOpenAddPostModal] = useState(false)

    return (
        <div className="mt-1.5">

            <ModalWithBackdrop  modalClass="!max-w-xl" isOpen={isOpenAddPostModal} onClose={()=>setOpenAddPostModal(false)}>
                <AddPost/>
            </ModalWithBackdrop>


            <HomeLayout>
                <div className="flex gap-x-4">



                    <div>

                        <div className="card mb-4">
                            <div>
                                <div className="flex items-center"> <div className="icon-box">
                                    <BiPen />
                                </div>
                                    <label htmlFor="">Create Post</label>

                                </div>

                                <div className="h-20 mt-3 ">
                                    <div className=" flex items-center gap-x-2">
                                        <Avatar username="Ava"></Avatar>
                                        <h2 onClick={()=>setOpenAddPostModal(true)}>What on you mind</h2>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-x-4">
                                        <li className="list-none flex items-center gap-x-1">
                                            <BiVideo/>
                                            Live Video
                                        </li>
                                        <li className="list-none flex items-center gap-x-1">
                                            <BiImage/>
                                            Photos/Videos
                                        </li>
                                        <li className="list-none flex items-center gap-x-1">
                                            <BiCamera/>
                                            Feallings
                                        </li>
                                    </div>
                                    <FaEllipsisH className="text-xs text-neutral-500" />
                                </div>

                            </div>
                        </div>


                        {/**** all feed */}
                        <div className="flex flex-col gap-y-4">
                            {feedState.feeds.map((feed)=>(
                                <FeedCard feed={feed} key={feed._id} />
                            ))}
                        </div>


                    </div>


                </div>
            </HomeLayout>





        </div>
    );
};

export default Homepage;