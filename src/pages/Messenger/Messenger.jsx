import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, getChatGroupMessagesAction} from "src/store/actions/chatAction.js";
import Chats from "components/Chats/Chats.jsx";
import findUserGroup from "src/store/utils/findUserGroup.js";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";

import "./messenger.scss"
import {FaEllipsisV} from "react-icons/fa";
import getCurrentMessagePaginate from "src/store/utils/getCurrentMessagePaginate.js";
import useCustomReducer from "src/hooks/useReducer.jsx";


const Messenger = () => {

    const {messages, groups, openChatUser, messagePaginate} = useSelector(state => state.chatState)
    const {auth} = useSelector(state => state.authState)


    const scrollPosition = useRef(0); // Current scroll position
    const [contentHeight, setContentHeight] = useState(0); // Height of the content

    const divRef = useRef(null); // Ref to the <div> element
    const dispatch = useDispatch()

    const [state, setState] = useCustomReducer({
        isLoading: false
    })

    // Save the scroll position and content height when the component mounts
    // useEffect(() => {
    //     const {current} = divRef;
    //     if (current) {
    //         let scroll = (current.scrollHeight - current.clientHeight) - 10
    //         // ref current.scrollTop = scroll  //end
    //         scrollPosition.current = current.scrollHeight - (scroll + current.clientHeight)
    //     }
    // }, []);

    // Scroll to the newly calculated position when the items state changes
    useEffect(() => {
        const {current} = divRef;
        if (current) {
            let scroll = current.scrollHeight - current.clientHeight
            current.scrollTop = (scroll - scrollPosition.current)
            scrollPosition.current = current.scrollHeight - (scroll + current.clientHeight)
        }
    }, [messages, scrollPosition, contentHeight]);


    // function getGroup(friend, group, groups){
    //     return new Promise(async (resolve)=>{
    //         if (!group) {
    //             group = findUserGroup(groups, friend?._id)
    //             if (!group) {
    //                 const groupData = await dispatch(createGroupAction({
    //                     name: "",
    //                     type: "private",
    //                     participants: [friend?._id]
    //                 }))
    //
    //                 if (groupData.payload) {
    //                     group = groupData.payload
    //                 }
    //             }
    //         }
    //         resolve(group)
    //     })
    // }
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

        dispatch(openChatUserAction({
            ...friend,
            groupId: group._id,
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

    console.log(openChatUser, messages)

    function handleFetchPreviousMessage(e, openChatUser) {
        const scrollTop = e.target.scrollTop

        if (scrollTop <= 50 && !state.isLoading) {
            const {current} = divRef;
            if (current) {
                let scrollTop = (current.scrollHeight - current.clientHeight)
                // ref.current.scrollTop = scrollTop  //end
                scrollPosition.current = scrollTop
            }

            setState({
                isLoading: true
            })
            let paginate = getCurrentMessagePaginate(messagePaginate, openChatUser.groupId)
            let pageNumber = 1;
            if (paginate && paginate.pageNumber) {
                pageNumber = paginate.pageNumber + 1
            }

            setTimeout(() => {
                // Fetch more items and update the items state
                dispatch(getChatGroupMessagesAction({
                    groupId: openChatUser.groupId,
                    perPage: 10,
                    pageNumber: pageNumber,
                    orderBy: "createdAt",
                    orderDirection: "desc"
                })).unwrap().then(() => {
                    // scroll top.
                    setState({
                        isLoading: false
                    })
                })
            }, 1000);
        }

    }


    return (
        <div>


            <div className="messenger-page flex ">

                <div className="bg-dark-650 message-sidebar">
                    <Chats handleStartChat={handleStartChat}/>
                </div>

                {openChatUser && (
                    <div className="w-full">
                        <div className="bg-dark-650 w-full py-3 px-4">
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

                        <div className="messenger-content">
                            <div className="messenger-message-list"
                                 ref={divRef}
                                // onWheel={(e) => handleFetchPreviousMessage(e, openChatUser)}
                                 onScroll={(e) => handleFetchPreviousMessage(e, openChatUser)}
                            >
                                {messages && messages[openChatUser.groupId] && messages[openChatUser.groupId].map((msg, index) => (
                                    <div key={index}
                                         className={`msg-item ${msg.senderId === auth?._id ? "your-msg" : ""}`}>
                                        <li>{msg.message}</li>
                                    </div>
                                ))}
                            </div>

                            <div className="message-input">
                                <textarea placeholder="Write message"></textarea>
                            </div>

                        </div>

                    </div>
                )}
            </div>

        </div>
    );
};

export default Messenger;