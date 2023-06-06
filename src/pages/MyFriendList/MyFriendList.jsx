import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFriendAction, fetchAuthFiendsAction, removeFriendAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";

const MyFriendList = () => {
const dispatch = useDispatch()

    const { friends } = useSelector(state=>state.authState)

    useEffect(()=>{
        dispatch(fetchAuthFiendsAction())
    }, [])

    console.log(friends)

    function handleRemoveFriend(_id) {
        dispatch(removeFriendAction(_id))
    }

    return (
        <HomeLayout>
            <div className="card">

                <div className="card-meta">
                    <h4>My Friends</h4>
                </div>

                <div className="mt-6">{
                    friends.map((people, i) => (
                    <div className="mb-5" key={i}>

                        <div className="flex items-center mb-2">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" src={people?.avatar} username={people.fullName}/>
                            <div className="ml-3">
                                <h3 className="text-base font-medium text-neutral-700">{people.fullName}</h3>
                                <p className="text-gray-600 text-sm">3 hours ago</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-x-2">
                            <button onClick={()=>handleRemoveFriend(people._id)} className="btn btn-primary">UnFriend</button>
                            <button className="btn">Profile</button>
                        </div>
                    </div>
                ))}

                </div>
            </div>
        </HomeLayout>
    );
};

export default MyFriendList;