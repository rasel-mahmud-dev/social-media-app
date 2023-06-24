import {Outlet} from "react-router-dom";
import {fetchCurrentAuthAction} from "src/store/actions/authAction.js";
import {useDispatch, useSelector} from "react-redux";
import React, {Suspense, useEffect} from "react";
import Pusher from "pusher-js"
import playSound from "src/notification/sound.js";

import {addLocalFeedAction, localToggleFeedReactionAction, removeLocalFeedAction,} from "src/store/slices/feedSlice.js";

import {MoonLoader} from "react-spinners";
import {backend} from "src/apis/index.js";
import {getNewMessageAction} from "src/store/slices/chatSlice.js";
import Navigation from "components/Header/Navigation.jsx";

import {fetchRoomsAction} from "src/store/actions/chatAction.js";
import ChatWithFriend from "components/ChatWithFriend/ChatWithFriend.jsx";
import {fetchAuthFriendsAction} from "src/store/actions/userAction.js";
import Toast from "components/Shared/Toast/Toast.jsx";
import {receivedNewNotification} from "src/store/slices/notificationSlice.js";
import {getAllNotificationAction} from "src/store/actions/notificationAction.js";


const pusher = new Pusher('aa79087d5d1bd3848813', {
    cluster: 'ap2',
    channelAuthorization: {
        endpoint: backend + "/api/v1/auth/pusher/auth"
    }
});

const Main = () => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)
    const {groups, openChatUser} = useSelector(state => state.chatState)

    useEffect(() => {
        dispatch(fetchCurrentAuthAction())
        dispatch(fetchRoomsAction())
        dispatch(fetchAuthFriendsAction())
    }, []);


    useEffect(() => {
        if (auth && auth._id) {
            dispatch(getAllNotificationAction())
        }
    }, [auth])


    useEffect(() => {
        if (!auth) return

        const channel = pusher.subscribe('public-channel');

        // personal event to get notification like message notification, invitation noti
        channel.bind(auth._id, function (data) {
            playSound()
            if (data.notification) {
                dispatch(receivedNewNotification(data.notification))
            }
        });

        channel.bind('new-feed', function (data) {
            if (data.feed && data.feed.userId !== auth._id) {
                // push all users timeline
                playSound()
                dispatch(addLocalFeedAction(data.feed))
            }
        });

        channel.bind('remove-feed', function (data) {

            if (data.feed && data.feed.userId !== auth._id) {
                playSound()
                // remove feed form all users
                dispatch(removeLocalFeedAction(data.feed))
            }
        });

        channel.bind("toggle-reaction", function (data) {
            // skip if this action fired from current user.
            if (data.like.userId === auth._id) return
            playSound()
            dispatch(localToggleFeedReactionAction(data.like))
        })

        return () => {
            pusher.unsubscribe("public-channel")
            if (auth._id) {
                pusher.unsubscribe(`private-chat-${auth._id}`)
            }
            pusher.disconnect()
        }
    }, [auth]);


    useEffect(() => {
        if (auth && groups) {
            for (let i = 0; i < groups.length; i++) {
                const group = groups[i]
                const privateChannel = pusher.subscribe(`private-chat-${group._id}`);
                privateChannel.bind("message", (data) => {
                    if (data.message) {
                        if (data.message?.senderId === auth._id) return;
                        playSound()
                        dispatch(getNewMessageAction(data.message))
                    }
                })
            }
        }

        return () => {
            if (auth && groups) {
                for (let i = 0; i < groups.length; i++) {
                    const group = groups[i]
                    pusher.unsubscribe(`private-chat-${group._id}`)
                }
            }
        }
    }, [auth, groups])


    return (
        <div className="relative">
            <Navigation/>
            <Suspense fallback={() => (
                <div className="py-24 w-full flex justify-center  items-center flex-col">
                    <MoonLoader/>
                    <h4 className="text-xs font-semibold mt-2">Page Loading...</h4>
                </div>
            )}>
                <Outlet/>


                {(openChatUser && openChatUser?.where !== "messenger") &&
                    <ChatWithFriend
                        auth={auth}
                        friend={openChatUser}
                        openChatUser={openChatUser}
                    />
                }


            </Suspense>


            <Toast/>

        </div>
    );
};

export default Main;