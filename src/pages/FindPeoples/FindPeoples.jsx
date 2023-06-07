import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {addFriendAction, fetchPeoplesAction} from "src/store/actions/userAction.js";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";
import {Link} from "react-router-dom";

const FindPeoples = () => {
    const dispatch = useDispatch()

    const {peoples} = useSelector(state => state.feedState)
    const {pendingFriends} = useSelector(state => state.authState)

    useEffect(() => {
        dispatch(fetchPeoplesAction())
    }, [])

    console.log(peoples)

    function handleAddFriend(_id) {
        console.log(_id)
        dispatch(addFriendAction(_id))
    }

    function checkPendingFriends(peopleId) {
        return pendingFriends.findIndex(fri => fri.senderId === peopleId) !== -1
    }


    return (
        <HomeLayout>
            <div className="card">

                <div className="card-meta">
                    <div className="flex items-center gap-x-2">
                        <h4>Find Peoples</h4>
                        <Link to="/friends"><h4>My Friends</h4></Link>
                    </div>
                </div>

                <div className="mt-6">{
                    peoples.map((people, i) => (
                        <div className="mb-5" key={i}>

                            <div className="flex items-center mb-2">
                                <Avatar imgClass="text-xs" className="!w-9 !h-9" src={people?.avatar}
                                        username={people.fullName}/>
                                <div className="ml-3">
                                    <h3 className="text-base font-medium text-neutral-700">{people.fullName}</h3>
                                    <p className="text-gray-600 text-sm">3 hours ago</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-x-2">
                                <button onClick={() => handleAddFriend(people._id)}
                                        className="btn btn-primary"> {checkPendingFriends(people._id) ? "Accept" : "Add Friend"}</button>
                                <button className="btn">Profile</button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </HomeLayout>
    );
};

export default FindPeoples;