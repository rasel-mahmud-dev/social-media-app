import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";
import FeedCard from "components/FeedCard/FeedCard.jsx";

const Feeds = ({feeds = []}) => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)


    return (
        <div className="flex flex-col gap-y-4">
            {feeds.map((feed) => (
                <MemoWithFeed key={feed._id} authId={auth._id} dispatch={dispatch} feed={feed}/>
            ))}
        </div>
    );
};

const MemoWithFeed = memo(({authId, dispatch, feed}) => {
    return <FeedCard authId={authId} dispatch={dispatch} feed={feed}/>
})


export default Feeds;