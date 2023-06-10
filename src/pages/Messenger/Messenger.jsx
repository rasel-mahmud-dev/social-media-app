import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchChatMessage} from "src/store/actions/chatAction.js";

const Messenger = () => {
    const {messages} = useSelector(state=>state.chatState)
    console.log(messages)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchChatMessage())
    }, [])

    return (
        <div>
            {messages && Array.isArray(messages) &&  messages.map(message=>(
                <div key={message._id}>
                    {message.message}
                </div>
            ))}
        </div>
    );
};

export default Messenger;