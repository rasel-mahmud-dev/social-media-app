import React, {memo, useEffect, useMemo, useState} from "react";

import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import HomeLayout from "layout/HomeLayout.jsx";
import Stories from "src/components/Story/Stories.jsx";
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import Feeds from "components/Feeds/Feeds.jsx";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll.jsx";
import {feedsApi, useFeedsQuery} from "src/store/features/feedsApi.js";

const Homepage = () => {

    const dispatch = useDispatch()


    const {auth} = useSelector(state => state.authState)

    const [feedPageNumber, setFeePageNumber] = useState(1)


    let {feeds} = useFeedsQuery({
        pageNumber: feedPageNumber,
        query: "?pageNumber=" + feedPageNumber
    }, {
        // transform data model
        selectFromResult: ({data, isLoading, isFetching, isError}) => ({
            feeds: data?.feeds,
            isLoadingGoods: isLoading,
            isFetchingGoods: isFetching,
        }),
    })

    const queries = useSelector((state) => state.feedApi.queries);

    const combinedResults = useMemo(() => {
        let results = [];
        for (const key in queries) {
            let item = queries[key]
            if(item.status === "fulfilled"){
                if(item.data.feeds){
                   results.push(...item.data.feeds)
                }
            }
        }
        return results;
    }, [queries, feedPageNumber]);


    useEffect(() => {
        dispatch(fetchPeoplesAction())
    }, [dispatch])




    function handleLoadMoreFeed({pageNumber}) {
        if(feeds.length > 0){
            setFeePageNumber(pageNumber)
        }
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
                            <Feeds feeds={combinedResults}/>
                        </InfiniteScroll>

                    </div>

                </div>
            </HomeLayout>
        </div>
    );
};


export default Homepage;