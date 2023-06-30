import React, {useEffect, useMemo, useState} from 'react';
import HomeLayout from "layout/HomeLayout.jsx";
import Feeds from "components/Feeds/Feeds.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useVideoFeedsQuery} from "src/store/features/feedsApi.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll.jsx";

const WatchVideos = () => {

    // const [state, setState] = useCustomReducer({
    //     feeds: []
    // })
    //
    // useEffect(() => {
    //     apis.get("/feed/video").then(({data, status}) => {
    //         if (status === 200) {
    //             setState({
    //                 feeds: data.feeds
    //             })
    //         }
    //     })
    // }, []);


    const dispatch = useDispatch()


    const {auth} = useSelector(state => state.authState)

    const [feedPageNumber, setFeedPageNumber] = useState(1)


    let {feeds} = useVideoFeedsQuery({
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
            if (key.startsWith("videoFeeds")) {
                let item = queries[key]
                if (item.status === "fulfilled") {
                    if (item.data.feeds) {
                        results.push(...item.data.feeds)
                    }
                }
            }
        }
        return results;
    }, [queries, feedPageNumber]);


    useEffect(() => {
        dispatch(fetchPeoplesAction())
    }, [dispatch])

    function handleLoadMoreFeed({pageNumber}) {
        if (feeds.length > 0) {
            setFeedPageNumber(pageNumber)
        }
    }


    return (
        <HomeLayout>
            <div className="">

                <div className="color_h1 mb-4 px-2">
                    <h4>Watch Videos</h4>
                </div>

                {/**** all feed */}
                <InfiniteScroll pageNumber={feedPageNumber} onLoadMore={handleLoadMoreFeed}>
                    <Feeds feeds={combinedResults || []}/>
                </InfiniteScroll>

            </div>
        </HomeLayout>
    );
};

export default WatchVideos;