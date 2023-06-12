import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {createGroupAction, fetchChatMessage} from "src/store/actions/chatAction.js";
import Chats from "components/Chats/Chats.jsx";
import findUserGroup from "src/store/utils/findUserGroup.js";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import Avatar from "components/Shared/Avatar/Avatar.jsx";

import "./messenger.scss"
import {FaEllipsisV} from "react-icons/fa";


const Messenger = () => {

    const {messages, groups, openChatUser} = useSelector(state=>state.chatState)


    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchChatMessage())
    }, [])

    async function handleStartChat(friend, group){
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
    }


    console.log(openChatUser, messages)

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
                                   <Avatar imgClass="text-xs !w-9 !h-9" className="!w-9 !h-9" src={openChatUser?.avatar} username={openChatUser?.fullName}/>
                                   <label  className="text-base color_h1 font-semibold">{openChatUser?.fullName}</label>
                               </div>
                               <span className="online"></span>
                               </span>
                               <span>
                                   <li className="circle-hover-btn">
                                       <FaEllipsisV  className="color_p text-sm"/>
                                   </li>
                               </span>
                           </div>
                       </div>

                       <div className="messenger-content">

                       {messages && messages[openChatUser.groupId] && messages[openChatUser.groupId].map(message=>(
                           <div key={message._id} className="color_h2">
                                {message.message}
                           </div>
                       ))}


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