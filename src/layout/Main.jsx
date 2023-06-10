import {Outlet} from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import {fetchCurrentAuthAction} from "src/store/actions/authAction.js";
import {useDispatch, useSelector} from "react-redux";
import React, {Suspense, useEffect} from "react";
import Pusher from "pusher-js"
import playSound from "src/notification/sound.js";

import {addLocalFeedAction, localToggleFeedReactionAction, removeLocalFeedAction,} from "src/store/slices/feedSlice.js";

import {MoonLoader} from "react-spinners";
import {backend} from "src/apis/index.js";
import {getNewMessageAction} from "src/store/slices/chatSlice.js";
import channelName from "src/utils/channelName.js";


const Main = () => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state => state.authState)

    useEffect(() => {
        dispatch(fetchCurrentAuthAction())


    }, []);

    useEffect(() => {
        if (!auth) return

        const pusher = new Pusher('aa79087d5d1bd3848813', {
            cluster: 'ap2',
            channelAuthorization: {
                endpoint: backend + "/api/v1/message/pusher/auth"
            }
        });

        const channel = pusher.subscribe('public-channel');

        const privateChannel = pusher.subscribe(`private-chat-${auth._id}`);

        channel.bind('message', function (data) {
            playSound()
            console.log(data)
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
            dispatch(localToggleFeedReactionAction(data.like))
        })


        privateChannel.bind("message", (data) => {
            if(data.message){
                playSound()


                dispatch(getNewMessageAction({
                    channelName: channelName(auth._id,  data.message.senderId),
                    message: data.message
                }))
            }
        })


        return () => {
            pusher.unsubscribe("public-channel")
            if (auth._id) {
                pusher.unsubscribe(`private-chat-${auth._id}`)
            }
            pusher.disconnect()
        }

    }, [auth]);


    return (
        <div>
            <Header/>
            <Suspense fallback={() => (
                <div className="py-24 w-full flex justify-center  items-center flex-col">
                    <MoonLoader/>
                    <h4 className="text-xs font-semibold mt-2">Page Loading...</h4>
                </div>
            )}>
                <Outlet/>
            </Suspense>
            {/*<Footer/>*/}
        </div>
    );
};

export default Main;