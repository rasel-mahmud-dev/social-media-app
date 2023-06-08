import {Outlet} from "react-router-dom";
import Header from "../compoenents/Header/Header.jsx";
import {fetchCurrentAuthAction} from "src/store/actions/authAction.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Pusher from "pusher-js"
import playSound from "src/notification/sound.js";
import addPost from "src/compoenents/AddPost/AddPost.jsx";
import {addLocalFeedAction, removeLocalFeedAction} from "src/store/slices/feedSlice.js";
import Footer from "src/compoenents/Footer/Footer.jsx";



const Main = () => {

    const dispatch = useDispatch()

    const {auth} = useSelector(state=>state.authState)

    useEffect(() => {
        dispatch(fetchCurrentAuthAction())


    }, []);

    useEffect(() => {
        if(!auth) return


        const pusher = new Pusher('aa79087d5d1bd3848813', {
            cluster: 'ap2'
        });


        const channel = pusher.subscribe('public-channel');

        channel.bind('message', function(data) {
            playSound()
            console.log(data)
        });

        channel.bind('new-feed', function(data) {
            if(data.feed && data.feed.userId !== auth._id) {
                // push all users timeline
                playSound()
                dispatch(addLocalFeedAction(data.feed))
            }
        });
        channel.bind('remove-feed', function(data) {

            if(data.feed && data.feed.userId !== auth._id) {
                playSound()
                // remove feed form all users
                dispatch(removeLocalFeedAction(data.feed))
            }
        });

    }, [auth]);



    return (
        <div>
            <Header />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Main;