import {createBrowserRouter} from "react-router-dom"
import Main from "layout/Main";
import Homepage from "pages/Homepage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        children: [
            {path: "", element: <Homepage/> }
        ]
    }
])


export default router