import React, {memo, useEffect, useState} from "react";

import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import HomeLayout from "layout/HomeLayout.jsx";
import Stories from "src/components/Story/Stories.jsx";
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import Feeds from "components/Feeds/Feeds.jsx";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll.jsx";

const Homepage = () => {

    const dispatch = useDispatch()


    const {feeds, feedPageNumber} = useSelector(state => state.feedState)
    const {auth} = useSelector(state => state.authState)


    useEffect(() => {
        dispatch(fetchFeedsAction({
            pageNumber: 1,
            query: "?pageNumber=" + 1
        }))
        dispatch(fetchPeoplesAction())
    }, [])

    function handleLoadMoreFeed({pageNumber}) {
        dispatch(fetchFeedsAction({
            pageNumber,
            query: "?pageNumber=" + pageNumber
        }))
    }


    return (
        <div className="">

            <HomeLayout>
                <div className="flex gap-x-4">
                    <div className='w-full'>

                        <div className="stories-container">
                            <Stories auth={auth}></Stories>
                        </div>

                        <AddPostDemo className="mb-4"/>


                        {/**** all feed */}
                        <InfiniteScroll pageNumber={feedPageNumber} onLoadMore={handleLoadMoreFeed}>
                            <Feeds feeds={feeds}/>
                        </InfiniteScroll>

                    </div>

                </div>
            </HomeLayout>
        </div>
    );
};


export default Homepage;