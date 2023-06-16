import React from 'react';
import {FaEllipsisV} from "react-icons/fa";
import {Link} from "react-router-dom";
import {CgExpand} from "react-icons/cg";
import {BiEdit} from "react-icons/bi";
import Chats from "components/Chats/Chats.jsx";
import handleStartChat from "src/store/utils/handleStartChat.js";
import {useDispatch, useSelector} from "react-redux";

const MessengerQuickChat = ({onClose}) => {

    const dispatch = useDispatch()
    const {groups} = useSelector(state => state.chatState)

    function handleStartChatHandler(friend, group) {
        handleStartChat(friend, group, dispatch, groups, () => {
            onClose()
        })
    }


    return (
        <div className="absolute top-10 right-0  messenger-quick-chat-list-parent  ">
            <div className="min-w-[350px] menu_panel_card overflow-hidden">
                <div className="flex items-center justify-between px-4 pt-2">
                    <h1 className="color_h1 font-semibold text-xl">Chats</h1>
                    <div className="flex items-center gap-x-1">
                        <li className="circle-hover-btn color_p text-sm">
                            <FaEllipsisV/>
                        </li>
                        <Link to="/messenger">
                            <li className="circle-hover-btn color_p">
                                <CgExpand/>
                            </li>
                        </Link>
                        <li className="circle-hover-btn color_p">
                            <BiEdit/>
                        </li>
                    </div>
                </div>


                <Chats footer={()=>(
                    <div className="color_p messenger-quick-chat-footer py-2 text-sm">
                       <Link to="/messenger"> See all in Messenger</Link>
                    </div>
                )} className="px-2" handleStartChat={handleStartChatHandler}/>

            </div>
        </div>
    );
};

export default MessengerQuickChat;