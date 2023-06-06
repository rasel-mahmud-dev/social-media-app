import React, {useEffect, useState} from 'react';
import Sidebar from "src/compoenents/Sidebar/Sidebar.jsx";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";
import PendingFriendRequestCard from "src/compoenents/FindFriendCard/PendingFriendRequestCard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {fetchPeoplesAction} from "src/store/actions/userAction.js";

const HomeLayout = ({children}) => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
    }, [])

    const [friends] = useState([
        {avatar: "2343", fullName: "Masdf SD"},
        {avatar: "2343", fullName: "Masdf SD"},
        {avatar: "2343", fullName: "Masdf SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
        {avatar: "2343", fullName: "M SD"},
    ])

    return (
        <div>
            <div className="flex justify-between ">
                <Sidebar className="white">


                    <div className="card">

                        <div className="card-meta">
                            <h4>Home</h4>
                        </div>

                        {friends.map((friend)=>(
                            <div key={friend.id} className="flex items-center gap-x-2 mb-3">
                                <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>
                                <label htmlFor="" className="text-sm">Setting</label>
                            </div>
                        ))}
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
                            <h4>Friends</h4>
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


                    <PendingFriendRequestCard/>




                </Sidebar>



            </div>
        </div>
    );
};

export default HomeLayout;