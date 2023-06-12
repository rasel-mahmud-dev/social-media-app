import './App.scss'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {toggleDarkMode} from "src/store/slices/appSlice.js";
import {RouterProvider} from "react-router-dom";
import router from "src/routes/index.jsx";


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
