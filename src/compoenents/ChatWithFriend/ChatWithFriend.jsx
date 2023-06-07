import React from 'react';
import {TiTimes} from "react-icons/ti";
import {useDispatch} from "react-redux";
import {openChatUserAction} from "src/store/slices/chatSlice.js";
import Avatar from "src/compoenents/Avatar/Avatar.jsx";

const ChatWithFriend = ({openChatUser}) => {

    const dispatch = useDispatch()

    function handleSendMessage(e){
        e.preventDefault();

    }

    return (
        <div className="card fixed bottom-3 right-3">

            <div className="fixed right-6">
                <TiTimes onClick={()=>dispatch(openChatUserAction(null))} />
            </div>

            <div >
                {openChatUser && (
                    <div>
                        <div className="flex items-center gap-x-2 ">
                            <Avatar imgClass="text-xs" className="!w-9 !h-9" username="ER SDF" src={openChatUser?.avatar}/>
                            <label htmlFor="" className="text-sm">{openChatUser.fullName}</label>
                        </div>


                        <form onSubmit={handleSendMessage} className="mt-1">
                            <textarea className="input-elemtextarea" placeholder="Wrire mesasge" name="message"></textarea>
                            <button className="btn btn-primary" type={"submit"}>Send</button>
                        </form>


                    </div>
                )}
            </div>


        </div>
    );
};

export default ChatWithFriend;