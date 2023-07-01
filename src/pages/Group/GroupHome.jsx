import React, {useContext, useEffect} from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    createGroupAction,
    fetchGroupFeedAction,
    fetchMyGroupFeedsAction,
    fetchMyGroupsAction
} from "src/store/actions/groupAction.js";


import useCustomReducer from "src/hooks/useReducer.jsx";
import WithGroupHomeSidebar from "pages/Group/WithGroupHomeSidebar.jsx";
import FeedCard from "components/FeedCard/FeedCard.jsx";


const GroupHome = () => {

    const [state, setState] = useCustomReducer({
        feeds: []
    })


    const dispatch = useDispatch()
    const location = useLocation()

    const navigate = useNavigate()


    useEffect(() => {
        dispatch(fetchMyGroupsAction())
    }, [])

    useEffect(() => {
        dispatch(fetchMyGroupFeedsAction({query: "?"})).unwrap().then((data)=>{
            setState({
                feeds: data
            })
        })
    }, [])

    return (
        <WithGroupHomeSidebar>
            <div className="group-content w-full">
                <div className="feed-container">
                    {state.feeds.map(feed=>(
                        <div className="mt-4">
                            <FeedCard key={feed._id} feed={feed}  />
                        </div>
                    ))}
                </div>
            </div>

        </WithGroupHomeSidebar>
    )
};

export default GroupHome;