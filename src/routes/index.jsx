import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import Homepage from "pages/Homepage";
import Login from "pages/auth/Login";
import Registration from "pages/auth/Registration.jsx";
import PrivateRoute from "src/Middleware/PrivateRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <PrivateRoute> <Homepage/> </PrivateRoute> },
            {path: "login", element: <Login/> },
            {path: "registration", element: <Registration/> }
        ]
    }
])


export default router