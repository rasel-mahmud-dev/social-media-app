import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import {lazy} from "react";
import Login from "src/pages/auth/Login"
import Messenger from "pages/Messenger/Messenger.jsx";
import AuthExcludeRoute from "src/middleware/AuthExcludeRoute.jsx";
import GroupLayout from "layout/GroupLayout.jsx";

import CreateGroup from "pages/Group/CreateGroup.jsx";
import GroupDetail from "pages/Group/GroupDetail.jsx";
import DiscoverGroups from "pages/Group/DiscoverGroups.jsx";
import MyJoinedGroups from "pages/Group/MyJoinedGroups.jsx";
import Friends from "pages/Friends/Friends.jsx";
import FriendsRequests from "pages/Friends/FriendsRequests.jsx";
import FriendsSuggestions from "pages/Friends/FriendsSuggestions.jsx";
import FriendLayout from "layout/FriendLayout.jsx";
import AllFriends from "pages/Friends/AllFriends.jsx";
import PageLayout from "layout/PageLayout.jsx";
import Page from "pages/Page/Page.jsx";
import CreatePage from "pages/Page/CreatePage.jsx";


const Homepage = lazy(() => import("pages/Homepage"));
const PrivateRoute = lazy(() => import("src/middleware/PrivateRoute.jsx"));
const MyFriendList = lazy(() => import("pages/MyFriendList/MyFriendList.jsx"));
const RequestForYou = lazy(() => import("pages/RequestForYou/RequestForYou.jsx"));
const WatchVideos = lazy(() => import("pages/WatchVideos/WatchVideos.jsx"));
const OnlineFriends = lazy(() => import("pages/OnlineFriends/OnlineFriends.jsx"));
const RequestSend = lazy(() => import("pages/RequestSend/RequestSend.jsx"));
const Saved = lazy(() => import("pages/Saved/Saved.jsx"));
const GroupHome = lazy(() => import("pages/Group/GroupHome.jsx"));
const FeedDetail = lazy(() => import("src/components/FeedDetail/FeedDetail.jsx"));
const Profile = lazy(() => import("src/pages/Profile/Profile.jsx"));
const Stories = lazy(() => import("pages/Stories/Stories.jsx"));

const router = createBrowserRouter([

    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <PrivateRoute> <Homepage/> </PrivateRoute>},
            {path: "/feed", element: <PrivateRoute> <Homepage/> </PrivateRoute>},
            {path: "/profile", element: <PrivateRoute> <Profile/> </PrivateRoute>},
            {path: "/profile/:userId", element: <PrivateRoute> <Profile/> </PrivateRoute>},
            {path: "/feed/:feedId", element: <PrivateRoute> <FeedDetail/> </PrivateRoute>},
            {path: "/stories", element: <PrivateRoute> <Stories/> </PrivateRoute>},
            {path: "/stories/:storyId", element: <PrivateRoute> <Stories/> </PrivateRoute>},
            {
                path: "friends",
                element: <PrivateRoute> <FriendLayout/> </PrivateRoute>,
                children: [
                    {
                        path: "",
                        element: <PrivateRoute> <Friends/> </PrivateRoute>,
                    },
                    {path: "requests", element: <PrivateRoute> <FriendsRequests/> </PrivateRoute>},
                    {path: "list", element: <PrivateRoute> <AllFriends/> </PrivateRoute>},
                    {path: "suggestions", element: <PrivateRoute> <FriendsSuggestions/> </PrivateRoute>},
                ]
            },

            // {path: "friend-request-send", element: <PrivateRoute> <RequestSend/> </PrivateRoute>},
            {path: "online-friend", element: <PrivateRoute> <OnlineFriends/> </PrivateRoute>},
            {path: "watch", element: <PrivateRoute> <WatchVideos/> </PrivateRoute>},
            {path: "saved", element: <PrivateRoute> <Saved/> </PrivateRoute>},
            {path: "join", element: <AuthExcludeRoute><Login/></AuthExcludeRoute>},
            {path: "messenger", element: <Messenger/>},
            {path: "messenger/:groupId", element: <Messenger/>},
            {
                path: "groups",
                element: <PrivateRoute> <GroupLayout/> </PrivateRoute>,
                children: [
                    {path: "", element: <PrivateRoute> <GroupHome/> </PrivateRoute>},
                    {path: "feed", element: <PrivateRoute> <GroupHome/> </PrivateRoute>},
                    {path: ":groupSlug", element: <PrivateRoute> <GroupDetail/> </PrivateRoute>},
                    {path: "create", element: <PrivateRoute> <CreateGroup/> </PrivateRoute>},
                    {path: "discover", element: <PrivateRoute> <DiscoverGroups/> </PrivateRoute>},
                    {path: "joins", element: <PrivateRoute> <MyJoinedGroups/> </PrivateRoute>},
                ]
            },
            {
                path: "pages",
                element: <PrivateRoute> <PageLayout/> </PrivateRoute>,
                children: [
                    {path: "", element: <PrivateRoute> <Page/> </PrivateRoute>},
                    {path: "creation", element: <PrivateRoute> <CreatePage/> </PrivateRoute>}
                ]
            }
        ]
    }
])

export default router