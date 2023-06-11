import React, {useEffect, useState} from 'react';
import {FaEllipsisV} from "react-icons/fa";
import {CgExpand} from "react-icons/cg";
import {BiEdit} from "react-icons/bi";
import {useSelector} from "react-redux";

import Avatar from "components/Shared/Avatar/Avatar.jsx";
import apis from "src/apis/index.js";
import moment from "moment";

const Chats = ({handleStartChat}) => {


    const {groups} = useSelector(state => state.chatState)
    const {auth} = useSelector(state => state.authState)

    const [groupMessage, setGroupMessage] = useState({})

    useEffect(() => {

        // get latest groups message
        apis.get("/chat/groups/messages").then(({data}) => {

            let payload = {}

            if (data.messages) {
                data.messages.forEach(msg => {
                    payload[msg._id] = msg.messages
                })
            }
            setGroupMessage(payload)

        }).catch(ex => {
            console.log(ex)
        })

    }, [])

    function handleOpenStartChatPopup(member, group) {
        handleStartChat(member, group)
    }

    function renderChatFriend(group) {
        // let participants = groupParticipantsByGroupId(groups, groupId)

        if (!auth?._id) return;

        let member = group.participants.find(participant => participant._id !== auth?._id)

        return member && (
            <div>
                <div onClick={() => handleOpenStartChatPopup(member, group)} className="flex items-center justify-between color_h1 list-hover-able">
                    <div className="flex items-center gap-x-2 w-full ">
                        <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" src={member?.avatar}
                                username="ER SDF"/>
                        <div className="">
                            <label htmlFor="" className="text-sm ">{member?.fullName}</label>
                            {groupMessage[group._id] && (
                                <li className="flex  items-center mt-1 text-sm color_h2">
                                    {groupMessage[group._id][0].senderId === auth._id && <span className="mr-1">You:</span> }
                                    <span className=""> {groupMessage[group._id][0].message}</span>
                                    <span
                                        className="text-xs color_mute ml-2">{moment(new Date(groupMessage[group._id][0].createdAt)).fromNow(true)}</span>
                                </li>
                            )}
                        </div>

                    </div>


                </div>
            </div>
        )
    }

    return (

        <div>
            <div className="flex items-center justify-between ">
                <h1 className="color_h1 font-semibold text-xl">Chats</h1>
                <div className="flex items-center gap-x-1">
                    <li className="circle-hover-btn color_p text-sm">
                        <FaEllipsisV/>
                    </li>
                    <li className="circle-hover-btn color_p">
                        <CgExpand/>
                    </li>
                    <li className="circle-hover-btn color_p">
                        <BiEdit/>
                    </li>
                </div>
            </div>


            <div className="mt-4">
                {groups.map(group => (
                    <div key={group._id} className="text-sm color_p py-1">
                        {renderChatFriend(group)}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Chats;