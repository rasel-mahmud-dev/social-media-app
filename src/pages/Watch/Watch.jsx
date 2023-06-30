import React, {useEffect, useMemo, useState} from 'react';
import RenderProfile from "pages/Profile/RenderProfile.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import useCustomReducer from "src/hooks/useReducer.jsx";
import apis from "src/apis/index.js";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import WithPageSidebar from "components/Watch/WithPageSidebar.jsx";
import DiscoverPages from "pages/Page/DiscoverPages.jsx";
import MyLikesAndFollwerPage from "pages/Page/MyLikesAndFollwerPage.jsx";
import {useVideoFeedsQuery} from "src/store/features/feedsApi.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll.jsx";
import Feeds from "components/Feeds/Feeds.jsx";


const Watch = () => {

    const dispatch = useDispatch()

    const {pageSlug} = useParams()


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


    const [myPages, setMyPages] = useState([])

    useEffect(() => {
        apis.get("/page/my-pages").then(({status, data}) => {
            if (status === 200) {
                setMyPages(data.pages)
            }
        })
    }, [])


    const [getSearchParams] = useSearchParams()


    const [state, setState] = useCustomReducer({
        profile: {},
    })

    const [path, setPath] = useState("")

    function fetchFollowerInfo(userId) {
        apis.get("/follow/status/?userId=" + userId).then(({status, data}) => {
            if (status === 200) {
                setState({
                    currentUserFollowing: data.following
                })
            }
        }).catch(() => {
        })
    }

    function fetchProfile(userId) {
        apis.get("/users/profile/" + userId).then(({status, data}) => {

            if (status === 200) {
                setState({profile: data})

                // if view current logged user profile
                if (auth._id === data.user._id) return;

                // check the following status with current logged user.
                fetchFollowerInfo(data.user._id)
            }
        }).catch(() => {
        })
    }


    const navigate = useNavigate()

    useEffect(() => {
        fetchProfile(pageSlug)
    }, [pageSlug]);

    const type = getSearchParams.get("type") || ""

    useEffect(() => {
        setPath(type)
    }, [type]);



    return (
        <WithPageSidebar myPages={myPages}>
            <div className="group-content w-full mt-4">
                <div className="feed-container">
                    <div className="color_h1 mb-4 px-2">
                        <h4>Watch Videos</h4>
                    </div>

                    {/**** all feed */}
                    <InfiniteScroll pageNumber={feedPageNumber} onLoadMore={handleLoadMoreFeed}>
                        <Feeds feeds={combinedResults || []}/>
                    </InfiniteScroll>

                </div>

            </div>

        </WithPageSidebar>
    );
};

export default Watch;