import React, {useEffect, useState} from 'react';
import Sidebar from "src/components/Sidebar/Sidebar.jsx";
import Avatar from "src/components/Avatar/Avatar.jsx";
import PendingFriendRequestCard from "src/components/PendingFriendRequestCard/PendingFriendRequestCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import { fetchAuthFriendsAction, fetchPeoplesAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import ActiveFriend from "src/components/ActiveFriend/ActiveFriend.jsx";
import ChatWithFriend from "src/components/ChatWithFriend/ChatWithFriend.jsx";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import {FaSignOutAlt} from "react-icons/fa";
import {logoutAction} from "src/store/slices/authSlice.js";

const HomeLayout = ({children}) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
        dispatch(fetchAuthFriendsAction())
    }, [])

    const {friends, pendingFriends, auth } = useSelector(state=>state.authState)
    const {openSidebar } = useSelector(state=>state.appState)
    const {openChatUser } = useSelector(state=>state.chatState)

    const menuItems = [
        {cls: "friend-icon", label: "Friends", to: "/friends", },
        {cls: "group-icon", label: "Groups", to: "/groups", },
        {cls: "save-icon", label: "Saves", to: "/saved", },
        {cls: "watch-icon", label: "Watch", to: "/watch", },
        {cls: "feed-icon", label: "Feed", to: "/", }
    ]

    function handleStartChat(friend){
        dispatch(openChatUserAction(friend))
    }

    function handleLogout() {
        dispatch(logoutAction())
    }

    return (
        <div>
            <div className="flex justify-between ">
                <Sidebar className="white left-sidebar" isOpen={openSidebar === "left-sidebar"} onClose={()=>dispatch(openSidebarAction(""))}>

                    <div className="card !px-2">
                        <div className="card-meta !px-2">
                            <h4>Home</h4>
                        </div>

                        <Link to={`/profile/${auth._id}`}>
                            <li  className="flex items-center gap-x-1 my-1 py-2  px-2 menu-item-hover">
                                <Avatar className="!w-10 !h-10" imgClass="!w-10 !h-10 text-xs" src={auth.avatar} username={auth.fullName} />
                                <div>
                                    <span className="font-medium text-sm text-neutral-600">{auth.fullName}</span>
                                    <h5 className="text-[10px] text-neutral-600">{auth._id}</h5>
                                </div>
                            </li>
                        </Link>
                        {menuItems.map((item, index)=>(
                            item.to ? (
                                <Link key={index} to={item.to}>
                                    <li key={index} className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                                        <i className={`icon ${item.cls}`}></i>
                                        <span className="font-medium text-sm text-neutral-600">{item.label}</span>
                                    </li>
                                </Link>
                            ) : (
                                <li key={index} onClick={()=>item.onClick && item.onClick(item)} className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                                    <i className={`icon ${item.cls}`}></i>
                                    <span className="font-medium text-sm text-neutral-600">{item.label}</span>
                                </li>
                            )
                        ))}


                        {/*{friends.map((friend)=>(*/}
                        {/*    <div key={friend.id} className="flex items-center gap-x-2 mb-3">*/}
                        {/*        <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>*/}
                        {/*        <label htmlFor="" className="text-sm">Setting</label>*/}
                        {/*    </div>*/}
                        {/*))}*/}
                    </div>


                    <div className="card !px-2 mt-3">
                        <div className="card-meta !px-2">
                            <h4>Account</h4>
                        </div>


                        <li  className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                            <label htmlFor="" className="text-sm">Setting</label>
                        </li>

                        <li onClick={handleLogout} className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                            <div className="!w-9 !h-9 bg-neutral-200 rounded-full flex justify-center items-center"><FaSignOutAlt /></div>
                            <label htmlFor="" className="text-sm">Logout</label>
                        </li>

                        <Link to={`/profile/${auth._id}`}>
                            <li  className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                                <Avatar imgClass="text-xs" className="!w-9 !h-9" src={auth?.avatar} username="ER SDF"/>
                                <label htmlFor="" className="text-sm">Profile</label>
                            </li>
                        </Link>


                    </div>


                </Sidebar>


                <div className="w-full ">
                    <div className="content">


                        {children}


                    </div>
                </div>

                <Sidebar className="white right-sidebar" isOpen={openSidebar === "right-sidebar"} onClose={()=>dispatch(openSidebarAction(""))}>

                    <ActiveFriend handleStartChat={handleStartChat} auth={auth} friends={friends}/>

                    <PendingFriendRequestCard  className="mt-4" auth={auth} pendingFriends={pendingFriends} />


                    {openChatUser && <ChatWithFriend openChatUser={openChatUser} /> }


                </Sidebar>

            </div>
        </div>
    );
};

export default HomeLayout;