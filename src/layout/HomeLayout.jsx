import React, {useEffect, useState} from 'react';
import Sidebar from "src/compoenents/Sidebar/Sidebar.jsx";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import PendingFriendRequestCard from "src/compoenents/FindFriendCard/PendingFriendRequestCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {fetchAuthFriendsAction, fetchPeoplesAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";

const HomeLayout = ({children}) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
        dispatch(fetchAuthFriendsAction())
    }, [])

    const {friends, pendingFriends, auth } = useSelector(state=>state.authState)

    const menuItems = [
        {cls: "friend-icon", label: "Friends", to: "/friends", },
        {cls: "group-icon", label: "Groups", to: "/groups", },
        {cls: "save-icon", label: "Saves", to: "/saves", },
        {cls: "watch-icon", label: "Watch", to: "/watch", },
        {cls: "feed-icon", label: "Feed", to: "/", }
    ]


    return (
        <div>
            <div className="flex justify-between ">
                <Sidebar className="white">


                    <div className="card !px-2">



                        <div className="card-meta !px-2">
                            <h4>Home</h4>
                        </div>

                        <li  className="flex items-center gap-x-1 my-1 py-2  px-2 menu-item-hover">
                            <Avatar className="!w-10 !h-10" imgClass="!w-10 !h-10 text-xs" src={auth.avatar} username={auth.fullName} />
                            <span className="font-medium text-sm text-neutral-600">{auth.fullName}</span>
                        </li>
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


                    <div className="card mt-3">

                        <div className="card-meta">
                            <h4>Account</h4>
                        </div>

                        <div className="flex items-center gap-x-2 ">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                            <label htmlFor="" className="text-sm">Setting</label>
                        </div>

                        <div className="flex items-center gap-x-2 ">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                            <label htmlFor="" className="text-sm">Setting</label>
                        </div>

                        <div className="flex items-center gap-x-2 ">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                            <label htmlFor="" className="text-sm">Setting</label>
                        </div>

                    </div>


                </Sidebar>


                <div className="w-full ">
                    <div className="content">


                        {children}


                    </div>
                </div>

                <Sidebar className="white">
                    <div className="card">

                        <div className="card-meta">
                            <h4>Active Friends</h4>
                            <Link to="/friends">See all</Link>
                        </div>

                        {friends.map((friend)=>(
                            <div key={friend.id} className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-x-2 ">
                                    <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                                    <label htmlFor="" className="text-sm">{friend.fullName}</label>
                                </div>
                                <span className="online">
                               </span>
                            </div>
                        ))}
                    </div>


                    <PendingFriendRequestCard pendingFriends={pendingFriends} />




                </Sidebar>



            </div>
        </div>
    );
};

export default HomeLayout;