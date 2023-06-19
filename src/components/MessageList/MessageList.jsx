import React, {useEffect, useRef, useState} from 'react';
import useCustomReducer from "src/hooks/useReducer.jsx";
import Avatar from "components/Shared/Avatar/Avatar.jsx";

const MessageList = (props) => {
    const {className = "", openChatUser, messages = [], auth} = props


    const [state, setState] = useCustomReducer({
        isLoading: false
    })

    const scrollPosition = useRef(0); // Current scroll position
    const [contentHeight, setContentHeight] = useState(0); // Height of the content

    const divRef = useRef(null); // Ref to the <div> element

    function handleFetchPreviousMessage(e, openChatUser) {
        const scrollTop = e.target.scrollTop

        if (scrollTop <= 50 && !state.isLoading) {
            const {current} = divRef;
            if (current) {
                let scrollTop = (current.scrollHeight - current.clientHeight)
                // ref.current.scrollTop = scrollTop  //end
                scrollPosition.current = scrollTop
            }

            // setState({
            //     isLoading: true
            // })
            // let paginate = getCurrentMessagePaginate(messagePaginate, openChatUser.groupId)
            // let pageNumber = 1;
            // if (paginate && paginate.pageNumber) {
            //     pageNumber = paginate.pageNumber + 1
            // }
            //
            // setTimeout(() => {
            //     // Fetch more items and update the items state
            //     dispatch(getChatGroupMessagesAction({
            //         groupId: openChatUser.groupId,
            //         perPage: 10,
            //         pageNumber: pageNumber,
            //         orderBy: "createdAt",
            //         orderDirection: "desc"
            //     })).unwrap().then(() => {
            //         // scroll top.
            //         setState({
            //             isLoading: false
            //         })
            //     })
            // }, 1000);
        }
    }


    // Scroll to the newly calculated position when the items state changes
    useEffect(() => {
        const {current} = divRef;
        if (current) {
            let scroll = current.scrollHeight - current.clientHeight
            current.scrollTop = (scroll - scrollPosition.current)
            scrollPosition.current = current.scrollHeight - (scroll + current.clientHeight)
        }
    }, [messages, scrollPosition, contentHeight]);


    return (
        <div className={className}>
            <div className="message-list p-4"
                 ref={divRef}
                // onWheel={(e) => handleFetchPreviousMessage(e, openChatUser)}
                 onScroll={(e) => handleFetchPreviousMessage(e, openChatUser)}>
                <div>
                    {/**** user info ****/}
                    <div className="flex flex-col items-center mb-4 border-b pb-4 border-light-10">
                        <Avatar
                            src={openChatUser.avatar}
                            username={openChatUser.fullName}
                            imgClass="!w-24 !h-24  "
                            className="!w-24 !h-24 rounded-full dark:!bg-dark-600"
                        />
                        <h4 className="color_h2 mt-2">{openChatUser.fullName}</h4>
                        <p className="color_p mt-2 text-sm">Very beginning of chat</p>
                    </div>
                    {messages.map((msg) => (
                        <div className={`msg-item ${msg.senderId === auth?._id ? "your-msg" : ""}`} key={msg._id}>
                            <li>{msg.message}</li>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MessageList;