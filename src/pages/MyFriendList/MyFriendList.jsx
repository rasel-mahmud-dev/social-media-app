import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthFriendsAction, removeFriendAction} from "src/store/actions/userAction.js";

import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";

import HomeLayoutLink from "pages/HomeLayoutLink/HomeLayoutLink.jsx";

const MyFriendList = () => {
    const dispatch = useDispatch()

    const {friends, auth} = useSelector(state => state.authState)

    useEffect(() => {
        dispatch(fetchAuthFriendsAction())
    }, [])


    function renderItem(people, _friend) {
        return (
            <div>
                <div className="flex items-center mb-2">
                    <Avatar imgClass="text-xs" className="!w-9 !h-9" src={people?.avatar} username={people.fullName}/>
                    <div className="ml-3">
                        <h3 className="text-base font-medium text-neutral-700">{people.fullName}</h3>
                        <p className="text-gray-600 text-sm">3 hours ago</p>
                    </div>
                </div>

                <div className="flex items-center gap-x-2">
                    <button onClick={() => dispatch(removeFriendAction({
                        friendId: _friend._id,
                        user: {
                            ...people,
                            _id: _friend.receiverId === auth._id ? _friend.senderId : _friend.receiverId
                        }
                    }))} className="btn btn-primary">UnFriend
                    </button>
                    <button className="btn">Profile</button>
                </div>
            </div>
        )
    }


    return (
        <HomeLayout>

            <HomeLayoutLink/>

            <div className="card">
                <div className="card-meta">
                    <h4>My Friends ({friends.length})</h4>
                </div>

                <div className="mt-6">{
                    friends.map((friend) => (
                        <div className="mb-5" key={friend._id}>
                            {renderItem((friend.receiverId === auth._id) ? friend.sender : friend.receiver, friend)}
                        </div>
                    ))}
                </div>
            </div>


        </HomeLayout>
    );
};

export default MyFriendList;