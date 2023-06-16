import React, {useEffect} from 'react';
import Sidebar from "src/components/Sidebar/Sidebar.jsx";
import Avatar from "src/components/Shared/Avatar/Avatar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {fetchAuthFriendsAction, fetchPeoplesAction} from "src/store/actions/userAction.js";
import {Link} from "react-router-dom";
import {openSidebarAction} from "src/store/slices/appSlice.js";
import ActiveFriend from "src/components/ActiveFriend/ActiveFriend.jsx";
import ChatWithFriend from "src/components/ChatWithFriend/ChatWithFriend.jsx";
import {logoutAction} from "src/store/slices/authSlice.js";

import friendIcon from "src/assets/icon/friends.png"
import groupIcon from "src/assets/icon/group.png"
import pageIcon from "src/assets/icon/pages.png"
import starIcon from "src/assets/icon/star.png"
import videoIcon from "src/assets/icon/video.png"
import marketIcon from "src/assets/icon/market.png"
import bookmarkIcon from "src/assets/icon/bookmark.png"
import clockIcon from "src/assets/icon/time.png"
import messengerIcon from "src/assets/icon/messenger.png"
import {createGroupAction, getChatGroupMessagesAction} from "src/store/actions/chatAction.js";
import findUserGroup from "src/store/utils/findUserGroup.js";
import {openChatUserAction, toggleOpenHomeChatsSidebar} from "src/store/slices/chatSlice.js";
import Chats from "components/Chats/Chats.jsx";
import {FaEllipsisV} from "react-icons/fa";
import {CgExpand} from "react-icons/cg";
import {BiEdit} from "react-icons/bi";
import handleStartChat from "src/store/utils/handleStartChat.js";


const HomeLayout = ({children}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchFeedsAction())
        dispatch(fetchPeoplesAction())
        dispatch(fetchAuthFriendsAction())
    }, [])

    const {friends, pendingFriends, auth} = useSelector(state => state.authState)
    const {groups, openHomeChatsSidebar, openChatUser} = useSelector(state => state.chatState)
    const {openSidebar} = useSelector(state => state.appState)


    const nav = [
        {label: "Friends", img: friendIcon, to: "/friends",},
        {label: "Groups", img: groupIcon, to: "/groups",},
        {label: "Market", img: marketIcon, to: "/",},
        {label: "Watch", img: videoIcon, to: "/watch",},
        {label: "Memories", img: clockIcon, to: "/stories",},
        {label: "Pages", img: pageIcon, to: "/pages",},
        {label: "Save", img: bookmarkIcon, to: "/saved",},
        {label: "Favorites", img: starIcon, to: "/saved",},
        {label: "Messenger", img: messengerIcon, to: "/messenger"}
    ]


    // create group or fetch group


    useEffect(()=>{
        if(openChatUser && openChatUser.groupId){
            fetchChatGroupMessages(openChatUser.groupId)
        }
    }, [openChatUser])


    function fetchChatGroupMessages(groupId) {
        dispatch(getChatGroupMessagesAction({
            groupId,
            perPage: 20,
            pageNumber: 1,
            orderBy: "createdAt",
            orderDirection: "desc"
        }))
    }

    function handleStartChatHandler(friend, group){
        handleStartChat(friend, group, dispatch, groups)
    }
    return (
        <div>
            <div className="flex justify-between ">
                <Sidebar className="white left-sidebar" isOpen={openSidebar === "left-sidebar"}
                         onClose={() => dispatch(openSidebarAction(""))}>

                    <div className=" !px-2">
                        <Link to={`/profile/${auth._id}`}>
                            <li className="flex items-center gap-x-1 my-1 py-2  px-2 menu-item-hover color_h1">
                                <Avatar className="!w-8 !h-8" imgClass="!w-8 !h-8 text-xs" src={auth.avatar}
                                        username={auth.fullName}/>
                                <div className="ml-2">
                                    <span className="font-medium text-base ">{auth.fullName}</span>
                                    <h5 className="text-[10px] color_mute">{auth._id}</h5>
                                </div>
                            </li>
                        </Link>
                        {nav.map((item, index) => (
                            item.to ? (
                                <Link key={index} to={item.to}>
                                    <li key={index}
                                        className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                                        <img className="w-9 radius-100" src={item.img} alt=""/>
                                        <h4 className="ml-2 text-[15px] color_li font-medium ">{item.label}</h4>
                                    </li>
                                    {/**/}
                                    {/*    <i className={`icon ${item.cls}`}></i>*/}
                                    {/*    <span className="font-medium text-sm text-neutral-600">{item.label}</span>*/}
                                    {/*</li>*/}
                                </Link>
                            ) : (
                                <li key={index} onClick={() => item.onClick && item.onClick(item)}
                                    className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">
                                    <img className="w-9 radius-100" src={item.img} alt=""/>
                                    <h4 className="ml-2 text-[15px] color_li font-medium ">{item.label}</h4>
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


                    {/*<div className=" !px-2 mt-3">*/}
                    {/*    <div className="card-meta !px-2">*/}
                    {/*        <h4>Account</h4>*/}
                    {/*    </div>*/}


                    {/*    <li  className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">*/}
                    {/*        <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF"/>*/}
                    {/*        <label htmlFor="" className="text-sm">Setting</label>*/}
                    {/*    </li>*/}

                    {/*    <li onClick={handleLogout} className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">*/}
                    {/*        <div className="!w-9 !h-9 bg-neutral-200 rounded-full flex justify-center items-center"><FaSignOutAlt /></div>*/}
                    {/*        <label htmlFor="" className="text-sm">Logout</label>*/}
                    {/*    </li>*/}

                    {/*    <Link to={`/profile/${auth._id}`}>*/}
                    {/*        <li  className="flex items-center gap-x-1 my-1 py-2 px-2 menu-item-hover">*/}
                    {/*            <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" src={auth?.avatar} username="ER SDF"/>*/}
                    {/*            <label htmlFor="" className="text-sm">Profile</label>*/}
                    {/*        </li>*/}
                    {/*    </Link>*/}


                    {/*</div>*/}


                </Sidebar>


                <div className="w-full ">
                    <div className="content">


                        {children}


                    </div>
                </div>

                <Sidebar className="white right-sidebar" isOpen={openSidebar === "right-sidebar"}
                         onClose={() => dispatch(openSidebarAction(""))}>
                    <ActiveFriend handleStartChat={handleStartChatHandler} auth={auth} friends={friends}/>
                    {/*<PendingFriendRequestCard  className="mt-4" auth={auth} pendingFriends={pendingFriends} />*/}
                    {openChatUser && <ChatWithFriend auth={auth} friend={openChatUser} openChatUser={openChatUser}/>}
                </Sidebar>





            </div>
        </div>
    );
};

export default HomeLayout;