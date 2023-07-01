import React, {useCallback, useEffect} from 'react';
import Intro from "components/Profile/Intro.jsx";
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import Feeds from "components/Feeds/Feeds.jsx";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthFriendsAction} from "src/store/actions/userAction.js";
import useCustomReducer from "src/hooks/useReducer.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";
import staticImage from "src/utils/staticImage.js";
import {FaEllipsisH, FaEllipsisV} from "react-icons/fa";

const FriendsSection = ({userId, authId}) => {

    const dispatch = useDispatch()
    const {userFeeds} = useSelector(state => state.feedState)

    const [state, setState] = useCustomReducer({
        friends: []
    })

    useEffect(() => {
        if (userId) {

            dispatch(fetchAuthFriendsAction(userId)).unwrap().then((data) => {
                setState({
                    friends: data.friends
                })

            })
        }
    }, [userId])



    function getFriend(friend) {
        if (friend.receiverId === userId) {
            return friend?.sender
        } else {
            return friend?.receiver
        }
    }

    return (
        <div className="mt-6 ">
        <div className="profile-content !mt-0 ">
            <h4 className="text-lg color_h1 font-medium">Friends</h4>
            <div className="grid grid-cols-2 gap-x-4">
                {state?.friends?.map(friend => (
                    <div key={friend._id}  className="flex gap-x-2 justify-between items-center border-1px border  !border-dark-600/40 p-4 my-4 rounded-lg">
                        <div className="flex gap-x-2 items-center">
                            <div>
                                <Avatar username={getFriend(friend).fullName} src={staticImage(getFriend(friend).avatar)} imgClass="!w-20 !h-20" className="!w-20 !h-20"/>
                            </div>
                            <h4 className="color_h1 ">{getFriend(friend).fullName}</h4>
                        </div>

                        <div className="icon_ellips color_p">
                            <FaEllipsisH />
                        </div>

                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default FriendsSection;