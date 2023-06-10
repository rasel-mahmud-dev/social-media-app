import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";
import Login  from "src/pages/auth/Login"
import Messenger from "pages/Messenger/Messenger.jsx";

const Homepage  = lazy(()=>import("pages/Homepage"));
const Registration  = lazy(()=>import("src/notification/auth/Registration.jsx"));
const PrivateRoute  = lazy(()=>import("src/middleware/PrivateRoute.jsx"));
const FindPeoples  = lazy(()=>import("pages/FindPeoples/FindPeoples.jsx"));
const MyFriendList  = lazy(()=>import("pages/MyFriendList/MyFriendList.jsx"));
const RequestForYou  = lazy(()=>import("pages/RequestForYou/RequestForYou.jsx"));
const WatchVideos  = lazy(()=>import("pages/WatchVideos/WatchVideos.jsx"));
const OnlineFriends  = lazy(()=>import("pages/OnlineFriends/OnlineFriends.jsx"));
const RequestSend  = lazy(()=>import("pages/RequestSend/RequestSend.jsx"));
const Saved  = lazy(()=>import("pages/Saved/Saved.jsx"));
const Groups  = lazy(()=>import("pages/Groups/Groups.jsx"));
const FeedDetail  = lazy(()=>import("src/components/FeedDetail/FeedDetail.jsx"));
const Profile  = lazy(()=>import("src/pages/Profile/Profile.jsx"));
const Stories  = lazy(()=>import("pages/Stories/Stories.jsx"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <PrivateRoute> <Homepage/> </PrivateRoute> },
            {path: "/feed", element: <PrivateRoute> <Homepage/> </PrivateRoute> },
            {path: "/profile", element: <PrivateRoute> <Profile/> </PrivateRoute> },
            {path: "/profile/:userId", element: <PrivateRoute> <Profile/> </PrivateRoute> },
            {path: "/feed/:feedId", element: <PrivateRoute> <FeedDetail/> </PrivateRoute> },
            {path: "/stories", element: <PrivateRoute> <Stories/> </PrivateRoute> },
            {path: "/stories/:storyId", element: <PrivateRoute> <Stories/> </PrivateRoute> },
            {path: "find-peoples", element: <PrivateRoute> <FindPeoples/> </PrivateRoute> },
            {path: "friends", element: <PrivateRoute> <MyFriendList/> </PrivateRoute> },
            {path: "friend-request-received", element: <PrivateRoute> <RequestForYou/> </PrivateRoute> },
            {path: "friend-request-send", element: <PrivateRoute> <RequestSend/> </PrivateRoute> },
            {path: "online-friend", element: <PrivateRoute> <OnlineFriends/> </PrivateRoute> },
            {path: "watch", element: <PrivateRoute> <WatchVideos/> </PrivateRoute> },
            {path: "saved", element: <PrivateRoute> <Saved/> </PrivateRoute> },
            {path: "groups", element: <PrivateRoute> <Groups/> </PrivateRoute> },
            {path: "login", element: <Login/> },
            {path: "registration", element: <Registration/> },
            {path: "messenger", element: <Messenger/> }
        ]
    }
])


export default router