import React, {useEffect, useMemo, useState} from 'react';
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import FeedCard from "components/FeedCard/FeedCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import useCustomReducer from "src/hooks/useReducer.jsx";
import AboutGroup from "components/Groups/AboutGroup.jsx";
import {useGroupFeedsQuery} from "src/store/features/feedsApi.js";
import MenuDropdown from "components/Dropdown/MenuDropdown.jsx";
import Radio from "components/Shared/Input/Radio.jsx";
import {useInfiniteQuery, useQuery, useQueryClient} from "@tanstack/react-query";
import apis from "src/apis/index.js";
import InfiniteScroll from "components/InfiniteScroll/InfiniteScroll.jsx";
import Feeds from "components/Feeds/Feeds.jsx";

const Discussion = ({group}) => {

    const [feedPageNumber, setFeedPageNumber] = useState(1)


    const {auth} = useSelector(state => state.authState)

    const dispatch = useDispatch()


    const {groupFeeds} = useGroupFeedsQuery({
        pageNumber: feedPageNumber,
        groupId: group?._id
    }, {
        // transform data model
        selectFromResult: ({data, isLoading, isFetching, isError}) => ({
            groupFeeds: data?.groupFeeds,
            isLoadingGoods: isLoading,
            isFetchingGoods: isFetching,
        }),
    })

    const queries = useSelector((state) => state.feedApi.queries);
    const combinedResults = useMemo(() => {
        let results = [];
        for (const key in queries) {
            let item = queries[key]
            if (item.status === "fulfilled") {
                if (item.data.groupFeeds) {
                    results.push(...item.data.groupFeeds)
                }
            }
        }
        return results;
    }, [queries, feedPageNumber]);

    function handleLoadMoreFeed({pageNumber}) {
        if (groupFeeds && groupFeeds.length > 0) {
            setFeedPageNumber(pageNumber)
        }
    }

    return (
        <div>
            <div className="grid grid-cols-11">

                <div className="col-span-6">

                    <AddPostDemo/>

                    <MenuDropdown contentClass="!bg-dark-700 top-8 !p-2 !shadow-sm" className=" w-max" render={() => (
                        <div className="">
                            <li className="list-item text-xs color_h2"><Radio/> Most relevant</li>
                            <li className="list-item text-xs color_h2"><Radio/> New</li>
                            <li className="list-item text-xs color_h2"><Radio/> Old</li>
                        </div>
                    )}>
                        <div className="cursor-pointer text-accent w-max px-4 py-2  mt-2 flex items-center gap-x-2">
                            <h4 className="text-sm">Most Relevant</h4>

                            <span>
                         <svg fill="currentColor" viewBox="0 0 20 20" width="1em" height="1em"
                              className="x1lliihq x1k90msu x2h7rmj x1qfuztq xcza8v6 xlup9mm x1kky2od"
                              title="sort group feed by"><title>sort group feed by</title>
                            <path
                                d="M10 14a1 1 0 0 1-.755-.349L5.329 9.182a1.367 1.367 0 0 1-.205-1.46A1.184 1.184 0 0 1 6.2 7h7.6a1.18 1.18 0 0 1 1.074.721 1.357 1.357 0 0 1-.2 1.457l-3.918 4.473A1 1 0 0 1 10 14z"></path>
                            </svg>
                        </span>
                        </div>
                    </MenuDropdown>

                    <div className="">

                        {/**** all feed */}
                        <InfiniteScroll pageNumber={feedPageNumber} onLoadMore={handleLoadMoreFeed}>
                            {combinedResults?.map((feed) => (
                                <div key={feed._id} className="pt-4">
                                    <FeedCard dispatch={dispatch} authId={auth._id} feed={feed}/>
                                </div>
                            ))}
                        </InfiniteScroll>
                    </div>
                </div>


                <div className="col-span-5 sticky top-20">
                    <div className="card h-max mt-4">
                        <h3 className="color_h2">Continue setting up your group</h3>
                        <span className="text-accent text-sm font-semibold">3 of 4</span> <span
                        className="color_p text-sm">steps completed</span>
                        <p className="color_p text-sm">Customize your group and attract new members in a few steps</p>

                        <div className="border-b border-neutral-600/10 dark:border-dark-500 mb-3 pb-3"></div>

                        <div>

                            <div className="relative list-item items-center gap-x-2">
                                <div className="rounded_circle">
                                    <i className="icon_user png_filter_white"></i></div>
                                <span>Invite Member</span>
                                <div className="absolute right-4 transform top-1/2 -translate-y-1/2">
                                    <i className="icon_check_24 png_filter_white"></i>
                                </div>
                            </div>

                            <div className="relative list-item items-center gap-x-2">
                                <div className="rounded_circle">
                                    <i className="icon_image png_filter_white"></i>
                                </div>
                                <span>Add a Cover Photo</span>
                                <div className="absolute right-4 transform top-1/2 -translate-y-1/2">
                                    <i className="icon_check_24 png_filter_white"></i>
                                </div>
                            </div>

                            <div className="relative list-item items-center gap-x-2">
                                <div className="rounded_circle">
                                    <i className="icon_pen png_filter_white"></i></div>
                                <span>Add a description</span>
                                <div className="absolute right-4 transform top-1/2 -translate-y-1/2">
                                    <i className="icon_check_24 png_filter_white"></i>
                                </div>
                            </div>

                            <div className="relative list-item items-center gap-x-2">
                                <div className="rounded_circle">
                                    <i className="icon_edit png_filter_white"></i>
                                </div>
                                <span>Create a post</span>
                                <div className="absolute right-4 transform top-1/2 -translate-y-1/2">
                                    <i className="icon_check_24 png_filter_white"></i>
                                </div>
                            </div>
                        </div>
                    </div>


                    <AboutGroup group={group}/>


                    {/*<div className="card mt-4">*/}
                    {/*    <h4 className="card-border-b-title">Members {group.members.length}</h4>*/}
                    {/*    <div className="color_p text-sm mt-4">*/}

                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="card mt-5">*/}
                    {/*    <h4 className="card-border-b-title">Activity</h4>*/}
                    {/*    <div className="color_p text-sm mt-4">*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>

            </div>
        </div>
    )
        ;
};

export default Discussion;