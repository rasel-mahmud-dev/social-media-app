import FeedCard from "../compoenents/FeedCard/FeedCard.jsx";
import Avatar from "../compoenents/Avatar/Avatar.jsx";
import React, {useEffect, useState} from "react";
import AddPost from "../compoenents/AddPost/AddPost.jsx";
import ModalWithBackdrop from "../compoenents/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import HomeLayout from "layout/HomeLayout.jsx";

const Homepage = () => {

    const dispatch = useDispatch()


    const feedState = useSelector(state => state.feedState)


    useEffect(() => {
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
    }, [])


    const [isOpenAddPostModal, setOpenAddPostModal] = useState(false)


    return (
        <div className="mt-1.5">

            <ModalWithBackdrop modalClass="!max-w-xl" isOpen={isOpenAddPostModal}
                               onClose={() => setOpenAddPostModal(false)}>
                <AddPost/>
            </ModalWithBackdrop>


            <HomeLayout>
                <div className="flex gap-x-4">


                    <div>

                        <div className="card mb-4">
                            <div>

                                <div className=" flex items-center gap-x-2 border-b border-neutral-600/10 mb-3 pb-3">
                                    <Avatar className="!w-9 !h-9" imgClass="!w-9 !h-9" username="Ava"></Avatar>
                                    <h2 className="py-2 bg-neutral-100 rounded-full px-3 w-full"
                                        onClick={() => setOpenAddPostModal(true)}>What on you mind</h2>
                                </div>


                                <div className="flex items-center justify-around">
                                    <li className="list-none flex items-center gap-x-1">
                                        <i className="icon2 video-icon"></i>
                                        <span>Videos</span>
                                    </li>
                                    <li className="list-none flex items-center gap-x-1">
                                        <i className="icon2 photo-icon"></i>
                                        <span>Photos</span>
                                    </li>
                                    <li className="list-none flex items-center gap-x-1">
                                        <i className="icon2 emoji-icon"></i>
                                        <span>Feelings</span>
                                    </li>
                                </div>


                            </div>
                        </div>


                        {/**** all feed */}
                        <div className="flex flex-col gap-y-4">
                            {feedState.feeds.map((feed) => (
                                <FeedCard dispatch={dispatch} feed={feed} key={feed._id}/>
                            ))}
                        </div>


                    </div>


                </div>
            </HomeLayout>


        </div>
    );
};

export default Homepage;