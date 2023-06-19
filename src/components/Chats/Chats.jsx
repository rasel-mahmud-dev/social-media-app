import React, {useEffect, useState} from 'react';
import {FaEllipsisV} from "react-icons/fa";
import {CgExpand} from "react-icons/cg";
import {BiEdit} from "react-icons/bi";
import {useSelector} from "react-redux";

import Avatar from "components/Shared/Avatar/Avatar.jsx";
import apis from "src/apis/index.js";
import moment from "moment";
import {Link} from "react-router-dom";

import "./chats.scss"
import trimText from "src/utils/trimText.js";

const Chats = ({handleStartChat, className  = "", footer}) => {


    const {groups} = useSelector(state => state.chatState)
    const {auth} = useSelector(state => state.authState)

    const [groupMessage, setGroupMessage] = useState({})

    useEffect(() => {

        // get a latest groups message
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

    function handleOpenStartChatPopup(friend, group) {
        handleStartChat(friend, group)
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
                            <div className="text-xs color_mute">{group._id}</div>
                            {groupMessage[group._id] && groupMessage[group._id].length > 0 && (
                                <li className="flex  items-center mt-1 text-sm color_h2">
                                    {groupMessage[group._id][0].senderId === auth._id && <span className="mr-1">You:</span> }
                                    <span className=""> {trimText(groupMessage[group._id][0].message, 20)}</span>
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

    console.log(groups)

    return (
            <div className={className}>
               <div className="messenger-quick-chat-list"> {groups.map(group => (
                   <div key={group._id} className="text-sm color_p py-1">
                       {renderChatFriend(group)}
                   </div>
               ))}

               </div>
                {footer && footer()}
        </div>
    );
};

export default Chats;