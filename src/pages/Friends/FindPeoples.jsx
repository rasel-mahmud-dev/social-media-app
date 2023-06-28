import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {
    addFriendAction,
    confirmFriendRequestAction,
    fetchPeoplesAction,
    removeFriendAction
} from "src/store/actions/userAction.js";

import Avatar from "components/Shared/Avatar/Avatar.jsx";
import HomeLayout from "layout/HomeLayout.jsx";


import HomeLayoutLink from "pages/HomeLayoutLink/HomeLayoutLink.jsx";
import getPassTime from "src/utils/time.js";
import {Link} from "react-router-dom";
import {useFetchFriendsQuery} from "src/store/features/friendsApi.js";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import {CgLock} from "react-icons/cg";
import Button from "components/Shared/Button/Button.jsx";
import {VscTriangleDown} from "react-icons/vsc";
import {IoEllipsisHorizontal} from "react-icons/io5";
import addAlpha from "src/utils/addAlpha.js";
import {TiHome} from "react-icons/ti";
import Collapse from "components/Shared/Collapse/Collapse.jsx";
import {BiChevronDown, BiChevronUp, BiPlus} from "react-icons/bi";
import staticImage from "src/utils/staticImage.js";
import Discussion from "components/Groups/Discussion.jsx";
import AboutGroup from "components/Groups/AboutGroup.jsx";
import Rooms from "components/Groups/Rooms.jsx";
import Members from "components/Groups/Members.jsx";
import {GiGears} from "react-icons/gi";
import {useFetchPeoplesQuery} from "src/store/features/peoplesApi.js";
import AvatarGroup from "components/Shared/Avatar/AvatarGroup.jsx";

const FindPeoples = () => {
    const dispatch = useDispatch()

    const {data: friendsData} = useFetchFriendsQuery({pageNumber: 1})

    const {peoples} = useSelector(state => state.feedState)
    const {pendingFriends, auth} = useSelector(state => state.authState)

    const {data} = useFetchPeoplesQuery({pageNumber: 1})

    useEffect(() => {
        dispatch(fetchPeoplesAction())
    }, [])


    const filterPendingFriends = useMemo(() => {
        return friendsData?.friends?.filter(friend=> friend.status === "pending")
    }, [friendsData]);

    const openSidebar = "";



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



                    <Link to="/friends" className="list-item mt-3">
                        <div className="flex items-center gap-x-2">
                            <div
                                className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                <i className="png_filter_white icon_friends  absolute z-30"/>
                            </div>
                            <span>Home</span>

                        </div>
                    </Link>


                    <Link to="/friends/requests" className="list-item mt-3">
                        <div className="flex items-center gap-x-2">
                            <div
                                className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                <i className="png_filter_white icon_friends_request  absolute z-30"/>
                            </div>
                            <span>Friends Request</span>
                        </div>
                    </Link>


                    <Link to="/groups/joins?ordering=viewer_added" className="list-item mt-3">
                        <div className="flex items-center gap-x-2">
                            <div
                                className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                <i className="png_filter_white icon_friends_suggestion  absolute z-30"/>
                            </div>
                            <span>Friends Suggestion</span>

                        </div>
                    </Link>

                    <Link to="/groups/joins?ordering=viewer_added" className="list-item mt-3">
                        <div className="flex items-center gap-x-2">
                            <div
                                className="bg-blue  w-8 h-8 rounded-full relative flex items-center justify-center">
                                <i className="png_filter_white icon_friends_all absolute z-30"/>
                            </div>
                            <span>Friends Suggestion</span>

                        </div>
                    </Link>


                </Sidebar>

                <div className="group-content">
                    <div className="mt-6">

                        <h4 className="color_h1 text-lg font-semibold">Friend Requests</h4>



                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                            { filterPendingFriends?.map(pendingPeople=>(
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
                            )) }
                        </div>


                        <div className="border-t border-dark-600 pt-6 mt-12">
                            <h4 className="color_h1 text-lg font-semibold">People You May Know</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
                                { peoples?.map(people=>(
                                    <div key={people._id} className="relative card p-0 overflow-hidden m-0">
                                        <div className="img-cover">
                                            <img src={staticImage(people.avatar)} alt=""/>
                                        </div>

                                        <div className="p-3">
                                            <h2 className="color_h2 font-semibold text-base">{people.fullName}</h2>
                                            <p className="color_p text-sm">28K mutual friends</p>
                                            <Button className="btn btn-primary w-full mt-3 relative z-20">Add Friend</Button>
                                            <Button className="btn btn-dark2 w-full mt-3 relative z-20">Remove</Button>
                                        </div>
                                        <Link className="card-link" to={`/profile/${people._id}`}></Link>
                                    </div>
                                )) }
                            </div>
                        </div>


                    </div>

                </div>
            </div>






    );
};

export default FindPeoples;