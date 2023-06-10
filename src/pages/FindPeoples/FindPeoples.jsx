import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    addFriendAction,
    confirmFriendRequestAction,
    fetchPeoplesAction,
    removeFriendAction
} from "src/store/actions/userAction.js";
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";


import HomeLayoutLink from "pages/HomeLayoutLink/HomeLayoutLink.jsx";

const FindPeoples = () => {
    const dispatch = useDispatch()

    const {peoples} = useSelector(state => state.feedState)
    const {pendingFriends, auth} = useSelector(state => state.authState)

    useEffect(() => {
        dispatch(fetchPeoplesAction())
    }, [])


    function isInFriend(peopleId) {
        return pendingFriends.findIndex(fri => fri.senderId === peopleId || fri.receiverId === peopleId) !== -1
    }

    function isYouSend(peopleId) {
        let item = pendingFriends.find(fri => fri.senderId === auth._id && fri.receiverId === peopleId)
        return item
    }


    // get friend id from request sender user
    function getFriendId(peopleId) {
        let item = pendingFriends.find(fri => fri.senderId === auth._id && fri.receiverId === peopleId)
        console.log(peopleId)
        return item._id
    }

    return (
        <HomeLayout>
            <HomeLayoutLink/>
            <div className="card">

                <div className="card-meta">
                    <h4>Find Peoples ({peoples.length})</h4>
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
                                {
                                    isInFriend(people._id) ? (
                                        isYouSend(people._id) ?
                                            (<button onClick={() => dispatch(removeFriendAction({
                                                    friendId: getFriendId(people._id),
                                                    user: people
                                                }))}
                                                     className="btn btn-primary">Cancel Request</button>

                                            )
                                            : (

                                                <button onClick={() => dispatch(confirmFriendRequestAction({
                                                    friendId: getFriendId(people._id),
                                                    userId: people._id
                                                }))}
                                                        className="btn btn-primary">Accept Request</button>
                                            )
                                    ) : (
                                        <button onClick={() => dispatch(addFriendAction(people._id))}
                                                className="btn btn-primary">Add Request</button>
                                    )
                                }
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