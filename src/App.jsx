import './App.scss'
import {RouterProvider} from "react-router-dom";
import router from "./routes/index.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {toggleDarkMode} from "src/store/slices/appSlice.js";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(toggleDarkMode(undefined))
    }, []);

    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}

export default App
