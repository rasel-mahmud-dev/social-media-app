import FeedCard from "../components/FeedCard/FeedCard.jsx";
import Avatar from "../components/Avatar/Avatar.jsx";
import React, {memo, useEffect, useState} from "react";
import AddPost from "../components/AddPost/AddPost.jsx";
import ModalWithBackdrop from "../components/ModalWithBackdrop/ModalWithBackdrop.jsx";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import HomeLayout from "layout/HomeLayout.jsx";
import Stories from "src/components/Story/Stories.jsx";

const Homepage = () => {

    const dispatch = useDispatch()


    const feedState = useSelector(state => state.feedState)
    const {auth} = useSelector(state => state.authState)


    useEffect(() => {
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
    }, [])


    const [isOpenAddPostModal, setOpenAddPostModal] = useState(false)


    return (
        <div className="mt-1.5">

            <ModalWithBackdrop modalClass="add-feed-modal" isOpen={isOpenAddPostModal}
                               onClose={() => setOpenAddPostModal(false)}>
                <AddPost onClose={() => setOpenAddPostModal(false)}/>
            </ModalWithBackdrop>


            <HomeLayout>
                <div className="flex gap-x-4">
                    <div className='w-full'>

                        <div className="stories-container">
                            <Stories auth={auth}></Stories>
                        </div>

                        <div className="card mb-4">
                            <div>

                                <div className=" flex items-center gap-x-2 border-b border-neutral-600/10 mb-3 pb-3">
                                    <Avatar className="!w-9 !h-9" imgClass="!w-9 !h-9" src={auth?.avatar}
                                            username={auth?.fullName}></Avatar>
                                    <h2 className="py-2 bg-neutral-100 rounded-full px-3 w-full text-sm text-neutral-600"
                                        onClick={() => setOpenAddPostModal(true)}>What on your
                                        mind, {auth?.firstName}?</h2>
                                </div>


                                <div className="flex items-center justify-around text-sm font-medium">
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
                                <MemoWithFeed key={feed._id} authId={auth._id} dispatch={dispatch} feed={feed}/>
                            ))}
                        </div>


                    </div>


                </div>
            </HomeLayout>
        </div>
    );
};

const MemoWithFeed = memo(({authId, dispatch, feed}) => {
    return <FeedCard authId={authId} dispatch={dispatch} feed={feed}/>
})


export default Homepage;