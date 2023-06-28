import React, {useMemo, useEffect} from 'react';

import {useDispatch, useSelector} from "react-redux";

import {

    fetchPeoplesAction,

} from "src/store/actions/userAction.js";


import {Link, useLocation} from "react-router-dom";
import {useFetchFriendsQuery} from "src/store/features/friendsApi.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";

import Button from "components/Shared/Button/Button.jsx";

import staticImage from "src/utils/staticImage.js";

import {GiGears} from "react-icons/gi";
import {useFetchPeoplesQuery} from "src/store/features/peoplesApi.js";


const Friends = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const {data: friendsData} = useFetchFriendsQuery({pageNumber: 1})

    const {peoples} = useSelector(state => state.feedState)
    const {pendingFriends, auth} = useSelector(state => state.authState)

    const {data} = useFetchPeoplesQuery({pageNumber: 1})

    useEffect(() => {
        dispatch(fetchPeoplesAction())
    }, [])


    const filterPendingFriends = useMemo(() => {
        return friendsData?.friends?.filter(friend => friend.status === "pending")
    }, [friendsData]);

    const openSidebar = "";


    const items = [
        {path: "/friends", label: "Home", icon: "icon_friends"},
        {path: "/friends/requests", label: "Friends Request", icon: "icon_friends_request"},
        {path: "/friends/suggestion", label: "Friends Suggestion", icon: "icon_friends_suggestion"},
        {path: "/friends/list", label: "All Friends", icon: "icon_friends_all"}
    ]

    function isActive(path) {
        return location.pathname.startsWith(path)
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
                    <Link to={navItem.path} className={`list-item mt-3 ${isActive(navItem.path) ? "active" : ""}`}
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

            <div className="group-content">
                <div className="mt-6">

                    <h4 className="color_h1 text-lg font-semibold">Friend Requests</h4>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                        {filterPendingFriends?.map(pendingPeople => (
                            <div key={pendingPeople._id} className="relative card p-0 overflow-hidden m-0">
                                <div className="img-cover">
                                    <img src={staticImage(pendingPeople.sender.avatar)} alt=""/>
                                </div>

                                <div className="p-3">
                                    <h2 className="color_h2 font-semibold text-base">{pendingPeople.sender.fullName}</h2>
                                    <p className="color_p text-sm">28K mutual friends</p>
                                    <Button className="btn btn-primary w-full mt-3 relative z-20">Confirm</Button>
                                    <Button className="btn btn-dark2 w-full mt-3 relative z-20">Delete</Button>
                                </div>
                                <Link className="card-link" to={`/profile/${pendingPeople.senderId}`}></Link>
                            </div>
                        ))}
                    </div>


                    <div className="border-t border-dark-600 pt-6 mt-12">
                        <h4 className="color_h1 text-lg font-semibold">People You May Know</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                            {peoples?.map(people => (
                                <div key={people._id} className="relative card p-0 overflow-hidden m-0">
                                    <div className="img-cover">
                                        <img src={staticImage(people.avatar)} alt=""/>
                                    </div>

                                    <div className="p-3">
                                        <h2 className="color_h2 font-semibold text-base">{people.fullName}</h2>
                                        <p className="color_p text-sm">28K mutual friends</p>
                                        <Button className="btn btn-primary w-full mt-3 relative z-20">Add
                                            Friend</Button>
                                        <Button className="btn btn-dark2 w-full mt-3 relative z-20">Remove</Button>
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