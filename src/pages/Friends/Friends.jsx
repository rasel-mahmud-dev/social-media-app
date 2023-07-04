import React, {useMemo, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import "./style.scss"

import {
    addFriendAction, confirmFriendRequestAction, removeFriendAction,
} from "src/store/actions/userAction.js";


import {Link, useLocation} from "react-router-dom";
import {
    friendsApi, useAddFriendCacheMutation,
    useChangeFriendStatusMutation,
    useFetchFriendsQuery,
    useRemoveFriendCacheMutation
} from "src/store/features/friendsApi.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";

import Button from "components/Shared/Button/Button.jsx";

import staticImage from "src/utils/staticImage.js";

import {GiGears} from "react-icons/gi";
import {
    useFetchPeoplesQuery,
    useRemovePeopleMutation,
    useUpdatePeopleFriendStatusMutation
} from "src/store/features/peoplesApi.js";


const Friends = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {data: friendsData} = useFetchFriendsQuery({pageNumber: 1})
    const {data} = useFetchPeoplesQuery({pageNumber: 1})


    const {openSidebar} = useSelector(state => state.appState)

    const [updateFriend] = useChangeFriendStatusMutation()

    const [deleteFriendCache] = useRemoveFriendCacheMutation()
    const [addFriendCache] = useAddFriendCacheMutation()

    const {auth} = useSelector(state => state.authState)

    const [deletePeople] = useRemovePeopleMutation()

    const [updatePeopleFriendStatus] = useUpdatePeopleFriendStatusMutation()




    const queries = useSelector((state) => state.peoplesApi.queries);
    const friendQueries = useSelector((state) => state.friendsApi.queries);


    const combinedPeoples = useMemo(() => {
        let results = [];
        for (const key in queries) {
            if (key.startsWith("fetchPeoples")) {
                let item = queries[key]
                if (item.status === "fulfilled") {
                    if (item.data.peoples) {
                        results.push(...item.data.peoples)
                    }
                }
            }
        }
        return results;
    }, [queries]);

    function removePeople(peopleId) {
        deletePeople({
            peopleId: peopleId,
            queries
        })
    }

    const filterPendingFriends = useMemo(() => {
        return friendsData?.friends?.filter(friend => friend.status === "pending" && friend.receiverId === auth._id)
    }, [friendsData]);


    const items = [
        {path: "/friends", label: "Home", icon: "icon_friends"},
        {path: "/friends/requests", label: "Friends Request", icon: "icon_friends_request"},
        {path: "/friends/suggestions", label: "Friends Suggestion", icon: "icon_friends_suggestion"},
        {path: "/friends/list", label: "All Friends", icon: "icon_friends_all"}
    ]

    const sendMyFriendRequest = useMemo(() => {
        return friendsData?.friends?.filter(friend => friend.status === "pending" && friend.senderId === auth._id)
    }, [friendsData]);


    function isActive(path) {
        return location.pathname.startsWith(path)
    }


    function addSendFriendRequest(_id) {
        dispatch(addFriendAction(_id)).unwrap().then(() => {
            removePeople(_id)
        })
    }

    function acceptFriendRequest(friendId) {
        dispatch(confirmFriendRequestAction({friendId: friendId})).unwrap().then((data) => {
            deleteFriendCache({
                friendId: friendId,
                queries: friendQueries
            })
            addFriendCache({
                friend: data.friend,
                queries: friendQueries
            })
        })
    }

    function cancelFriendRequest(_id) {
        dispatch(removeFriendAction(_id)).unwrap().then(() => {
            updatePeopleFriendStatus({
                _id, queries, friend: {senderId: null, receiverId: null}
            })
        })
    }


    function isYouSend(friend) {
        const result = friend?.senderId === auth._id
        return result
    }

    return (
        <div className="flex justify-between">
            <Sidebar
                className="white left-sidebar group-sidebar"
                isOpen={openSidebar === "left-sidebar"}
                onClose={() => dispatch(openSidebarAction(""))}>


                <div className="flex items-center justify-between">
                    <h2 className="font-medium color_h2">Friends</h2>
                    <div className="rounded_circle color_p">
                        <GiGears/>
                    </div>
                </div>

                {items.map(navItem => (
                    <Link to={navItem.path} className={`list-item mt-1 ${isActive(navItem.path) ? "active" : ""}`}
                          key={navItem.label}>
                        <div className="flex items-center gap-x-2">
                            <div
                                className={`${isActive(navItem.path) ? "bg-blue" : "bg-dark-600"}  w-10 h-10 rounded-full relative flex items-center justify-center`}>
                                <i className={`png_filter_white ${navItem.icon}  absolute z-30`}/>
                            </div>
                            <span>{navItem.label}</span>
                        </div>
                    </Link>
                ))}


            </Sidebar>

            <div className="group-content w-full">
                <div className="mt-6">

                    <h4 className="color_h1 text-lg font-semibold">Friend Requests</h4>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                        {filterPendingFriends?.map(pendingPeople => (
                            <div key={pendingPeople._id} className="relative card p-0 overflow-hidden m-0 friend-card">
                                <div className="img-cover">
                                    <img src={staticImage(pendingPeople.sender.avatar)} alt=""/>
                                </div>

                                <div className="p-3">
                                    <h2 className="color_h2 font-semibold text-base">{pendingPeople.sender.fullName}</h2>
                                    <p className="color_p text-sm">28K mutual friends</p>
                                    <Button onClick={() => acceptFriendRequest(pendingPeople._id)}
                                            className="btn btn-primary w-full mt-3 relative z-20">Confirm</Button>
                                    <Button className="btn btn-dark2 w-full mt-3 relative z-20">Delete</Button>
                                </div>
                                <Link className="card-link" to={`/profile/${pendingPeople.senderId}`}></Link>
                            </div>
                        ))}
                    </div>


                    <div className="border-t border-dark-600 pt-6 mt-12">
                        <h4 className="color_h1 text-lg font-semibold">People You May Know</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                            {combinedPeoples?.map(people => (
                                <div key={people._id} className="relative card p-0 overflow-hidden m-0 friend-card">
                                    <div className="img-cover">
                                        <img src={staticImage(people.avatar)} alt=""/>
                                    </div>

                                    <div className="p-3">
                                        <h3>{Date.now().toString()}</h3>
                                        <h2 className="color_h2 font-semibold text-base">{people.fullName}</h2>
                                        <p className="color_p text-sm">28K mutual friends</p>

                                        {isYouSend(people?.friend) ? (
                                            <>
                                                <Button onClick={() => cancelFriendRequest(people._id)}
                                                        className="btn btn-primary w-full mt-3 relative z-20">
                                                    Cancel Request
                                                </Button>
                                                <Button className="btn btn-dark2 w-full mt-3 relative z-20"
                                                        onClick={() => removePeople(people._id)}>Remove</Button>
                                            </>
                                        ) : (
                                            <>

                                                <Button onClick={() => addSendFriendRequest(people._id)}
                                                        className="btn btn-primary w-full mt-3 relative z-20">
                                                    Add Friend
                                                </Button>
                                                <Button className="btn btn-dark2 w-full mt-3 relative z-20"
                                                        onClick={() => removePeople(people._id)}>Remove</Button>


                                            </>
                                        )}


                                    </div>
                                    <Link className="card-link" to={`/profile/${people._id}`}></Link>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>

            </div>
        </div>

    );
};

export default Friends;