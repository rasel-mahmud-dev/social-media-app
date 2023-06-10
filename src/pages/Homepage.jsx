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
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import Feeds from "components/Feeds/Feeds.jsx";

const Homepage = () => {

    const dispatch = useDispatch()


    const feedState = useSelector(state => state.feedState)
    const {auth} = useSelector(state => state.authState)


    useEffect(() => {
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
    }, [])




    return (
        <div className="mt-1.5">

            <HomeLayout>
                <div className="flex gap-x-4">
                    <div className='w-full'>

                        <div className="stories-container">
                            <Stories auth={auth}></Stories>
                        </div>

                        <AddPostDemo className="mt-4" />



                        {/**** all feed */}
                        <Feeds feeds={feedState.feeds} />


                    </div>


                </div>
            </HomeLayout>
        </div>
    );
};



export default Homepage;