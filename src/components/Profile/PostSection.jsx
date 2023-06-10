import React, {useEffect} from 'react';
import Intro from "components/Profile/Intro.jsx";
import AddPostDemo from "components/AddPost/AddPostDemo.jsx";
import Feeds from "components/Feeds/Feeds.jsx";
import {fetchFeedsAction} from "src/store/actions/feedAction.js";
import {useDispatch, useSelector} from "react-redux";

const PostSection = ({userId, authId}) => {

    const dispatch  = useDispatch()
    const {userFeeds} = useSelector(state=>state.feedState)

    useEffect(()=>{
        if(userId){
            dispatch(fetchFeedsAction({query: "?userId="+userId, userId}))
        }
    }, [userId])

    const profile = {
        bio: "A Passionate full-stack web developer. Working with Javascript, React, Nodejs, Mongodb, MySQL.....",
        relationship: "Single",
        currentCity: "Bogura",
        hometown: "Bogura",
        socialLinks: [
            {
                link: "https://www.linkedin.com/in/rasel-mahmud-dev",
                name: "LinkedIn"
            },
            {
                link: "https://github.com/rasel-mahmud-dev",
                name: "Github"
            },
            {
                link: "https://rasel-portfolio.vercel.app",
                name: "Website"
            }
        ]
    }

    return (
        <div className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <Intro profile={profile} />

                <div className="flex flex-col gap-y-4">
                    {userId === authId && <AddPostDemo /> }
                    <Feeds feeds={userFeeds[userId] ? userFeeds[userId]: []} />
                </div>
            </div>
        </div>
    );
};

export default PostSection;