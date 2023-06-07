import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import Homepage from "pages/Homepage";
import Login from "pages/auth/Login";
import Registration from "pages/auth/Registration.jsx";
import PrivateRoute from "src/Middleware/PrivateRoute.jsx";
import FindPeoples from "pages/FindPeoples/FindPeoples.jsx";
import MyFriendList from "pages/MyFriendList/MyFriendList.jsx";
import FriendRequest from "pages/FriendRequest/FriendRequest.jsx";
import WatchVideos from "pages/WatchVideos/WatchVideos.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <PrivateRoute> <Homepage/> </PrivateRoute> },
            {path: "find-peoples", element: <PrivateRoute> <FindPeoples/> </PrivateRoute> },
            {path: "friends", element: <PrivateRoute> <MyFriendList/> </PrivateRoute> },
            {path: "friend-requests", element: <PrivateRoute> <FriendRequest/> </PrivateRoute> },
            {path: "watch", element: <PrivateRoute> <WatchVideos/> </PrivateRoute> },
            {path: "login", element: <Login/> },
            {path: "registration", element: <Registration/> }
        ]
    }
])


export default router