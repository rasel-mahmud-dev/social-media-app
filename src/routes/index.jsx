import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import Homepage from "pages/Homepage";
import Login from "pages/auth/Login";
import Registration from "pages/auth/Registration.jsx";
import PrivateRoute from "src/Middleware/PrivateRoute.jsx";
import FindPeoples from "pages/FindPeoples/FindPeoples.jsx";
import MyFriendList from "pages/MyFriendList/MyFriendList.jsx";
import RequestForYou from "pages/RequestForYou/RequestForYou.jsx";
import WatchVideos from "pages/WatchVideos/WatchVideos.jsx";
import OnlineFriends from "pages/OnlineFriends/OnlineFriends.jsx";
import RequestSend from "pages/RequestSend/RequestSend.jsx";
import Saved from "pages/Saved/Saved.jsx";
import Groups from "pages/Groups/Groups.jsx";
import FeedDetail from "src/compoenents/FeedDetail/FeedDetail.jsx";
import Profile from "src/pages/Profile/Profile.jsx";
import Stories from "pages/Stories/Stories.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <PrivateRoute> <Homepage/> </PrivateRoute> },
            {path: "/feed", element: <PrivateRoute> <Homepage/> </PrivateRoute> },
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
            {path: "registration", element: <Registration/> }
        ]
    }
])


export default router