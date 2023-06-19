import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, fetchGroupByIdAction, getChatGroupMessagesAction} from "src/store/actions/chatAction.js";
import Chats from "components/Chats/Chats.jsx";
import findUserGroup from "src/store/utils/findUserGroup.js";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";

import "./messenger.scss"
import {FaEllipsisV} from "react-icons/fa";
import MessageList from "components/MessageList/MessageList.jsx";
import {useNavigate, useParams} from "react-router-dom";


const Messenger = () => {

    const {messages, groups, openChatUser, messagePaginate} = useSelector(state => state.chatState)
    const {auth} = useSelector(state => state.authState)

    const navigate = useNavigate()
    const {groupId} = useParams()

    const [isMobile, setMobile] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobile(true)
        }
    }, []);


    function handleOpenPrivateGroupChat(group) {
        if (group) {
            let friend = group.participants.filter(participant => participant._id !== auth._id)
            if (friend.length === 1) {
                friend = friend[0]
            }
            dispatch(openChatUserAction({
                ...friend,
                groupId: group._id,
                where: "messenger",
                group
            }))

            fetchChatGroupMessages(group._id)
        }
    }


    // fetch group by group id
    useEffect(() => {
        if (groupId && auth) {
            if (groups) {
                let group = groups.find(group => group._id === groupId)
                handleOpenPrivateGroupChat(group)
            } else {
                dispatch(fetchGroupByIdAction(groupId)).unwrap().then((group) => {
                    handleOpenPrivateGroupChat(group)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }, [groupId, auth, groups])

    // Scroll to the newly calculated position when the items state changes


    async function handleStartChat(friend, group) {
        if (!group) {
            group = findUserGroup(groups, friend._id)
            if (!group) {
                const groupData = await dispatch(createGroupAction({
                    name: "",
                    type: "private",
                    participants: [friend._id]
                }))

                if (groupData.payload) {
                    group = groupData.payload
                }
            }
        }

        navigate("/messenger/" + group._id)

        dispatch(openChatUserAction({
            ...friend,
            groupId: group._id,
            where: "messenger",
            group
        }))

        fetchChatGroupMessages(group._id)
    }

    function fetchChatGroupMessages(groupId) {
        dispatch(getChatGroupMessagesAction({
            groupId,
            perPage: 20,
            pageNumber: 1,
            orderBy: "createdAt",
            orderDirection: "desc"
        }))
    }

    return (
        <div>
            <div className="messenger-page ">

                <div className="message-sidebar">
                    <Chats handleStartChat={handleStartChat}/>
                </div>

                {openChatUser ? (
                    <div className="w-full">
                        <div className="messenger-header w-full py-3 px-4">
                            <div className="flex justify-between items-center">
                               <span>
                                   <div className="flex items-center gap-x-2 ">
                                   <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" src={openChatUser?.avatar}
                                           username={openChatUser?.fullName}/>
                                   <label className="text-base color_h1 font-semibold">{openChatUser?.fullName}</label>
                               </div>
                               <span className="online"></span>
                               </span>
                                <span>
                                   <li className="circle-hover-btn">
                                       <FaEllipsisV className="color_p text-sm"/>
                                   </li>
                               </span>
                            </div>
                        </div>

                        {!isMobile && <div className="messenger-content">

                            <MessageList
                                className="messenger-message-list"
                                auth={auth}
                                openChatUser={openChatUser}
                                messages={messages && messages[openChatUser.groupId] && messages[openChatUser.groupId] || []}
                            />

                            <div className="message-input">
                                <textarea placeholder="Write message"></textarea>
                            </div>

                        </div>}

                    </div>
                ) : (
                    <div className="w-full text-center top-1/4 relative color_p">
                        <h4>Please select you friend to start conversation</h4>
                    </div>
                )}


                <div className="message-sidebar message-sidebar-right">
                    <div className="flex justify-center items-center flex-col">
                        <Avatar
                            imgClass="text-xs !w-20 !h-20"
                            className="!w-20 !h-20"
                            src={openChatUser?.avatar}
                            username={openChatUser?.fullName}
                        />
                        <label className="text-base color_h1 font-semibold">{openChatUser?.fullName}</label>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Messenger;