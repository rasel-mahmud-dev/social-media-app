import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    createRoomAction,
    fetchRoomByIdAction,
    getChatRoomMessagesAction,
    sendPrivateMessageAction
} from "src/store/actions/chatAction.js";
import Chats from "components/Chats/Chats.jsx";
import findUserRoom from "src/store/utils/findUserRoom.js";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";

import "./messenger.scss"
import {FaEllipsisV} from "react-icons/fa";
import MessageList from "components/MessageList/MessageList.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Button from "components/Shared/Button/Button.jsx";
import playSound from "src/notification/sound.js";


const Messenger = () => {

    const {messages, rooms, openChatUser, messagePaginate} = useSelector(state => state.chatState)
    const {auth} = useSelector(state => state.authState)

    const navigate = useNavigate()
    const {roomId} = useParams()

    const [isMobile, setMobile] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (window.innerWidth < 768) {
            setMobile(true)
        }
    }, []);


    function handleOpenPrivateRoomChat(room) {
        if (room) {
            let friend = room.participants.filter(participant => participant._id !== auth._id)
            if (friend.length === 1) {
                friend = friend[0]
            }
            dispatch(openChatUserAction({
                ...friend,
                roomId: room._id,
                where: "messenger",
                room
            }))

            fetchChatRoomMessages(room._id)
        }
    }


    // fetch room by room id
    useEffect(() => {
        if (roomId && auth) {
            if (rooms) {
                let room = rooms.find(room => room._id === roomId)
                handleOpenPrivateRoomChat(room)
            } else {
                dispatch(fetchRoomByIdAction(roomId)).unwrap().then((room) => {
                    handleOpenPrivateRoomChat(room)
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    }, [roomId, auth, rooms])

    // Scroll to the newly calculated position when the items state changes


    async function handleStartChat(friend, room) {
        if (!room) {
            room = findUserRoom(rooms, friend._id)
            if (!room) {
                const roomData = await dispatch(createRoomAction({
                    name: "",
                    type: "private",
                    participants: [friend._id]
                }))

                if (roomData.payload) {
                    room = roomData.payload
                }
            }
        }

        navigate("/messenger/" + room._id)

        dispatch(openChatUserAction({
            ...friend,
            roomId: room._id,
            where: "messenger",
            room
        }))

        fetchChatRoomMessages(room._id)
    }

    function fetchChatRoomMessages(roomId) {
        dispatch(getChatRoomMessagesAction({
            roomId,
            perPage: 20,
            pageNumber: 1,
            orderBy: "createdAt",
            orderDirection: "desc"
        }))
    }


    function sendMessage(message) {

        if (!(openChatUser && openChatUser?.roomId)) return

        dispatch(sendPrivateMessageAction({
            message,
            roomId: openChatUser.roomId
        })).unwrap().then(()=>{
            playSound("/send-messenger.mp3")
        })
    }

    function handleChange(e) {
        if (e.keyCode === 13) {
            sendMessage(e.target.value.trim())
            e.target.value = ""
        }
    }

    function handleSendMessage(e) {

        e.preventDefault();
        const message = e.target.message.value
        sendMessage(message)
        e.target.message.value = ""
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
                                messages={messages && messages[openChatUser.roomId] && messages[openChatUser.roomId] || []}
                            />

                            <form onSubmit={handleSendMessage}>
                                <div className="message-input gap-x-4">
                                    <textarea onChange={handleChange} name="message"
                                              placeholder="Write message"></textarea>
                                    <Button type="submit" className="btn-primary whitespace-nowrap rounded-lg">Send
                                        Message</Button>
                                </div>
                            </form>

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